import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { StudyMember } from '@hiarc-platform/shared';

export function useStudyMembers(studyId: number): UseQueryResult<StudyMember[], Error> {
  const query = useQuery({
    queryKey: ['study-members', studyId],
    queryFn: () => studyApi.GET_STUDY_MEMBERS(studyId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(studyId), // studyId가 있을 때만 실행
  });

  return query;
}
