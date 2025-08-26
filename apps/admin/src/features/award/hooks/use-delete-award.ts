import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';
import { awardApi } from '../api/award';

export const useDeleteAward = (): UseMutationResult<unknown, unknown, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (awardId: number) => awardApi.DELETE_ADMIN_AWARD(awardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-awards'] });
    },
  });
};
