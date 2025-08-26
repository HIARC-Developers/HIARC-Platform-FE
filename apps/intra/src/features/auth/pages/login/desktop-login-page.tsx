'use client';

import { Button, Label, LoadingDots, Title } from '@hiarc-platform/ui';
import Image from 'next/image';
import { useLoginPageState } from '@/features/auth/hooks/page/use-login-page-state';
import { BrowserUtils } from '@/shared/utils/browser-utils';

export function DesktopLoginPage(): React.ReactElement {
  const { user, isLoading, isGoogleLoginLoading, handleGoogleLogin } = useLoginPageState();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>리다이렉트 중...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-[400px] flex-col items-center justify-center px-4 pt-20">
      <Image src={'/shared-assets/SquareLogo.png'} width={145} height={65} alt="logo" />
      <Title className="mt-11" size="sm" weight="bold">
        로그인
      </Title>
      
      {BrowserUtils.isInAppBrowser() && (
        <div className="mt-4 rounded-lg bg-yellow-50 p-3 text-center">
          <p className="text-sm text-yellow-800">
            📱 인앱 브라우저에서는 구글 로그인이 제한됩니다.
          </p>
          <p className="mt-1 text-xs text-yellow-600">
            우측 상단 메뉴에서 "브라우저에서 열기"를 선택해주세요.
          </p>
        </div>
      )}

      <Button
        className="mt-7 w-full"
        variant="social_login"
        size="xl"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoginLoading}
      >
        <Image src={'/shared-assets/GoogleLogin.svg'} width={20} height={20} alt="Google" />
        <Label size="lg">{isGoogleLoginLoading ? '로그인 중...' : '구글 계정으로 로그인'}</Label>
      </Button>
    </div>
  );
}
