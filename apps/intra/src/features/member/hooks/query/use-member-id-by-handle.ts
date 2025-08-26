import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { myApi } from '../../api/member';

export function useMemberIdByHandle(bojHandle: string): UseQueryResult<number, Error> {
  return useQuery({
    queryKey: ['member', 'handle', bojHandle],
    queryFn: () => myApi.GET_MEMBER_ID_BY_HANDLE(bojHandle),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}
