import {
  AddGroupDialog,
  Button,
  cn,
  DialogUtil,
  EditGroupDialog,
  SlideFade,
  StudyUnassignedGroup,
  Tabs,
} from '@hiarc-platform/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LectureList } from './lecture-list';
import { AnnouncementTable } from './announcement-table';
import { StudentList } from './student-list';
import { useStudyAnnouncements } from '../../hooks/use-study-announcements';
import { useLecturesByStudy } from '../../hooks';
import { useStudyGroupList } from '../../hooks/use-study-group-list';
import { useValidateStudent } from '../../hooks/use-validate-student';
import { useCreateGroup } from '../../hooks/use-create-group';
import { StudyGroupList } from '../../../../../../../packages/ui/src/components/study/study-group-list';
import { useEditGroup } from '../../hooks/use-edit-group';
import { useWithdrawStudent } from '../../hooks/use-withdraw-student';
import { useDownloadStudyMemberExcel } from '../../hooks/use-download-study-member-excel';
import { UpdateStatusDialog } from './update-status-dialog';

interface TabSectionProps {
  studyName?: string;
  studyId?: number;
  isAdmin?: boolean;
  isGroupStudy?: boolean;
  className?: string;
}

export function TabSection({
  className,
  isAdmin,
  isGroupStudy = true,
  studyId,
  studyName,
}: TabSectionProps): React.ReactElement {
  const router = useRouter();

  const tabs = [
    { label: '커리큘럼', value: 'curriculum' },
    { label: '공지사항', value: 'announcement' },
    ...(isAdmin ? [{ label: '스터디원 관리', value: 'manage_student' }] : []),
  ];

  const [selectedTab, setSelectedTab] = useState('curriculum');
  const { data: pageableModel } = useStudyAnnouncements({
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
    router.push(`/announcement/write?type=STUDY&studyId=${studyId}&isLecture=true`);
  };

  const handleAnnouncementAdd = (): void => {
    router.push(`/announcement/write?type=STUDY&studyId=${studyId}`);
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
            <LectureList studyName={studyName ?? ''} studyId={studyId} lectureList={lectureList} />
          </SlideFade>
        )}
        {selectedTab === 'announcement' && (
          <SlideFade key="announcement" className="w-full">
            <AnnouncementTable pageableModel={pageableModel} isInstructor={true} />
          </SlideFade>
        )}
        {selectedTab === 'manage_student' && (
          <SlideFade key="manage_student" className="w-full">
            {isGroupStudy ? (
              <div className="flex flex-col gap-6">
                <StudyGroupList
                  isAdmin={true}
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
                  onChangeStatus={(studyId, memberId) => {
                    DialogUtil.showComponent(
                      <UpdateStatusDialog studyId={studyId} memberId={memberId} />
                    );
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
                  isAdmin={true}
                  studyId={studyId || 0}
                  members={groupList?.aloneStudents || []}
                  onChangeStatus={(studyId, memberId) => {
                    DialogUtil.showComponent(
                      <UpdateStatusDialog studyId={studyId} memberId={memberId} />
                    );
                  }}
                  onWithdraw={(studyId, memberId) => {
                    withdrawStudent.mutate({ studyId, memberId });
                  }}
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
                isAdmin={true}
                studyId={studyId || 0}
                onChangeStatus={(studyId, memberId) => {
                  DialogUtil.showComponent(
                    <UpdateStatusDialog studyId={studyId} memberId={memberId} />
                  );
                }}
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
