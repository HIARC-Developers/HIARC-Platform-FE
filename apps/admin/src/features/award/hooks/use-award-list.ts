import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { Award, PageableModel } from '@hiarc-platform/shared';

import { AwardQueryParams } from '../types/request/award-query-params';
import { awardApi } from '../api/award';

export const useAwardList = (
  params: AwardQueryParams = {}
): UseQueryResult<PageableModel<Award>, unknown> =>
  useQuery({
    queryKey: ['admin-awards', params],
    queryFn: () => awardApi.GET_ADMIN_AWARDS(params),
    staleTime: 5 * 60 * 1000,
  });
