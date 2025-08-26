import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';
import { announcementApi } from '../../api/announcement';
import { AnnouncementQueryParams } from '../../types/request/announcement-query-params';

export default function useAnnouncements(
  params: AnnouncementQueryParams = {}
): UseQueryResult<PageableModel<AnnouncementSummary>, Error> {
  console.log('[HOOK] useAnnouncements 호출:', params);

  const query = useQuery({
    queryKey: ['announcements', params],
    queryFn: () => announcementApi.GET_ANNOUNCEMENTS(params),
    placeholderData: keepPreviousData,
  });

  return query;
}
