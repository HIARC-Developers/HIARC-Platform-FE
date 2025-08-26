import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';

import { StudySummary, PageableModel, SelectOption } from '@hiarc-platform/shared';
import { studyInstructorApi } from '@/features/study/api';

export function useStudyOptions(semesterId?: number | null): UseQueryResult<SelectOption[], Error> {
  const query = useQuery({
    queryKey: ['study-options', semesterId],
    queryFn: async (): Promise<SelectOption[]> => {
      const response: PageableModel<StudySummary> = await studyInstructorApi.GET_ALL_STUDIES({
        semesterId: Number(semesterId),
        page: 0,
        size: 1000, // 모든 스터디를 가져오기 위해 큰 수로 설정
      });

      const studies = response.content || [];
      return studies.map((study) => ({
        label: study.studyName || '제목 없음',
        value: study.studyId?.toString() || '',
      }));
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    enabled: Boolean(semesterId), // semesterId가 있을 때만 실행
  });

  return query;
}
