import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { awardsApi, UpdateAwardRequest } from '../../api/awards';
import { DialogUtil } from '@hiarc-platform/ui';

export default function useUpdateAward(): UseMutationResult<
  void,
  Error,
  { awardId: number; awardData: UpdateAwardRequest },
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ awardId, awardData }) => awardsApi.UPDATE_AWARD(awardId, awardData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
      queryClient.invalidateQueries({ queryKey: ['awards', 'me'] });
    },
  });
}
