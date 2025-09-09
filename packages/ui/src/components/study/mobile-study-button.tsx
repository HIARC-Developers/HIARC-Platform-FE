import { Study } from '@hiarc-platform/shared';
import { Button } from '@hiarc-platform/ui';

interface MobileStudyButtonProps {
  isAdmin?: boolean;
  studyData?: Study | null;

  onApplyClick?(): void;
}

export function MobileStudyButton({
  isAdmin = false,
  studyData,
  onApplyClick,
}: MobileStudyButtonProps): React.ReactElement {
  const hasRecruitmentDates = studyData?.recruitmentStartDate && studyData?.recruitmentEndDate;

  const getRecruitmentStatus = (): 'before' | 'open' | 'closed' => {
    if (
      !hasRecruitmentDates ||
      !studyData?.recruitmentStartDate ||
      !studyData?.recruitmentEndDate
    ) {
      return 'closed';
    }
    const now = new Date();
    const startDate = new Date(studyData.recruitmentStartDate);
    const endDate = new Date(studyData.recruitmentEndDate);

    const [nowDateStr] = now.toISOString().split('T');
    const [startDateStr] = startDate.toISOString().split('T');
    const [endDateStr] = endDate.toISOString().split('T');

    const nowTime = new Date(nowDateStr).getTime();
    const startTime = new Date(startDateStr).getTime();
    const endTime = new Date(endDateStr).getTime();

    if (nowTime < startTime) {
      return 'before';
    }
    if (nowTime >= startTime && nowTime <= endTime) {
      return 'open';
    }
    return 'closed';
  };

  const getDaysToStart = (): number => {
    if (!studyData?.recruitmentStartDate) {
      return 0;
    }

    const now = new Date();
    const startDate = new Date(studyData.recruitmentStartDate);

    const [nowDateStr] = now.toISOString().split('T');
    const [startDateStr] = startDate.toISOString().split('T');

    const nowTime = new Date(nowDateStr).getTime();
    const startTime = new Date(startDateStr).getTime();
    const diffTime = startTime - nowTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const getDaysToEnd = (): number => {
    if (!studyData?.recruitmentEndDate) {
      return 0;
    }

    const now = new Date();
    const endDate = new Date(studyData.recruitmentEndDate);

    const [nowDateStr] = now.toISOString().split('T');
    const [endDateStr] = endDate.toISOString().split('T');

    const nowTime = new Date(nowDateStr).getTime();
    const endTime = new Date(endDateStr).getTime();
    const diffTime = endTime - nowTime;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const recruitmentStatus = getRecruitmentStatus();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
      {hasRecruitmentDates && !isAdmin && !studyData?.isStudent && !studyData?.isInstructor && (
        <>
          {recruitmentStatus === 'before' && (
            <Button size="lg" className="w-full" variant="line" disabled>
              D-{getDaysToStart()} 오픈 예정
            </Button>
          )}
          {recruitmentStatus === 'open' && (
            <Button size="lg" className="w-full" variant="fill" onClick={onApplyClick}>
              D-{getDaysToEnd()} 신청하기
            </Button>
          )}
        </>
      )}

      {studyData?.isStudent && (
        <Button size="lg" className="w-full" variant="line" disabled>
          신청완료
        </Button>
      )}
    </div>
  );
}
