import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi } from '../../api/auth';
import { DialogUtil } from '@hiarc-platform/ui';

interface ValidHandleResponse {
  isAvailable?: boolean;
  message?: string;
}

export default function useHandleValidation(): UseMutationResult<
  ValidHandleResponse,
  Error,
  string
> {
  return useMutation({
    mutationFn: (handle: string) => authApi.CHECK_HANDLE_VALIDITY(handle),
    onSuccess: (data) => {
      if (data.isAvailable) {
        DialogUtil.showSuccess(data.message || '사용 가능한 핸들입니다.');
      } else {
        DialogUtil.showError(data.message || '사용할 수 없는 핸들입니다.');
      }
    },
    onError: (error) => {
      DialogUtil.showServerError(error, '핸들 인증 중 오류가 발생했습니다.');
    },
  });
}
