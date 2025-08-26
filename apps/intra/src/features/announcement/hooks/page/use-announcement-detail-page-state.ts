import { useRouter, useParams } from 'next/navigation';
import useAnnouncement from '../query/use-announcement';
import { AnnnouncementType } from '@hiarc-platform/shared';
import { formatDateWithDots } from '@hiarc-platform/util';
import { useAuthStore } from '@/shared/store/auth-store';

export function useAnnouncementDetailPageState() {
  const router = useRouter();
  const params = useParams();
  const announcementId = String(params.id);
  const { user } = useAuthStore();

  const { data: announcement, isLoading, error } = useAnnouncement(announcementId);

  const handleGoBack = (): void => {
    router.back();
  };

  const handleGoToList = (): void => {
    router.push('/announcement');
  };

  // 공지사항 데이터 가공
  const processedAnnouncement = announcement
    ? {
        ...announcement,
        announcementTitle: announcement.announcementTitle || '제목 없음',
        announcementCategory: AnnnouncementType[announcement.announcementType || 'GENERAL'],
        announcementDate: formatDateWithDots(announcement.createdAt ?? ''),
        urlList: announcement.attachmentUrls || [],
        place: announcement.place ?? undefined,
        scheduleStartAt: announcement.scheduleStartAt
          ? new Date(announcement.scheduleStartAt)
          : undefined,
        scheduleEndAt: announcement.scheduleEndAt
          ? new Date(announcement.scheduleEndAt)
          : undefined,
        applicationStartAt: announcement.applicationStartAt
          ? new Date(announcement.applicationStartAt)
          : undefined,
        applicationEndAt: announcement.applicationEndAt
          ? new Date(announcement.applicationEndAt)
          : undefined,
        applicationUrl: announcement.applicationUrl || '',
        content: announcement.content || '',
      }
    : null;

  return {
    announcement: processedAnnouncement,
    memberRole: user?.memberRole || null,
    isLoading,
    error,
    handleGoBack,
    handleGoToList,
  };
}
