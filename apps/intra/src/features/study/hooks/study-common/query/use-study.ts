import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Study } from '@hiarc-platform/shared';
import { studyCommonApi } from '@/features/study/api';

export function useStudy(id: number): UseQueryResult<Study, Error> {
  const query = useQuery({
    queryKey: ['study', id],
    queryFn: () => studyCommonApi.GET_STUDY(id),
    enabled: Boolean(id),
  });

  return query;
}
