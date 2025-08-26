import { cn, Label, LabeledSelector, Tabs } from '@hiarc-platform/ui';
import { AttendanceTable } from '@hiarc-platform/ui/src/components/table/attendance-table';
import { useState, useMemo } from 'react';

import { SelectOption } from '@hiarc-platform/shared';
import { useMyStudies } from '@/features/study/hooks/study-member/query/use-my-studies';
import { useMyStudyInfo } from '@/features/study/hooks/study-member/query/use-my-study-info';

interface StudySectionProps {
  className?: string;
}

export function StudySection({ className }: StudySectionProps): React.ReactElement {
  const tabItems = [
    { label: '이번 학기 스터디', value: 'study' },
    { label: '이전 스터디', value: 'study_history' },
  ];
  const [tab, setTab] = useState('study');
  const [selectedStudyId, setSelectedStudyId] = useState<number | null>(null);

  // 현재 탭에 따라 isCurrent 값 결정
  const isCurrent = tab === 'study';

  // 스터디 목록 가져오기
  const { data: myStudies = [] } = useMyStudies(isCurrent);

  // 선택된 스터디의 상세 정보 가져오기
  const { data: myStudyInfo } = useMyStudyInfo(selectedStudyId || 0);

  // 스터디 목록을 SelectOption으로 변환
  const studyOptions: SelectOption[] = useMemo(
    () =>
      myStudies.map((study) => ({
        value: study.studyId?.toString() || '',
        label: study.name || '',
      })),
    [myStudies]
  );

  // RoundStatus를 boolean 배열로 변환
  const attendanceStatus: boolean[] = useMemo(
    () => myStudyInfo?.roundStatuses?.map((status) => status.attendanceCompleted || false) || [],
    [myStudyInfo?.roundStatuses]
  );

  const assignmentStatus: boolean[] = useMemo(
    () => myStudyInfo?.roundStatuses?.map((status) => status.assignmentCompleted || false) || [],
    [myStudyInfo?.roundStatuses]
  );

  // 탭 변경 시 선택된 스터디 초기화
  const handleTabChange = (newTab: string): void => {
    setTab(newTab);
    setSelectedStudyId(null);
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <Tabs tabs={tabItems} activeTab={tab} onTabClick={handleTabChange} />
      <LabeledSelector
        placeholder={'스터디를 선택해주세요.'}
        label={''}
        options={studyOptions}
        value={selectedStudyId?.toString() || ''}
        onChange={(value: string) => {
          const studyId = value ? Number(value) : null;
          setSelectedStudyId(studyId);
        }}
        className="mt-6 max-w-[390px]"
      />
      <Label size="lg" weight="bold" className="mt-6">
        상세 현황
      </Label>
      <AttendanceTable
        className="mb-20 mt-4"
        attendance={attendanceStatus}
        assignment={assignmentStatus}
      />
    </div>
  );
}
