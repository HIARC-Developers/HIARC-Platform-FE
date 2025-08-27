import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/auth-store';
import { DialogUtil } from '@hiarc-platform/ui';
import { clearAllAuthData } from '../utils/cookie-utils';

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

// Pretty Logger (dio style)
const prettyLog = {
  request: (config: InternalAxiosRequestConfig & { _requestStartTime?: number }) => {
    if (process.env.NODE_ENV === 'production') return;
    
    const timestamp = new Date().toLocaleTimeString();
    console.group(`🚀 [${timestamp}] ${config.method?.toUpperCase()} ${config.url}`);

    if (config.params && Object.keys(config.params).length > 0) {
      console.log('📝 Query Parameters:');
      console.table(config.params);
    }

    if (config.data) {
      console.log('📦 Request Body:');
      console.log(JSON.stringify(config.data, null, 2));
    }

    console.log('⚙️ Headers:');
    console.table(config.headers);
    console.groupEnd();
  },

  response: (response: AxiosResponse & { config: { _requestStartTime?: number } }) => {
    if (process.env.NODE_ENV === 'production') return;
    
    const timestamp = new Date().toLocaleTimeString();
    const duration = response.config._requestStartTime
      ? Date.now() - response.config._requestStartTime
      : 0;

    console.group(
      `✅ [${timestamp}] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url} (${duration}ms)`
    );

    if (response.data) {
      console.log('📥 Response Data:');
      console.log(JSON.stringify(response.data, null, 2));
    }

    console.log('📊 Response Headers:');
    console.table(response.headers);
    console.groupEnd();
  },

  error: (error: AxiosError) => {
    if (process.env.NODE_ENV === 'production') return;
    
    const timestamp = new Date().toLocaleTimeString();
    const config = error.config;
    const response = error.response;

    console.group(
      `❌ [${timestamp}] ${response?.status || 'NETWORK_ERROR'} ${config?.method?.toUpperCase()} ${config?.url}`
    );

    if (response?.data) {
      console.log('💥 Error Response:');
      console.log(JSON.stringify(response.data, null, 2));
    }

    if (error.message) {
      console.log('📝 Error Message:');
      console.log(error.message);
    }

    console.groupEnd();
  },
};

// 요청 인터셉터
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  (config as InternalAxiosRequestConfig & { _requestStartTime?: number })._requestStartTime =
    Date.now();
  if (process.env.NODE_ENV !== 'production') {
    prettyLog.request(config as InternalAxiosRequestConfig & { _requestStartTime?: number });
  }
  return config;
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse & { config: { _requestStartTime?: number } }) => {
    prettyLog.response(response);
    return response;
  },
  async (error: AxiosError) => {
    if (process.env.NODE_ENV !== 'production') {
      prettyLog.error(error);
    }
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    const { clearAuth } = useAuthStore.getState();

    // 401 에러 처리 (인증 실패)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 인증 실패 시 모든 인증 정보 삭제
      clearAuth();
      clearAllAuthData();

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
