import { useQuery, UseQueryResult, keepPreviousData } from '@tanstack/react-query';
import { memberApi } from '../../../api/member';
import { PageableModel, Student } from '@hiarc-platform/shared';
import { MemberRequestParam } from '../../../types/request/member-request-param';

export function useMembers(
  params: MemberRequestParam
): UseQueryResult<PageableModel<Student>, Error> {
  const query = useQuery({
    queryKey: ['student-list', params],
    queryFn: () => memberApi.GET_MEMBERS(params),
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: Boolean(params.semesterId),
  });

  return query;
}
