import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { Study } from '@hiarc-platform/shared';

export function useStudy(studyId: number | undefined): UseQueryResult<Study, Error> {
  const query = useQuery({
    queryKey: ['study', studyId],
    queryFn: () => studyApi.GET_STUDY_DETAIL(studyId!),
    enabled: Boolean(studyId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
