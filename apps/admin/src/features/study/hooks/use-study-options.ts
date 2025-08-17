import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { StudySummary, PageableModel, SelectOption } from '@hiarc-platform/shared';

export function useStudyOptions(semesterId?: string | null): UseQueryResult<SelectOption[], Error> {
  console.log('[HOOK] useStudyOptions 호출:', semesterId);

  const query = useQuery({
    queryKey: ['study-options', semesterId],
    queryFn: async (): Promise<SelectOption[]> => {
      const response: PageableModel<StudySummary> = await studyApi.GET_ALL_STUDIES({
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
