import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { memberApi } from '../../../api/member';

export function useDeleteMember(): UseMutationResult<void, Error, number, unknown> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (memberId: number) => memberApi.DELETE_MEMBER(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-list'] });
      queryClient.invalidateQueries({ queryKey: ['admin-list'] });
      queryClient.invalidateQueries({ queryKey: ['instructor-list'] });
      queryClient.invalidateQueries({ queryKey: ['recruitment-list'] });
      DialogUtil.showSuccess('회원이 성공적으로 삭제되었습니다.');
    },
  });

  return mutation;
}
