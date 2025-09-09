import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { studyApi } from '../api/study';
import { DialogUtil } from '@hiarc-platform/ui';

export function useValidateInstructor(): UseMutationResult<void, Error, string, unknown> {
  const mutation = useMutation({
    mutationFn: (bojHandle: string) => studyApi.VALIDATE_INSTRUCTOR(bojHandle),
    onSuccess: () => {
      DialogUtil.showSuccess('강사 핸들명이 성공적으로 검증되었습니다.');
    },
  });

  return mutation;
}
