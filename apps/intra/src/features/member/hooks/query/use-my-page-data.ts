import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { myApi } from '../../api/member';
import { MemberProfile } from '../../types/model/member-profile';

export function useMyProfileData(): UseQueryResult<MemberProfile, Error> {
  return useQuery({
    queryKey: ['member', 'me'],
    queryFn: myApi.GET_MY_PROFILE,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: false,
  });
}
