import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { adminApi } from '../../../api/admin';

interface PatchAdminParams {
  semesterId: number;
  memberId: number;
  adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
}

export function useUpdateAdmin(): UseMutationResult<void, Error, PatchAdminParams, unknown> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (params: PatchAdminParams) => adminApi.UPDATE_ADMIN(params),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-list', variables.semesterId] });
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      DialogUtil.showSuccess('관리자 권한이 성공적으로 수정되었습니다.');
    },
  });

  return mutation;
}
