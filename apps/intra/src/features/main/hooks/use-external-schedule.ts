import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { mainApi } from '../api/main';
import { Schedule } from '../types/model/schedule';

export const useExternalSchedule = (): UseQueryResult<Schedule[], Error> =>
  useQuery({
    queryKey: ['external-schedule'],
    queryFn: () => mainApi.EXTERNAL_SCHEDULE(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
