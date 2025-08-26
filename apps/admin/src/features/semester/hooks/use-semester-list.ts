import { useQuery } from '@tanstack/react-query';

import type { UseQueryResult } from '@tanstack/react-query';
import { Semester } from '@hiarc-platform/shared';
import { semesterApi } from '../api/semester';

export const useSemesterList = (): UseQueryResult<Semester[], unknown> =>
  useQuery({
    queryKey: ['admin-semesters'],
    queryFn: () => semesterApi.GET_SEMESTER_LIST(),
    staleTime: 5 * 60 * 1000,
  });
