import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi } from '../../api/auth';

export default function useRecruitNotificationRead(): UseMutationResult<
  void,
  Error,
  number,
  unknown
> {
  const mutation = useMutation({
    mutationFn: authApi.RECRUIT_NOTIFICATION_READ,
    onError: () => {
      // 알람 읽음 처리가 실패해도 에러를 발생시키지 않습니다.
    },
  });

  return mutation;
}
