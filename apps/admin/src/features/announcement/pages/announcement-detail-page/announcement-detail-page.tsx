'use client';
import { useParams, useRouter } from 'next/navigation';
import { useAdminAnnouncement } from '@/features/announcement/hooks';
import {
  BackButton,
  LoadingDots,
  Button,
  FadeIn,
  AnnouncementIndicatorSection,
  AnnouncementInfoSection,
  AnnouncementContentSection,
} from '@hiarc-platform/ui';

export function AnnouncementDetailPage(): React.ReactElement {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const { data: announcement, isLoading, error } = useAdminAnnouncement(id);

  const handleBackClick = (): void => {
    router.back();
  };

  const handleGoToList = (): void => {
    router.push('/announcement');
  };

  if (isLoading) {
    return (
      <>
        {/* Desktop loading */}
        <FadeIn
          isVisible={true}
          duration={0.3}
          className="hidden min-h-screen items-center justify-center md:flex"
        >
          <LoadingDots size="lg" className="flex min-h-screen items-center justify-center" />
        </FadeIn>
        {/* Mobile loading */}
        <FadeIn
          isVisible={true}
          duration={0.3}
          className="flex min-h-screen items-center justify-center px-4 md:hidden"
        >
          <LoadingDots size="lg" className="flex min-h-screen items-center justify-center" />
        </FadeIn>
      </>
    );
  }

  if (error) {
    return (
      <>
        {/* Desktop error */}
        <FadeIn
          isVisible={true}
          duration={0.3}
          className="hidden min-h-screen items-center justify-center md:flex"
        >
          <p className="text-gray-500">문제가 발생했습니다.</p>
        </FadeIn>
        {/* Mobile error */}
        <FadeIn
          isVisible={true}
          duration={0.3}
          className="flex min-h-screen items-center justify-center px-4 md:hidden"
        >
          <p className="text-center text-sm text-gray-500">문제가 발생했습니다.</p>
        </FadeIn>
      </>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop layout */}
      <FadeIn
        isVisible={Boolean(announcement)}
        duration={0.4}
        className="hidden flex-col items-center md:flex"
      >
        <BackButton onClick={handleBackClick} />
        <AnnouncementInfoSection
          className="mt-6"
          announcementTitle={announcement?.title || '제목 없음'}
          announcementCategory={announcement?.announcementType || 'GENERAL'}
          announcementDate={announcement?.createdAt?.toISOString() || '날짜 없음'}
          urlList={announcement?.attachmentUrls || []}
          place={announcement?.place || ''}
          scheduleStartAt={announcement?.scheduleStartAt || undefined}
          scheduleEndAt={announcement?.scheduleEndAt || undefined}
          applicationStartAt={announcement?.applicationStartAt || undefined}
          applicationEndAt={announcement?.applicationEndAt || undefined}
          applicationUrl={announcement?.applicationUrl || ''}
        />
        <AnnouncementContentSection
          className="mt-8"
          images={announcement?.imageUrls || []}
          content={announcement?.content || ''}
        />
        <AnnouncementIndicatorSection
          className="mt-8"
          prevData={announcement?.prev}
          nextData={announcement?.next}
        />
        <Button variant="line" className="mt-8 w-[186px]" onClick={handleGoToList}>
          목록으로
        </Button>
      </FadeIn>

      {/* Mobile layout */}
      <FadeIn
        isVisible={Boolean(announcement)}
        duration={0.4}
        className="flex flex-col items-center px-4 md:hidden"
      >
        <BackButton onClick={handleBackClick} />
        <AnnouncementInfoSection
          className="mt-4"
          announcementTitle={announcement?.title || '제목 없음'}
          announcementCategory={announcement?.announcementType || 'GENERAL'}
          announcementDate={announcement?.createdAt?.toISOString() || '날짜 없음'}
          urlList={announcement?.attachmentUrls || []}
          place={announcement?.place || ''}
          scheduleStartAt={announcement?.scheduleStartAt || undefined}
          scheduleEndAt={announcement?.scheduleEndAt || undefined}
          applicationStartAt={announcement?.applicationStartAt || undefined}
          applicationEndAt={announcement?.applicationEndAt || undefined}
          applicationUrl={announcement?.applicationUrl || ''}
        />
        <AnnouncementContentSection
          className="mt-6"
          images={announcement?.imageUrls || []}
          content={announcement?.content || ''}
        />
        <AnnouncementIndicatorSection
          className="mt-6"
          prevData={announcement?.prev}
          nextData={announcement?.next}
        />
        <Button variant="line" className="mt-6 w-full max-w-[200px]" onClick={handleGoToList}>
          목록으로
        </Button>
      </FadeIn>
    </div>
  );
}
