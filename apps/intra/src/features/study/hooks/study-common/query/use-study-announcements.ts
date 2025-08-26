import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';
import { studyCommonApi } from '@/features/study/api';

export function useStudyAnnouncements(
  params: { studyId: number; page: number; size: number } = {
    studyId: 0,
    page: 0,
    size: 10,
  }
): UseQueryResult<PageableModel<AnnouncementSummary>, Error> {
  const query = useQuery({
    queryKey: ['studies', params],
    queryFn: () => studyCommonApi.GET_STUDY_ANNOUNCEMENTS(params.studyId, params.page, params.size),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
