import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { recruitmentApi } from '../../api';

export function useStartRecruitment(): UseMutationResult<void, Error, number, unknown> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (semesterId: number) => recruitmentApi.START_RECRUITMENT(semesterId),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ['recruitment-list'] });
      DialogUtil.showSuccess('모집이 성공적으로 시작되었습니다.');
    },
  });

  return mutation;
}
