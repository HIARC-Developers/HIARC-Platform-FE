'use client';

import {
  AnnouncementContentSection,
  AnnouncementIndicatorSection,
  AnnouncementInfoSection,
  Button,
  LoadingDots,
} from '@hiarc-platform/ui';
import { useAnnouncementDetailPageState } from '../../hooks/page/use-announcement-detail-page-state';

export function MobileAnnouncementDetailPage(): React.ReactElement {
  const { announcement, memberRole, isLoading, error, handleGoToList } =
    useAnnouncementDetailPageState();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingDots size="lg" />
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">공지사항을 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <AnnouncementInfoSection
        className="mt-4"
        announcementTitle={announcement.announcementTitle}
        announcementCategory={announcement.announcementCategory}
        announcementDate={announcement.announcementDate}
        urlList={announcement.urlList}
        place={announcement.place}
        scheduleStartAt={announcement.scheduleStartAt}
        scheduleEndAt={announcement.scheduleEndAt}
        applicationStartAt={announcement.applicationStartAt}
        applicationEndAt={announcement.applicationEndAt}
        applicationUrl={announcement.applicationUrl}
        memberRole={memberRole}
      />
      <AnnouncementContentSection
        images={announcement.imageUrls || []}
        content={announcement.content}
      />
      <AnnouncementIndicatorSection prevData={announcement.prev} nextData={announcement.next} />
      <Button variant="line" className="w-full max-w-[186px]" onClick={handleGoToList}>
        목록으로
      </Button>
    </div>
  );
}
