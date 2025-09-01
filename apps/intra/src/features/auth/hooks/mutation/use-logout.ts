import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '../../api/auth';
import { useAuthStore } from '../../../../shared/store/auth-store';
import { queryKeys } from '@/shared/constants/query-keys';
import { clearAllAuthData } from '@/shared/utils/cookie-utils';

export default function useLogout(): UseMutationResult<void, Error, void, unknown> {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: authApi.LOGOUT,
    onSuccess: () => {
      // 먼저 인증 상태를 클리어
      clearAuth();
      // 그 다음 모든 인증 데이터 삭제 (쿠키 + localStorage)
      clearAllAuthData();
      // auth 관련 쿼리만 무효화하고 제거
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() });
      queryClient.clear();

      // 홈으로 이동 후 새로고침으로 상태 완전 초기화
      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
    onError: () => {
      // 먼저 인증 상태를 클리어
      clearAuth();
      // 그 다음 모든 인증 데이터 삭제 (쿠키 + localStorage)
      clearAllAuthData();
      // auth 관련 쿼리만 무효화하고 제거
      queryClient.removeQueries({ queryKey: queryKeys.auth.me() });
      queryClient.clear();

      // 홈으로 이동 후 새로고침으로 상태 완전 초기화
      router.push('/');
      setTimeout(() => {
        window.location.reload();
      }, 100);
    },
  });

  return mutation;
}
