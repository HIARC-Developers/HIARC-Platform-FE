import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import type { StudyQueryParams } from '../types/request/study-request';
import { PageableModel, StudySummary } from '@hiarc-platform/shared';

export function useStudies(
  params: StudyQueryParams = {}
): UseQueryResult<PageableModel<StudySummary>, Error> {
  const query = useQuery({
    queryKey: ['studies', params],
    queryFn: () => studyApi.GET_ALL_STUDIES(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
