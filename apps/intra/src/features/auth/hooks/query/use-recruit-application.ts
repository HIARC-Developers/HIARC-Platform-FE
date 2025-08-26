import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { authApi, RecruitApplicationResponse } from '../../api/auth';

export default function useRecruitApplication(): UseQueryResult<RecruitApplicationResponse, Error> {
  const query = useQuery({
    queryKey: ['recruit-application'],
    queryFn: authApi.RECRUIT_APPLICATION,
    retry: false,
  });

  return query;
}
