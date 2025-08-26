import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';

export function useAttendanceCode(
  studyId: number,
  lectureId: number
): UseQueryResult<string, Error> {
  const query = useQuery({
    queryKey: ['attendance', { studyId, lectureId }],
    queryFn: () => studyApi.GET_ATTENDANCE_CODE(studyId, lectureId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
