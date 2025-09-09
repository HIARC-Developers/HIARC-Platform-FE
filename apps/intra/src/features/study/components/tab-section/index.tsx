import {
  AddGroupDialog,
  Button,
  cn,
  DialogUtil,
  EditGroupDialog,
  SlideFade,
  StudyGroupList,
  StudyUnassignedGroup,
  Tabs,
} from '@hiarc-platform/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LectureList } from './lecture-list';
import { AnnouncementTable } from './announcement-table';
import { StudentList } from './student-list';

import { useLecturesByStudy } from '../../hooks/study-common/query/use-lectures';
import { useStudyAnnouncements } from '../../hooks/study-common/query/use-study-announcements';
import { useValidateStudent } from '../../hooks/study-instructor/mutation/use-validate-student';
import { useCreateGroup } from '../../hooks/study-instructor/mutation/use-create-group';
import { useEditGroup } from '../../hooks/study-instructor/mutation/use-edit-group';
import { useWithdrawStudent } from '../../hooks/study-instructor/mutation/use-withdraw-student';
import { useStudyGroupList } from '../../hooks/study-instructor/query/use-study-group-list';
import { useDownloadStudyMemberExcel } from '../../hooks/study-instructor/query/use-download-study-member-excel';

interface TabSectionProps {
  isStudent?: boolean;
  studyName?: string;
  studyId?: number;
  semesterId?: number;
  isAdmin?: boolean;
  isGroupStudy?: boolean;
  className?: string;
}

export function TabSection({
  className,
  studyName,
  isAdmin,
  studyId,
  semesterId,
  isStudent,
  isGroupStudy = true,
}: TabSectionProps): React.ReactElement {
  const router = useRouter();

  const tabs = [
    { label: '커리큘럼', value: 'curriculum' },
    { label: '공지사항', value: 'announcement' },
    ...(isAdmin ? [{ label: '스터디원 관리', value: 'manage_student' }] : []),
  ];

  const [selectedTab, setSelectedTab] = useState('curriculum');
  const { data: studyAnnouncements } = useStudyAnnouncements({
    studyId: studyId || 0,
    page: 0,
    size: 10,
  });
  const { data: lectureList } = useLecturesByStudy(studyId || 0);
  const { data: groupList } = useStudyGroupList(studyId || 0);
  const validateStudent = useValidateStudent();
  const createGroup = useCreateGroup();
  const editGroup = useEditGroup();
  const withdrawStudent = useWithdrawStudent();
  const downloadExcel = useDownloadStudyMemberExcel();

  const handleCurriculumAdd = (): void => {
    router.push(
      `/announcement/write?type=STUDY&studyId=${studyId}&semesterId=${semesterId}&isLecture=true`
    );
  };

  const handleAnnouncementAdd = (): void => {
    router.push(`/announcement/write?type=STUDY&studyId=${studyId}&semesterId=${semesterId}`);
  };

  const handleDownload = (): void => {
    if (studyId) {
      downloadExcel.mutate(studyId);
    }
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex w-full flex-col gap-3 md:flex-row md:justify-between md:gap-0">
        <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
        <div className="flex justify-end">
          {isAdmin && selectedTab === 'curriculum' && (
            <Button size="sm" className="bg-primary-200" onClick={handleCurriculumAdd}>
              강의 추가
            </Button>
          )}
          {isAdmin && selectedTab === 'announcement' && (
            <Button size="sm" className="bg-primary-200" onClick={handleAnnouncementAdd}>
              공지사항 추가
            </Button>
          )}
          {isAdmin && selectedTab === 'manage_student' && (
            <Button size="sm" variant="secondary" onClick={handleDownload}>
              명단 다운로드
            </Button>
          )}
        </div>
      </div>
      <div className="mt-6 min-h-[300px]">
        {selectedTab === 'curriculum' && (
          <SlideFade key="curriculum" className="w-full">
            <LectureList
              isAdmin={isAdmin}
              isStudent={isStudent}
              studyName={studyName ?? ''}
              studyId={studyId}
              lectureList={lectureList}
              semesterId={semesterId}
            />
          </SlideFade>
        )}
        {selectedTab === 'announcement' && (
          <SlideFade key="announcement" className="w-full">
            <AnnouncementTable
              studyId={studyId}
              isInstructor={isAdmin}
              pageableModel={studyAnnouncements}
            />
          </SlideFade>
        )}
        {selectedTab === 'manage_student' && (
          <SlideFade key="manage_student" className="w-full">
            {isGroupStudy ? (
              <div className="flex flex-col gap-6">
                <StudyGroupList
                  studyId={studyId || 0}
                  groupList={groupList?.studyGroups || []}
                  onWithdraw={(studyId, memberId) => {
                    withdrawStudent.mutate({ studyId, memberId });
                  }}
                  onDelete={(groupId) => {
                    DialogUtil.showConfirm('조를 삭제하시겠습니까?', () => {
                      if (studyId) {
                        editGroup.mutateAsync({
                          studyId,
                          groupId,
                          groupData: {
                            groupName: '',
                            bojHandles: [],
                          },
                        });
                      }
                    });
                  }}
                  onEdit={(groupId, groupData) => {
                    DialogUtil.showComponent(
                      <EditGroupDialog
                        initialData={groupData}
                        onEditGroup={async (updatedGroupData) => {
                          if (studyId) {
                            await editGroup.mutateAsync({
                              studyId,
                              groupId,
                              groupData: updatedGroupData,
                            });
                          }
                        }}
                        onValidateHandle={async (handle) => {
                          try {
                            if (studyId) {
                              await validateStudent.mutateAsync({ studyId, bojHandle: handle });
                              return true;
                            }
                            return false;
                          } catch (error) {
                            return false;
                          }
                        }}
                      />
                    );
                  }}
                />
                <StudyUnassignedGroup
                  studyId={studyId || 0}
                  onWithdraw={(studyId, memberId) => {
                    withdrawStudent.mutate({ studyId, memberId });
                  }}
                  members={groupList?.aloneStudents || []}
                  onAddGroup={() => {
                    DialogUtil.showComponent(
                      <AddGroupDialog
                        onAddGroup={async (groupData) => {
                          if (studyId) {
                            await createGroup.mutateAsync({ studyId, groupData });
                          }
                        }}
                        onValidateHandle={async (handle) => {
                          try {
                            if (studyId) {
                              await validateStudent.mutateAsync({ studyId, bojHandle: handle });
                              return true;
                            }
                            return false;
                          } catch (error) {
                            return false;
                          }
                        }}
                      />
                    );
                  }}
                />
              </div>
            ) : (
              <StudentList
                studyId={studyId || 0}
                onWithdraw={(studyId, memberId) => {
                  withdrawStudent.mutate({ studyId, memberId });
                }}
                studentList={groupList?.aloneStudents || []}
              />
            )}
          </SlideFade>
        )}
      </div>
    </div>
  );
}
