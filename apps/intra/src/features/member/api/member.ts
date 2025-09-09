import { apiClient } from '../../../shared/api/client';
import { MemberProfile } from '../types/model/member-profile';

export const myApi = {
  /**
   * 현재 사용자의 자기소개를 수정하는 API입니다.
   * @param introduction - 새로운 자기소개 내용입니다.
   * @returns void
   */
  UPDATE_MY_INTRODUCTION: async (introduction: string): Promise<void> =>
    await apiClient.patch('/members/me/introduction', {
      introduction,
    }),

  /**
   * 현재 사용자의 프로필 정보를 조회하는 API입니다.
   * @returns 사용자 프로필 객체를 반환합니다.
   */
  GET_MY_PROFILE: async (): Promise<MemberProfile> => {
    const response = await apiClient.get('/members/me');
    return MemberProfile.fromJson(response.data);
  },

  /**
   * 특정 회원의 프로필 정보를 조회하는 API입니다.
   * @param memberId - 조회할 회원의 ID입니다.
   * @returns 회원 프로필 객체를 반환합니다.
   */
  GET_MEMBER_PROFILE: async (memberId: number): Promise<MemberProfile> => {
    const response = await apiClient.get(`/members/${memberId}`);
    return MemberProfile.fromJson(response.data);
  },

  /**
   * 백준 핸들을 통해 회원 ID를 조회하는 API입니다.
   * @param bojHandle - 조회할 백준 핸들입니다.
   * @returns 회원 ID를 반환합니다.
   */
  GET_MEMBER_ID_BY_HANDLE: async (bojHandle: string): Promise<number> => {
    const response = await apiClient.get('/members/search', {
      params: {
        bojHandle,
      },
    });
    return response.data.memberId;
  },
};
