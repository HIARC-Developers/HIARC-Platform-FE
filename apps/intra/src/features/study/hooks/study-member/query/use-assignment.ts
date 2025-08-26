import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';

import { Assignment } from '@hiarc-platform/shared';
import { studyMemberApi } from '@/features/study/api';

export function useAssignment(
  studyId: number,
  lectureId: number
): UseQueryResult<Assignment, Error> {
  const query = useQuery({
    queryKey: ['assignments', { studyId, lectureId }],
    queryFn: () => studyMemberApi.GET_ASSIGNMENT(studyId, lectureId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
