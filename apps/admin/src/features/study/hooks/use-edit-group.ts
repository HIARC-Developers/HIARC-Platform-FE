import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { DialogUtil } from '@hiarc-platform/ui';
import { CreateGroupRequest } from '@hiarc-platform/shared';

export function useEditGroup(): UseMutationResult<
  void,
  Error,
  { studyId: number; groupId: number; groupData: CreateGroupRequest },
  unknown
> {
  const mutation = useMutation({
    mutationFn: ({
      studyId,
      groupId,
      groupData,
    }: {
      studyId: number;
      groupId: number;
      groupData: CreateGroupRequest;
    }) => studyApi.PATCH_GROUP(studyId, groupId, groupData),
    onSuccess: () => {
      DialogUtil.showSuccess('그룹이 성공적으로 수정되었습니다.');
    },
  });

  return mutation;
}
