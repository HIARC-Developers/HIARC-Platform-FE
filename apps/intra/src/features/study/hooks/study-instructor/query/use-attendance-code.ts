import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyInstructorApi } from '@/features/study/api';

export function useAttendanceCode(
  studyId: number,
  lectureId: number
): UseQueryResult<string, Error> {
  const query = useQuery({
    queryKey: ['attendance', { studyId, lectureId }],
    queryFn: () => studyInstructorApi.GET_ATTENDANCE_CODE(studyId, lectureId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
