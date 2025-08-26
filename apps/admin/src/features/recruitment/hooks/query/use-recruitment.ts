import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { recruitmentApi } from '../../api/recruitment';
import { Recruitment } from '@hiarc-platform/shared';

export function useRecruitment(semesterId: number | undefined): UseQueryResult<Recruitment, Error> {
  const query = useQuery({
    queryKey: ['recruitment', semesterId],
    queryFn: () => recruitmentApi.GET_RECRUITMENT(semesterId!),
    enabled: Boolean(semesterId),
  });

  return query;
}
