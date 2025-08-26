import Image from 'next/image';
import { cn } from '../../lib/utils';
import { Divider } from '../divider';
import { Label } from '../label/label';
import { useRouter } from 'next/navigation';
import { StudyStatusChip } from '../chip/study-status-chip';

export default function StudyGrayChip({
  type,
  title,
}: {
  type: 'schedule' | 'delivery';
  title: string;
}): React.ReactElement {
  return (
    <div className="flex h-[25px] w-fit items-center gap-1 rounded-md bg-gray-100 px-3 text-md text-gray-700">
      <div>
        {type === 'schedule' ? (
          <Image src="/shared-assets/Schedule.svg" alt="" height={16} width={16} />
        ) : (
          <Image src="/shared-assets/People.svg" alt="" height={16} width={16} />
        )}
      </div>
      <div>{title}</div>
    </div>
  );
}

interface StudyCardProps {
  studyId: number;
  time: string;
  delivery: string;
  studyTitle: string;
  hostName: string;
  startDate: string;
  endDate: string;
  studyDescription: string;
  state: 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED' | 'ENROLLED';
  isEnrolled: boolean;
}

function MobileStudyCard({
  time,
  delivery,
  studyTitle,
  hostName,
  startDate,
  endDate,
  studyDescription,
  state,
  isEnrolled,
}: StudyCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 rounded-lg border border-gray-200 px-5 py-5',
        'hover:bg-gray-50',
        'transition-colors duration-200'
      )}
    >
      <div className="flex gap-2">
        <StudyGrayChip type="schedule" title={time} />
        <StudyGrayChip type="delivery" title={delivery} />
      </div>
      <div className="flex items-center">
        <div className=" flex flex-col">
          <Label size="lg" weight="bold">
            {studyTitle}
          </Label>
          <Label size="sm" weight="regular" className="text-gray-700">
            {hostName} | {startDate}~{endDate}
          </Label>
        </div>
        <StudyStatusChip status={isEnrolled ? 'ENROLLED' : state} className="ml-auto h-[26px]" />
      </div>
      <Label size="md" weight="regular" className="mt-1 line-clamp-2 overflow-hidden text-ellipsis">
        {studyDescription}
      </Label>
    </div>
  );
}

function DesktopStudyCard({
  time,
  delivery,
  studyTitle,
  hostName,
  startDate,
  endDate,
  studyDescription,
  state,
  isEnrolled,
}: StudyCardProps): React.ReactElement {
  return (
    <div
      className={cn(
        'flex w-full flex-col gap-2 rounded-lg border border-gray-200  px-5 py-5',
        'hover:bg-gray-50',
        'transition-colors duration-200'
      )}
    >
      <div className="flex gap-2">
        <StudyGrayChip type="schedule" title={time} />
        <StudyGrayChip type="delivery" title={delivery} />
      </div>
      <div className="flex items-center">
        <Image src="/shared-assets/Basic.svg" alt="" height={42} width={42} />
        <div className="ml-3 flex flex-col gap-1">
          <Label size="lg" weight="bold">
            {studyTitle}
          </Label>
          <div className="flex items-center gap-2 text-gray-700">
            <Label size="sm" weight="regular" className="text-gray-700">
              {hostName}
            </Label>
            <Divider variant="vertical" size="10px" />
            <Label size="sm" weight="regular" className="text-gray-700">
              {startDate}~{endDate}
            </Label>
          </div>
        </div>
        <StudyStatusChip status={isEnrolled ? 'ENROLLED' : state} className="ml-auto" />
      </div>
      <Label size="md" weight="regular" className="mt-1 line-clamp-2 overflow-hidden text-ellipsis">
        {studyDescription}
      </Label>
    </div>
  );
}

export function StudyCard({
  studyId,
  time,
  delivery,
  studyTitle,
  hostName,
  startDate,
  endDate,
  studyDescription,
  state,
  isEnrolled = false,
}: StudyCardProps): React.ReactElement {
  const router = useRouter();

  return (
    <div
      className="flex w-full cursor-pointer flex-col"
      onClick={() => {
        router.push(`/study/${studyId}`);
      }}
    >
      <div className="block md:hidden">
        <MobileStudyCard
          studyId={studyId}
          time={time}
          delivery={delivery}
          studyTitle={studyTitle}
          hostName={hostName}
          startDate={startDate}
          endDate={endDate}
          studyDescription={studyDescription}
          state={state}
          isEnrolled={isEnrolled}
        />
      </div>
      <div className="hidden md:block">
        <DesktopStudyCard
          studyId={studyId}
          time={time}
          delivery={delivery}
          studyTitle={studyTitle}
          hostName={hostName}
          startDate={startDate}
          endDate={endDate}
          studyDescription={studyDescription}
          state={state}
          isEnrolled={isEnrolled}
        />
      </div>
    </div>
  );
}
