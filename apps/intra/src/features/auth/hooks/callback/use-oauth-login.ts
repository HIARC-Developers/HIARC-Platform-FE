import { useState } from 'react';
import { authApi } from '../../api/auth';

type OAuthProvider = 'google' | 'kakao' | 'naver';

interface UseOAuthLoginReturn {
  login(provider: OAuthProvider): Promise<void>;
  isLoading: boolean;
}

export default function useOAuthLogin(): UseOAuthLoginReturn {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (provider: OAuthProvider): Promise<void> => {
    try {
      setIsLoading(true);

      switch (provider) {
        case 'google':
          authApi.GOOGLE_LOGIN();
          break;
        default:
          throw new Error(`지원하지 않는 OAuth 제공자입니다: ${provider}`);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
}
