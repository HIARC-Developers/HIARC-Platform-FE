import { useQuery } from '@tanstack/react-query';

import type { UseQueryResult } from '@tanstack/react-query';
import { CurrentSemester } from '@hiarc-platform/shared';
import { semesterApi } from '../api/semester';

export const useCurrentSemester = (): UseQueryResult<CurrentSemester, unknown> =>
  useQuery({
    queryKey: ['admin-current-semester'],
    queryFn: () => semesterApi.GET_CURRENT_SEMESTER(),
    staleTime: 5 * 60 * 1000,
  });
