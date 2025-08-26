import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { StudyInitialForm } from '@hiarc-platform/shared';
import { studyInstructorApi } from '@/features/study/api';

export function useStudyInitialForm(
  studyId: number | undefined
): UseQueryResult<StudyInitialForm, Error> {
  const query = useQuery({
    queryKey: ['study-initial-form', studyId],
    queryFn: () => studyInstructorApi.GET_STUDY_INITIAL_FORM(studyId!),
    enabled: Boolean(studyId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
