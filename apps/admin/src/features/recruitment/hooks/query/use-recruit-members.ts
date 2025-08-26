import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { PageableModel, StudentApply } from '@hiarc-platform/shared';
import { recruitmentApi } from '../../api';

interface RecruitMembersParam {
  semesterId: number;
  page: number;
  size: number;
}

export function useRecruitMembers(
  params: RecruitMembersParam
): UseQueryResult<PageableModel<StudentApply>, Error> {
  const query = useQuery({
    queryKey: ['recruitment-list', params],
    queryFn: () => recruitmentApi.GET_RECRUIT_MEMBERS(params),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: Boolean(params.semesterId),
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return query;
}
