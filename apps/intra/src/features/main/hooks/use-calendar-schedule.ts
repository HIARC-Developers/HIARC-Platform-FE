import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { mainApi } from '../api/main';
import { CalendarSchedule } from '../types/model/calendar-schedule';

interface UseCalendarScheduleParams {
  median: string;
  range: number;
  enabled?: boolean;
}

export function useCalendarSchedule({
  median,
  range,
}: UseCalendarScheduleParams): UseQueryResult<CalendarSchedule[], Error> {
  const query = useQuery<CalendarSchedule[], Error>({
    queryKey: ['calendar-schedule', median, range],
    queryFn: () => mainApi.CALENDAR_SCHEDULE({ median, range }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false, // 재시도 완전히 비활성화
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 비활성화
    refetchOnMount: false, // 마운트 시 재요청 비활성화
    refetchOnReconnect: false, // 네트워크 재연결 시 재요청 비활성화
  });
  return query;
}
