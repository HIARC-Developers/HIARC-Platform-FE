import { Study } from '@hiarc-platform/shared';
import { Button, Label, StudyStatusChip, Title } from '@hiarc-platform/ui';

interface StudyTitleProps {
  isAdmin?: boolean;
  studyData?: Study | null;
  onEditClick?(): void;
  onApplyClick?(): void;
}

export function StudyTitle({
  isAdmin = false,
  studyData,
  onEditClick,
  onApplyClick,
}: StudyTitleProps): React.ReactElement {
  const hasRecruitmentDates = studyData?.recruitmentStartDate && studyData?.recruitmentEndDate;

  const isRecruitmentOpen = (): boolean => {
    if (
      !hasRecruitmentDates ||
      !studyData?.recruitmentStartDate ||
      !studyData?.recruitmentEndDate
    ) {
      return false;
    }
    const now = new Date();
    const startDate = new Date(studyData.recruitmentStartDate);
    const endDate = new Date(studyData.recruitmentEndDate);

    const [nowDateStr] = now.toISOString().split('T');
    const [startDateStr] = startDate.toISOString().split('T');
    const [endDateStr] = endDate.toISOString().split('T');

    return nowDateStr >= startDateStr && nowDateStr <= endDateStr;
  };
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Title size="sm" weight="bold" disableAnimation>
              {studyData?.name}
            </Title>
            <StudyStatusChip status={studyData?.studyStatus || 'PREPARING'} />
          </div>
          <Label>{studyData?.introduction || '-'}</Label>
        </div>
        <div className="hidden flex-shrink-0 items-center md:ml-6 md:flex">
          {hasRecruitmentDates && (
            <div className="flex items-center">
              <Label size="lg" className="text-gray-500">
                모집일
              </Label>
              <Label size="lg" weight="medium" className="ml-4 text-gray-900">
                {studyData.recruitingDates}
              </Label>
            </div>
          )}
          {(isAdmin || studyData?.isInstructor) && (
            <Button size="md" className="ml-6" variant="line" onClick={onEditClick}>
              수정하기
            </Button>
          )}
          {hasRecruitmentDates && !isAdmin && !studyData?.isStudent && !studyData?.isInstructor && (
            <div>
              {isRecruitmentOpen() ? (
                <Button size="md" className="ml-6" variant="fill" onClick={onApplyClick}>
                  스터디 신청
                </Button>
              ) : (
                <Button size="md" className="ml-6" variant="line" disabled>
                  모집 종료
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
