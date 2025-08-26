import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

import { studyMemberApi } from '@/features/study/api';
import { MyStudy } from '@/features/study/types/model/my-study';

export const useMyStudies = (isCurrent: boolean): UseQueryResult<MyStudy[], Error> =>
  useQuery({
    queryKey: ['my-studies', isCurrent],
    queryFn: () => studyMemberApi.GET_MY_STUDIES(isCurrent),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
