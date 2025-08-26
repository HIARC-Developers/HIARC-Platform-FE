'use client';

import { LoadingDots } from '@hiarc-platform/ui';
import useOAuthCallback from '../../../features/auth/hooks/use-oauth-callback';
import { useEffect, useState } from 'react';

export default function OAuthCallbackPage(): React.ReactElement {
  const { isProcessing } = useOAuthCallback();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoadingDots />
          <div>로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingDots />
        <div>{isProcessing ? '로그인 처리 중...' : '완료'}</div>
      </div>
    </div>
  );
}
