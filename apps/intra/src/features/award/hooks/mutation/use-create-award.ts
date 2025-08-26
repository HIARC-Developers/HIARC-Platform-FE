import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { CreateAwardRequest, awardsApi } from '../../api/awards';

export default function useCreateAward(): UseMutationResult<
  void,
  Error,
  CreateAwardRequest,
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: awardsApi.CREATE_AWARD,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      queryClient.invalidateQueries({ queryKey: ['awards', 'me'] });
      queryClient.invalidateQueries({ queryKey: ['member', 'me'] });
    },
  });
}
