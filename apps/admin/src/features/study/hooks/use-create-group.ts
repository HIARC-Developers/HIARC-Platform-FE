import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { DialogUtil } from '@hiarc-platform/ui';
import { CreateGroupRequest } from '@hiarc-platform/shared';

export function useCreateGroup(): UseMutationResult<
  void,
  Error,
  { studyId: number; groupData: CreateGroupRequest },
  unknown
> {
  const mutation = useMutation({
    mutationFn: ({ studyId, groupData }: { studyId: number; groupData: CreateGroupRequest }) =>
      studyApi.CREATE_GROUP(studyId, groupData),
    onSuccess: () => {
      DialogUtil.showSuccess('그룹이 성공적으로 생성되었습니다.');
    },
  });

  return mutation;
}
