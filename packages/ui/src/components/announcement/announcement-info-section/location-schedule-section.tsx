import { formatDateTimeWithDots, formatDateWithDots } from '@hiarc-platform/util';
import { Button } from '../../button';
import { Divider } from '../../divider';
import { Label } from '../../label/label';

interface LocationScheduleSectionProps {
  place?: string;
  scheduleStartAt?: Date;
  applicationStartAt?: Date;
  applicationEndAt?: Date;
  applicationUrl?: string;
  memberRole?: string | null;
}

function isApplicationPeriodActive(startDate: Date, endDate: Date): boolean {
  const today = new Date();
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startDateOnly = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const endDateOnly = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  return todayDateOnly >= startDateOnly && todayDateOnly <= endDateOnly;
}

export function LocationScheduleSection({
  place,
  scheduleStartAt,
  applicationStartAt,
  applicationEndAt,
  applicationUrl,
  memberRole,
}: LocationScheduleSectionProps): React.ReactElement | null {
  return (
    <>
      <div className="mt-6 flex w-full gap-4">
        <div className="flex flex-1 items-center gap-4">
          <Label className="w-[86px] text-gray-500" size="lg" weight="bold">
            장소
          </Label>
          <Label size="lg" weight="medium">
            {place ? place : '-'}
          </Label>
        </div>
        <div className="flex flex-1 items-center gap-4">
          <Label className="w-[86px] text-gray-500" weight="bold">
            진행 일시
          </Label>
          <Label weight="medium">
            {scheduleStartAt ? formatDateTimeWithDots(scheduleStartAt) : '-'}
          </Label>
        </div>
        {applicationStartAt && applicationEndAt && (
          <div className="flex flex-1 items-center gap-4">
            <Label className="w-[86px] text-gray-500" weight="bold">
              신청 기한
            </Label>
            <Label weight="medium">
              {formatDateWithDots(applicationStartAt)}
              {applicationEndAt && ` ~ ${formatDateWithDots(applicationEndAt)}`}
            </Label>
            <Button
              size="xs"
              variant="line"
              className="border-primary-100 text-primary-100"
              disabled={
                !applicationUrl ||
                !isApplicationPeriodActive(applicationStartAt, applicationEndAt) ||
                memberRole === 'GUEST' ||
                memberRole === 'ASSOCIATE' ||
                memberRole === null
              }
              onClick={() => applicationUrl && window.open(applicationUrl, '_blank')}
            >
              신청하기
            </Button>
          </div>
        )}
      </div>
      <Divider variant="horizontal" size="full" className="mt-6 bg-gray-200" />
    </>
  );
}
