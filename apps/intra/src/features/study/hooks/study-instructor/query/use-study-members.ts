import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { StudyMember } from '@hiarc-platform/shared';
import { studyInstructorApi } from '@/features/study/api';

export function useStudyMembers(studyId: number): UseQueryResult<StudyMember[], Error> {
  const query = useQuery({
    queryKey: ['study-members', studyId],
    queryFn: () => studyInstructorApi.GET_STUDY_MEMBERS(studyId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(studyId), // studyId가 있을 때만 실행
  });

  return query;
}
