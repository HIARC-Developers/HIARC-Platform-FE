import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { Announcement } from '@hiarc-platform/shared';

/**
 * 관리자용 특정 공지사항을 조회하는 훅입니다.
 * @param id - 조회할 공지사항의 ID입니다.
 * @returns 공지사항 정보가 담긴 쿼리 결과를 반환합니다.
 */
export const useAdminAnnouncement = (id: number): UseQueryResult<Announcement, Error> =>
  useQuery({
    queryKey: ['admin-announcement', id],
    queryFn: () => announcementApi.GET_ADMIN_ANNOUNCEMENT(id),
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000, // 5분
    retry: false,
  });
