import { useQuery } from '@tanstack/react-query';
import { announcementApi } from '../api/announcement';
import { AnnouncementQueryParams } from '../types/request/announcement-query-params';

import type { UseQueryResult } from '@tanstack/react-query';
import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';

export const useAdminAnnouncementList = (
  params: AnnouncementQueryParams = {}
): UseQueryResult<PageableModel<AnnouncementSummary>, unknown> =>
  useQuery({
    queryKey: ['admin-announcements', params],
    queryFn: () => announcementApi.GET_ADMIN_ANNOUNCEMENTS(params),
    staleTime: 5 * 60 * 1000,
  });
