'use client';

import { LoadingDots } from '@hiarc-platform/ui';
import { useOAuthCallbackPageState } from '@/features/auth/hooks/page/use-oauth-callback-page-state';

export function DesktopOAuthCallbackPage(): React.ReactElement {
  const { isProcessing } = useOAuthCallbackPageState();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingDots />
        <div>{isProcessing ? '로그인 처리 중...' : '완료'}</div>
      </div>
    </div>
  );
}