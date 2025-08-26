import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { adminApi } from '../../../api/admin';

interface CreateAdminParams {
  semesterId: number;
  bojHandle: string;
  adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
}

export function useCreateAdmin(): UseMutationResult<void, Error, CreateAdminParams, unknown> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: CreateAdminParams) => adminApi.CREATE_ADMIN(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-list', variables.semesterId] });
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      DialogUtil.hideAllDialogs();
      DialogUtil.showSuccess('관리자가 성공적으로 추가되었습니다.');
    },
  });

  return mutation;
}
