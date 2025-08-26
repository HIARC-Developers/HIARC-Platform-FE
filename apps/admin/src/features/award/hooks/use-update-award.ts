import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';
import { awardApi } from '../api/award';
import { UpdateAwardRequest } from '../types/request/update-award-request';

export const useUpdateAward = (): UseMutationResult<
  unknown,
  unknown,
  { awardId: number; data: UpdateAwardRequest }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ awardId, data }: { awardId: number; data: UpdateAwardRequest }) =>
      awardApi.UPDATE_ADMIN_AWARD(awardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-awards'] });
    },
  });
};
