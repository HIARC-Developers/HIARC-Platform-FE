import { apiClient } from '../../../shared/api/client';
import { MyInfo } from '../types/model/my-info';
import { SignupRequest } from '../types/request/signup-request';

interface MyInfoResponse {
  memberId: number;
  bojHandle: string;
  memberRole: 'GUEST' | 'ASSOCIATE' | 'REGULAR' | 'ADMIN';
  adminRole: 'NONE' | 'PRESIDENT' | 'VICE_PRESIDENT' | 'ETC';
}

interface ValidHandleResponse {
  isAvailable?: boolean;
  message?: string;
}

export interface RecruitApplicationResponse {
  description?: string;
  greetingDescription?: string;
}

export const authApi = {
  /**
   * 비회원에서 준회원으로 가입하는 API입니다. (OAuth 토큰 필요)
   * @param signupData - 가입에 필요한 사용자 정보입니다.
   * @returns void
   */
  SIGN_UP: async (signupData: SignupRequest): Promise<RecruitApplicationResponse> => {
    const response = await apiClient.post('/auth/signup', signupData);
    return response.data;
  },

  /**
   * Access Token과 Refresh Token을 갱신하는 API입니다. (refresh token cookie 필요)
   * @returns void
   */
  REFRESH_TOKEN: async (): Promise<void> => {
    try {
      const response = await apiClient.post('/auth/refresh');
    } catch (error) {
      throw error;
    }
  },

  /**
   * 로그아웃 처리 및 토큰을 만료시키는 API입니다. (access & refresh token cookies 필요)
   * @returns void
   */
  LOGOUT: async (): Promise<void> => {
    try {
      const response = await apiClient.post('/auth/refresh/logout');
    } catch (error) {
      throw error;
    }
  },

  /**
   * 로그인한 사용자의 정보를 조회하는 API입니다.
   * @returns 현재 사용자의 정보를 반환합니다.
   */
  GET_ME: async (): Promise<MyInfo> => {
    try {
      const response = await apiClient.get<MyInfoResponse>('/auth/me');
      return MyInfo.fromJson(response.data);
    } catch (error) {
      throw error;
    }
  },

  /**
   * 백준 핸들의 중복 여부 및 존재 여부를 검증하는 API입니다.
   * @param handle - 검증할 백준 핸들입니다.
   * @returns 핸들의 유효성 검증 결과를 반환합니다.
   */
  CHECK_HANDLE_VALIDITY: async (handle: string): Promise<ValidHandleResponse> => {
    try {
      const response = await apiClient.post<ValidHandleResponse>(
        `/auth/valid-handle?bojHandle=${handle}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Google OAuth 로그인으로 리다이렉트하는 함수입니다.
   * @returns void
   */
  GOOGLE_LOGIN: (): void => {
    const currentUrl = window.location.href;
    sessionStorage.setItem('redirectUrl', currentUrl);

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    // URL에서 host만 추출 (예: https://localhost:3000/login → localhost:3000)
    const urlObj = new URL(currentUrl);
    const hostOnly = urlObj.host;
    const refererParam = encodeURIComponent(hostOnly);
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google?target_url=${refererParam}`;
  },

  /**
   * 리크루트 지원서 정보를 조회하는 API입니다.
   * @returns 리크루트 지원서 정보를 반환합니다.
   */
  RECRUIT_APPLICATION: async (): Promise<RecruitApplicationResponse> => {
    try {
      const response = await apiClient.get<RecruitApplicationResponse>('/recruitment/application');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * 학회 가입 알림을 읽음 처리하는 API입니다.
   * @returns void
   */
  RECRUIT_NOTIFICATION_READ: async (semesterId: number): Promise<void> => {
    await apiClient.patch(`/recruitment/${semesterId}/notification/read`);
  },
};

// 타입들을 다시 export
export type { SignupRequest } from '../types/request/signup-request';
