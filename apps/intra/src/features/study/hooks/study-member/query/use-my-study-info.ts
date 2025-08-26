import { studyMemberApi } from '@/features/study/api';
import { MyStudyInfo } from '@/features/study/types/model/my-study-info';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

export const useMyStudyInfo = (studyId: number): UseQueryResult<MyStudyInfo, Error> =>
  useQuery({
    queryKey: ['my-study-info', studyId],
    queryFn: () => studyMemberApi.GET_MY_STUDY_INFO(studyId),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
