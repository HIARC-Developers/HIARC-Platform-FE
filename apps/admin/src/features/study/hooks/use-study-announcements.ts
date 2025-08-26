import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';

export function useStudyAnnouncements(
  params: { studyId: number; page: number; size: number } = {
    studyId: 0,
    page: 0,
    size: 10,
  }
): UseQueryResult<PageableModel<AnnouncementSummary>, Error> {
  const query = useQuery({
    queryKey: ['studies', params],
    queryFn: () => studyApi.GET_STUDY_ANNOUNCEMENT_LIST(params.studyId, params.page, params.size),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  return query;
}
