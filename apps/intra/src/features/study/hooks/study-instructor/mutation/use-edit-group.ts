import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { DialogUtil } from '@hiarc-platform/ui';
import { CreateGroupRequest } from '@hiarc-platform/shared';
import { studyInstructorApi } from '@/features/study/api/study-instructor';

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
    }) => studyInstructorApi.PATCH_GROUP(studyId, groupId, groupData),
    onSuccess: () => {
      DialogUtil.showSuccess('그룹이 성공적으로 수정되었습니다.');
    },
  });

  return mutation;
}
