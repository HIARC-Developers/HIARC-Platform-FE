'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Label, LoadingDots, Title } from '@hiarc-platform/ui';
import Image from 'next/image';
import { useAuthStore } from '@/shared/store/auth-store';
import useGoogleLogin from '../../hooks/use-google-login';
import { BrowserUtils } from '@/shared/utils/browser-utils';

export function LoginPage(): React.ReactElement {
  const { user, isLoading, logout } = useAuthStore();
  const router = useRouter();
  const { googleLogin, isLoading: isGoogleLoginLoading } = useGoogleLogin();

  useEffect(() => {
    if (user) {
      logout();
      console.log('이미 로그인된 사용자입니다:', user);
      // router.push('/');
    }
  }, [user, router, logout]);

  const handleGoogleLogin = (): void => {
    googleLogin();
  };

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
    <div className="mx-auto flex max-w-[320px] flex-col items-center justify-center px-6 pt-16 md:max-w-[400px] md:px-4 md:pt-20">
      <Image src={'/shared-assets/SquareLogo.png'} width={120} height={120} alt="logo" />
      <Title className="mt-8 md:mt-11" size="sm" weight="bold">
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
        className="mt-6 w-full md:mt-7"
        variant="social_login"
        size="lg"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoginLoading}
      >
        <Image
          src={'/shared-assets/GoogleLogin.svg'}
          width={18}
          height={18}
          alt="Google"
          className="md:h-5 md:w-5"
        />
        <Label size="md" className="md:text-lg">
          {isGoogleLoginLoading ? '로그인 중...' : '구글 계정으로 로그인'}
        </Label>
      </Button>
    </div>
  );
}
