import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { adminApi } from '../../../api/admin';

export function useValidateAdminHandle(): UseMutationResult<void, Error, string, unknown> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bojHandle: string) => adminApi.VALIDATE_ADMIN_HANDLE(bojHandle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      DialogUtil.showSuccess('핸들을 성공적으로 검증했습니다.');
    },
    onError: (error) => {
      DialogUtil.showServerError(error);
    },
  });

  return mutation;
}
