import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { UpdateRecruitmentRequest } from '@hiarc-platform/shared';
import { DialogUtil } from '@hiarc-platform/ui';
import { recruitmentApi } from '../../api';

interface UpdateRecruitmentParams {
  semesterId: number;
  data: UpdateRecruitmentRequest;
}

export function useUpdateRecruitment(): UseMutationResult<
  void,
  Error,
  UpdateRecruitmentParams,
  unknown
> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ semesterId, data }: UpdateRecruitmentParams) =>
      recruitmentApi.UPDATE_RECRUITMENT(semesterId, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ['recruitment', variables.semesterId] });
      DialogUtil.showSuccess('학회원 모집 정보가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      console.error('[HOOK] useUpdateRecruitment 에러:', error);
    },
  });

  return mutation;
}
