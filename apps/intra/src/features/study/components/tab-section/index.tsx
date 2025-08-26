import { Button, cn, SlideFade, Tabs } from '@hiarc-platform/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LectureList } from './lecture-list';
import { AnnouncementTable } from './announcement-table';
import { StudentList } from './student-list';
import { useLecturesByStudy } from '../../hooks/study-common/query/use-lectures';
import { useStudyAnnouncements } from '../../hooks/study-common/query/use-study-announcements';
import { useStudyMembers } from '../../hooks/study-instructor/query/use-study-members';

interface TabSectionProps {
  isStudent?: boolean;
  studyName?: string;
  studyId?: number;
  semesterId?: number;
  isAdmin?: boolean;
  className?: string;
}

export function TabSection({
  className,
  studyName,
  isAdmin,
  studyId,
  semesterId,
  isStudent,
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
  const { data: studentList } = useStudyMembers(studyId || 0);

  const handleCurriculumAdd = (): void => {
    router.push(
      `/announcement/write?type=STUDY&studyId=${studyId}&semesterId=${semesterId}&isLecture=true`
    );
  };

  const handleAnnouncementAdd = (): void => {
    router.push(`/announcement/write?type=STUDY&studyId=${studyId}&semesterId=${semesterId}`);
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex w-full justify-between">
        <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
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
            <AnnouncementTable pageableModel={studyAnnouncements} />
          </SlideFade>
        )}
        {selectedTab === 'manage_student' && (
          <SlideFade key="manage_student" className="w-full">
            <StudentList studentList={studentList || []} />
          </SlideFade>
        )}
      </div>
    </div>
  );
}
