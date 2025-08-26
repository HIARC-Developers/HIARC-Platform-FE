import useOAuthCallback from '@/features/auth/hooks/callback/use-oauth-callback';

export function useOAuthCallbackPageState() {
  const { isProcessing } = useOAuthCallback();

  return {
    isProcessing,
  };
}