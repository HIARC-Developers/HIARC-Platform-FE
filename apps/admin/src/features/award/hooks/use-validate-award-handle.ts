import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query';
import { awardApi } from '../api/award';
import { DialogUtil } from '@hiarc-platform/ui';

export const useUpdateAwardHandle = (): UseMutationResult<
  unknown,
  unknown,
  { bojHandle: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bojHandle }: { bojHandle: string }) => awardApi.VALIDATE_AWARD_HANDLE(bojHandle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-awards'] });
      DialogUtil.showSuccess('검증이 완료되었습니다.');
    },
  });
};
