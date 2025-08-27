import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { studyApi } from '../api/study';

import { CreateAssignmentRequest } from '@hiarc-platform/shared/src/types/study/create-assignment-request';
import { DialogUtil } from '@hiarc-platform/ui';

export function useCreateAssignment(): UseMutationResult<
  void,
  Error,
  { studyId: number; lectureId: number; data: CreateAssignmentRequest },
  unknown
> {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      studyId,
      lectureId,
      data,
    }: {
      studyId: number;
      lectureId: number;
      data: CreateAssignmentRequest;
    }) => studyApi.CREATE_ASSIGNMENT(studyId, lectureId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studies'] });
      queryClient.invalidateQueries({ queryKey: ['lectures'] });
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      DialogUtil.showSuccess('과제가 성공적으로 등록되었습니다.');
    },
    onError: (error) => {
    },
  });

  return mutation;
}
