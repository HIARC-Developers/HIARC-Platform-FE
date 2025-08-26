import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';

import { PageableModel, StudySummary } from '@hiarc-platform/shared';
import { studyCommonApi } from '@/features/study/api';
import { StudyQueryParams } from '@/features/study/api/study-common';

export default function useStudies(
  params: StudyQueryParams = {}
): UseQueryResult<PageableModel<StudySummary>, Error> {
  const query = useQuery({
    queryKey: ['studies', params],
    queryFn: () => studyCommonApi.GET_STUDIES(params),
    placeholderData: keepPreviousData,
  });

  return query;
}
