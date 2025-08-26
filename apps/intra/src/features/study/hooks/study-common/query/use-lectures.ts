import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';

import { Lecture } from '@hiarc-platform/shared';
import { studyCommonApi } from '@/features/study/api';

export function useLecturesByStudy(studyId: number): UseQueryResult<Lecture[], Error> {
  const query = useQuery({
    queryKey: ['lectures', studyId],
    queryFn: () => studyCommonApi.GET_LECTURES(studyId),
    placeholderData: keepPreviousData,
    staleTime: 0, // 항상 최신 데이터 가져오도록 설정
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true, // 페이지 포커스 시 자동 갱신
    refetchOnMount: true, // 컴포넌트 마운트 시 자동 갱신
  });

  return query;
}
