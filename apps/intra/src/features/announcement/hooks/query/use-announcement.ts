import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { Announcement } from '@hiarc-platform/shared';
import { DialogUtil } from '@hiarc-platform/ui';
import { announcementApi } from '../../api/announcement';

// 모듈 레벨에서 에러를 추적하는 Set (전역적으로 중복 방지)
const shownErrorIds = new Set<string>();

export default function useAnnouncement(id: string): UseQueryResult<Announcement, Error> {
  const query = useQuery({
    queryKey: ['announcement', id],
    queryFn: () => announcementApi.GET_ANNOUNCEMENT(id),
    enabled: Boolean(id),
    retry: false,
  });

  useEffect(() => {
    if (query.error && id && !shownErrorIds.has(id)) {
      shownErrorIds.add(id);

      const axiosError = query.error as AxiosError<{ message?: string }>;
      const backendMessage = axiosError.response?.data?.message;
      const errorMessage =
        backendMessage || query.error.message || '공지사항을 불러오는 중 오류가 발생했습니다.';

      DialogUtil.showError(errorMessage, () => {
        window.history.back();
      });
    }

    // 쿼리가 성공하면 해당 ID를 Set에서 제거
    if (query.isSuccess && id) {
      shownErrorIds.delete(id);
    }

    // 컴포넌트 언마운트 시 해당 ID를 Set에서 제거 (페이지 이탈 시)
    return () => {
      if (id) {
        shownErrorIds.delete(id);
      }
    };
  }, [query.error, query.isSuccess, id]);

  return query;
}
