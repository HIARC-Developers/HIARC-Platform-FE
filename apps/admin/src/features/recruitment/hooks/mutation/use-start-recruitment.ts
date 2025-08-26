import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { StartRecruitmentRequest } from '@hiarc-platform/shared';
import { recruitmentApi } from '../../api';

interface StartRecruitmentParams {
  semesterId: number;
  data: StartRecruitmentRequest;
}

export function useStartRecruitment(): UseMutationResult<void, Error, StartRecruitmentParams, unknown> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ semesterId, data }: StartRecruitmentParams) => 
      recruitmentApi.START_RECRUITMENT(semesterId, data),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ['recruitment-list'] });
      DialogUtil.showSuccess('모집이 성공적으로 시작되었습니다.');
    },
  });

  return mutation;
}
