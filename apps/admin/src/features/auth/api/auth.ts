import { apiClient } from '../../../shared/api/client';
import { MyInfo } from '../types/model/my-info';

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

interface RecruitApplicationResponse {
  description?: string;
  greetingDescription?: string;
}

export const authApi = {
  /**
   * 액세스 토큰과 리프레시 토큰을 갱신하는 API입니다.
   * 리프레시 토큰 쿠키가 필요합니다.
   * @returns void
   */
  REFRESH_TOKEN: async (): Promise<void> => {
    console.log('[AUTH API] REFRESH_TOKEN 요청');
    try {
      const response = await apiClient.post('/auth/refresh');
      console.log('[AUTH API] REFRESH_TOKEN 응답:', response.data);
    } catch (error) {
      console.error('[AUTH API] REFRESH_TOKEN 에러:', error);
      throw error;
    }
  },

  /**
   * 사용자를 로그아웃하고 토큰을 만료시키는 API입니다.
   * 액세스 토큰과 리프레시 토큰 쿠키가 필요합니다.
   * @returns void
   */
  LOGOUT: async (): Promise<void> => {
    console.log('[AUTH API] LOGOUT 요청');
    try {
      const response = await apiClient.post('/auth/refresh/logout');
      console.log('[AUTH API] LOGOUT 응답:', response.data);
    } catch (error) {
      console.error('[AUTH API] LOGOUT 에러:', error);
      throw error;
    }
  },

  /**
   * 현재 로그인한 사용자의 정보를 조회하는 API입니다.
   * @returns 사용자 정보 객체를 반환합니다.
   */
  GET_ME: async (): Promise<MyInfo> => {
    console.log('[AUTH API] GET_ME 요청');
    try {
      const response = await apiClient.get<MyInfoResponse>('/auth/me');
      console.log('[AUTH API] GET_ME 응답:', response.data);
      return MyInfo.fromJson(response.data);
    } catch (error) {
      console.error('[AUTH API] GET_ME 에러:', error);
      throw error;
    }
  },

  /**
   * 백준 핸들의 중복 여부와 존재 여부를 검증하는 API입니다.
   * @param handle - 검증할 백준 핸들입니다.
   * @returns 핸들 유효성 검증 결과를 반환합니다.
   */
  CHECK_HANDLE_VALIDITY: async (handle: string): Promise<ValidHandleResponse> => {
    console.log('[AUTH API] CHECK_HANDLE_VALIDITY 요청:', { handle });
    try {
      const response = await apiClient.post<ValidHandleResponse>(
        `/auth/valid-handle?bojHandle=${handle}`
      );
      return response.data;
    } catch (error) {
      console.error('[AUTH API] CHECK_HANDLE_VALIDITY 에러:', error);
      throw error;
    }
  },

  /**
   * Google OAuth 로그인 페이지로 리다이렉트하는 함수입니다.
   * 현재 URL을 세션 스토리지에 저장한 후 OAuth 로그인 URL로 이동합니다.
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
   * 현재 사용자의 모집 지원 상태 정보를 조회하는 API입니다.
   * @returns 모집 지원 정보를 반환합니다.
   */
  RECRUIT_APPLICATION: async (): Promise<RecruitApplicationResponse> => {
    console.log('[AUTH API] RECRUIT_APPLICATION 요청');
    try {
      const response = await apiClient.get<RecruitApplicationResponse>('/recruitment/application');
      return response.data;
    } catch (error) {
      console.error('[AUTH API] RECRUIT_APPLICATION 에러:', error);
      throw error;
    }
  },
};

// 타입들을 다시 export
export type { SignupRequest } from '../types/request/signup-request';
