import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { DialogUtil } from '@hiarc-platform/ui';
import { memberApi } from '../../../api/member';

interface UpdateMemberApplyParams {
  semesterId: number;
  memberId: number;
  applicationStatus: string;
}

export function useUpdateMemberApply(): UseMutationResult<
  void,
  Error,
  UpdateMemberApplyParams,
  unknown
> {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, UpdateMemberApplyParams>({
    mutationFn: ({ semesterId, memberId, applicationStatus }: UpdateMemberApplyParams) =>
      memberApi.UPDATE_MEMBER_APPLY(semesterId, memberId, applicationStatus),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: ['recruitment-list'] });
      queryClient.invalidateQueries({ queryKey: ['member-list'] });
      DialogUtil.showSuccess('학생 지원 상태가 성공적으로 업데이트되었습니다.');
    },
  });

  return mutation;
}
