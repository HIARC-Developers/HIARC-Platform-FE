import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/auth-store';
import { DialogUtil } from '@hiarc-platform/ui';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// 전역 API 클라이언트
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Pretty Logger (dio style) - Debug logs removed
const prettyLog = {
  request: (config: InternalAxiosRequestConfig & { _requestStartTime?: number }) => {
    // Debug logs removed
  },

  response: (response: AxiosResponse & { config: { _requestStartTime?: number } }) => {
    // Debug logs removed
  },

  error: (error: AxiosError) => {
    // Debug logs removed
  },
};

// 요청 인터셉터
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  (config as InternalAxiosRequestConfig & { _requestStartTime?: number })._requestStartTime =
    Date.now();
  prettyLog.request(config as InternalAxiosRequestConfig & { _requestStartTime?: number });
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse & { config: { _requestStartTime?: number } }) => {
    prettyLog.response(response);
    return response;
  },
  async (error: AxiosError) => {
    prettyLog.error(error);
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러 처리 (인증 실패)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { clearAuth } = useAuthStore.getState();

      // 인증 실패 시 모든 인증 정보 삭제
      clearAuth();

      // localStorage도 완전히 정리
      localStorage.removeItem('auth-storage');

      // 401 에러 다이얼로그 표시
      DialogUtil.showError('로그인이 만료되었습니다. 다시 로그인해주세요.', () => {
        // 확인 버튼 클릭 시 로그인 페이지로 리디렉션
        window.location.href = '/login';
      });

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;
