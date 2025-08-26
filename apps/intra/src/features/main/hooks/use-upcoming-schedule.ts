import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { UpcomingSchedule } from '../types/model/upcoming-schedule';
import { mainApi } from '../api/main';

export const useUpcomingSchedule = (): UseQueryResult<UpcomingSchedule, Error> =>
  useQuery({
    queryKey: ['upcoming-schedule'],
    queryFn: () => mainApi.UPCOMING_SCHEDULE(),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
