import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { StudyGroupList } from '@hiarc-platform/shared';

export function useStudyGroupList(studyId: number): UseQueryResult<StudyGroupList, Error> {
  const query = useQuery({
    queryKey: ['study-group-list', studyId],
    queryFn: () => studyApi.GET_STUDY_GROUP_LIST(studyId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(studyId), // studyId가 있을 때만 실행
  });

  return query;
}
