import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '../store/auth-store';
import { DialogUtil } from '@hiarc-platform/ui';

// In development, use Next.js API route proxy to avoid CORS issues
// In production, use direct API calls
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://test.hiarc-official.com';

// 전역 API 클라이언트
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 중복 에러 처리 방지를 위한 플래그는 이제 store에서 관리

// Pretty Logger (dio style) - Debug logs removed
const prettyLog = {
  request: (config: InternalAxiosRequestConfig) => {
    // Debug logs removed
  },

  response: (response: AxiosResponse) => {
    // Debug logs removed
  },

  error: (error: AxiosError) => {
    // Debug logs removed
  },
};

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  const configWithTime = config as InternalAxiosRequestConfig & { _requestStartTime?: number };
  configWithTime._requestStartTime = Date.now();
  prettyLog.request(config);
  return config;
});

// 응답 인터셉터
// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    prettyLog.response(response);
    return response;
  },
  async (error) => {
    prettyLog.error(error);
    const originalRequest = error.config;

    const { clearAuth } = useAuthStore.getState();

    // 401 (인증 실패)
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      clearAuth();
      localStorage.removeItem('auth-storage');

      // 401 에러 다이얼로그 표시
      DialogUtil.showError('로그인이 만료되었거나 권한이 없습니다. 다시 로그인해주세요.', () => {
        // 확인 버튼 클릭 시 로그인 페이지로 리디렉션
        window.location.href = '/login';
      });

      return Promise.reject(error);
    }

    // 403 (권한 없음)
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
