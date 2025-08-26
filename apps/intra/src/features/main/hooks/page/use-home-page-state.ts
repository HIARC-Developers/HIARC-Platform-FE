import { useAuthStore } from '@/shared/store/auth-store';

export function useHomePageState() {
  const { isAuthenticated } = useAuthStore();

  return {
    isAuthenticated,
  };
}