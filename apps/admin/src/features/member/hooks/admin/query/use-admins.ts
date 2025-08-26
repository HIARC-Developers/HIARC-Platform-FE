import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { Admin } from '@hiarc-platform/shared';
import { adminApi } from '../../../api/admin';

export function useAdmins(semesterId: number): UseQueryResult<Admin[], Error> {
  const query = useQuery({
    queryKey: ['admin-list', semesterId],
    queryFn: () => adminApi.GET_ADMINS(semesterId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: Boolean(semesterId),
  });

  return query;
}
