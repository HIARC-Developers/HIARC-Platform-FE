import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authApi } from '../api/auth';
import { useAuthStore } from '../../../shared/store/auth-store';

export default function useOAuthCallback(): { isProcessing: boolean } {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, clearAuth } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processOAuthCallback = async (): Promise<void> => {
      try {
        const needSignup = searchParams.get('needSignup');
        const email = searchParams.get('email');

        if (!needSignup) {
          console.error('needSignup 파라미터가 없습니다.');
          router.push('/login');
          return;
        }

        if (needSignup === 'true') {
          // 회원가입이 필요한 경우 - OAuth 실패 페이지로 이동
          if (email) {
            sessionStorage.setItem('signupEmail', email);
          }
          router.push('/oauth-fail/signup');
        } else if (needSignup === 'false') {
          // 로그인 완료된 사용자 - 유저 정보 패칭 후 메인으로 이동
          try {
            const getMeResponse = await authApi.GET_ME();

            // adminRole이 NONE인 경우 권한 없음 페이지로 이동
            if (getMeResponse.adminRole === 'NONE') {
              clearAuth();
              router.push('/oauth-fail/permission');
              return;
            }

            // Zustand store에 유저 정보만 저장 (토큰은 서버에서 관리)
            login(getMeResponse);
            router.push('/');
          } catch (error) {
            console.error('유저 정보 패칭 실패:', error);
            clearAuth();
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('OAuth 콜백 처리 실패:', error);
        clearAuth();
        router.push('/login');
      } finally {
        setIsProcessing(false);
      }
    };

    processOAuthCallback();
  }, [router, searchParams, login, clearAuth]);

  return {
    isProcessing,
  };
}
