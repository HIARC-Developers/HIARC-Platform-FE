import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { mainApi } from '../api/main';

import { StudyNow } from '../types/model/study-now';

export const useStudiesNow = (): UseQueryResult<StudyNow[], Error> =>
  useQuery({
    queryKey: ['studies-now'],
    queryFn: () => mainApi.STUDIES_NOW(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
