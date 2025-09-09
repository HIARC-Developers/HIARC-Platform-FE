import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { myApi } from '../../api/member';
import { MemberProfile } from '../../types/model/member-profile';

export function useMemberProfile(memberId: number): UseQueryResult<MemberProfile, Error> {
  return useQuery({
    queryKey: ['member', memberId],
    queryFn: () => myApi.GET_MEMBER_PROFILE(memberId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}
