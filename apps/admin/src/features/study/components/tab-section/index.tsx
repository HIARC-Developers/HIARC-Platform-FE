import { Button, cn, SlideFade, Tabs } from '@hiarc-platform/ui';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LectureList } from './lecture-list';
import { AnnouncementTable } from './announcement-table';
import { StudentList } from './student-list';
import { useStudyAnnouncements } from '../../hooks/use-study-announcements';
import { useLecturesByStudy } from '../../hooks';
import { useStudyMembers } from '../../hooks/use-study-members';

interface TabSectionProps {
  studyName?: string;
  studyId?: number;
  isAdmin?: boolean;
  className?: string;
}

export function TabSection({
  className,
  isAdmin,
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
  const { data: studentList } = useStudyMembers(studyId || 0);

  const handleCurriculumAdd = (): void => {
    router.push(`/announcement/write?type=STUDY&studyId=${studyId}&isLecture=true`);
  };

  const handleAnnouncementAdd = (): void => {
    router.push(`/announcement/write?type=STUDY&studyId=${studyId}`);
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex w-full justify-between">
        <Tabs tabs={tabs} activeTab={selectedTab} onTabClick={setSelectedTab} />
        {selectedTab === 'curriculum' && (
          <Button size="sm" className="bg-primary-200" onClick={handleCurriculumAdd}>
            강의 추가
          </Button>
        )}
        {selectedTab === 'announcement' && (
          <Button size="sm" className="bg-primary-200" onClick={handleAnnouncementAdd}>
            공지사항 추가
          </Button>
        )}
      </div>
      <div className="mt-6 min-h-[300px]">
        {selectedTab === 'curriculum' && (
          <SlideFade key="curriculum" className="w-full">
            <LectureList studyName={studyName ?? ''} studyId={studyId} lectureList={lectureList} />
          </SlideFade>
        )}
        {selectedTab === 'announcement' && (
          <SlideFade key="announcement" className="w-full">
            <AnnouncementTable pageableModel={pageableModel} />
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
