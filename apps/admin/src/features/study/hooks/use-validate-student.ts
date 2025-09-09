import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { DialogUtil } from '@hiarc-platform/ui';

export function useValidateStudent(): UseMutationResult<
  void,
  Error,
  { studyId: number; bojHandle: string },
  unknown
> {
  const mutation = useMutation({
    mutationFn: ({ studyId, bojHandle }: { studyId: number; bojHandle: string }) =>
      studyApi.VALIDATE_STUDENT(studyId, bojHandle),
    onSuccess: () => {
      DialogUtil.showSuccess('학생 핸들명이 성공적으로 검증되었습니다.');
    },
    onError: (error) => {
      DialogUtil.showServerError(error, '학생 핸들명 검증에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return mutation;
}
