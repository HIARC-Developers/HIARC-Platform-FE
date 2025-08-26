import { useAuthStore } from '@/shared/store/auth-store';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { authApi } from '../../api/auth';

export default function useRefreshToken(): UseMutationResult<void, Error, void, unknown> {
  const { clearAuth } = useAuthStore();

  const mutation = useMutation({
    mutationFn: authApi.REFRESH_TOKEN,
    onError: () => {
      clearAuth();
    },
  });

  return mutation;
}
