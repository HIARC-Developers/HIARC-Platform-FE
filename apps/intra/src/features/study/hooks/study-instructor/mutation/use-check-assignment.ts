import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { DialogUtil } from '@hiarc-platform/ui';
import { studyInstructorApi } from '@/features/study/api/study-instructor';

export function useCheckAssignment(): UseMutationResult<
  void,
  Error,
  { studyId: number; round: number },
  unknown
> {
  const mutation = useMutation({
    mutationFn: ({ studyId, round }: { studyId: number; round: number }) =>
      studyInstructorApi.CHECK_ASSIGNMENT(studyId, round),
    onSuccess: () => {
      DialogUtil.showSuccess('과제가 성공적으로 확인되었습니다.');
    },
  });

  return mutation;
}
