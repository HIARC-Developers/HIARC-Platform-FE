import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { Assignment } from '@hiarc-platform/shared';

export function useAssignment(
  studyId: number,
  lectureId: number
): UseQueryResult<Assignment, Error> {
  const query = useQuery({
    queryKey: ['assignments', { studyId, lectureId }],
    queryFn: () => studyApi.GET_ASSIGNMENT(studyId, lectureId),
    placeholderData: keepPreviousData,
    retry: false,
  });

  return query;
}
