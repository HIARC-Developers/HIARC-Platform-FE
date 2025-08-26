import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Instructor } from '@hiarc-platform/shared';
import { adminApi } from '../../../api/admin';

export function useInstructors(semesterId: number): UseQueryResult<Instructor[], Error> {
  const query = useQuery({
    queryKey: ['instructor-list', semesterId],
    queryFn: () => adminApi.GET_INSTRUCTORS(semesterId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: Boolean(semesterId),
  });

  return query;
}
