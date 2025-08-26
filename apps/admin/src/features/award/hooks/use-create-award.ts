import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';
import { CreateAwardRequest } from '../types/request/create-award-request';
import { awardApi } from '../api/award';

export const useCreateAdminAward = (): UseMutationResult<unknown, unknown, CreateAwardRequest> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAwardRequest) => awardApi.CREATE_ADMIN_AWARD(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-awards'] });
    },
  });
};
