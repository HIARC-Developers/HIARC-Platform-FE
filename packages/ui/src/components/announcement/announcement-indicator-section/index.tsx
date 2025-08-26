import { cn } from '../../../lib/utils';
import { NextButton } from './next-button';
import { PreviousButton } from './previous-button';
import { AnnouncementNavigationItem } from '@hiarc-platform/shared';
import { useRouter } from 'next/navigation';

interface AnnouncementIndicatorSectionProps {
  prevData?: AnnouncementNavigationItem | null;
  nextData?: AnnouncementNavigationItem | null;
  className?: string;
}

export function AnnouncementIndicatorSection({
  prevData,
  nextData,
  className,
}: AnnouncementIndicatorSectionProps): React.ReactElement {
  const router = useRouter();

  return (
    <div className={cn('flex w-full flex-col md:flex-row md:justify-between md:gap-2', className)}>
      <div className="flex">
        {prevData ? (
          <PreviousButton
            prevTitle={prevData?.title ?? '이전 공지사항'}
            onClick={() => {
              router.push(`/announcement/${prevData.announcementId}`);
            }}
          />
        ) : (
          <div />
        )}
      </div>
      <div className="flex md:ml-auto">
        {nextData && (
          <NextButton
            nextTitle={nextData?.title ?? '다음 공지사항'}
            onClick={() => {
              router.push(`/announcement/${nextData.announcementId}`);
            }}
          />
        )}
      </div>
    </div>
  );
}
