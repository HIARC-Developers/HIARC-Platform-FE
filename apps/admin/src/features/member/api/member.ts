import { PageableModel, Student } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';
import { MemberRequestParam } from '../types/request/member-request-param';
import { AxiosResponse } from 'axios';

export const memberApi = {
  /**
   * 페이지네이션된 회원 목록을 조회하는 API입니다.
   * @param memberRequestParam - 회원 조회를 위한 필터링 및 페이지네이션 파라미터입니다.
   * @returns 회원 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_MEMBERS: async (memberRequestParam: MemberRequestParam): Promise<PageableModel<Student>> => {
    const response = await apiClient.get('/admin/members', {
      params: memberRequestParam,
    });
    return PageableModel.fromJson(response.data, Student);
  },

  /**
   * 특정 회원의 지원 상태를 업데이트하는 API입니다.
   * @param semesterId - 학기 ID입니다.
   * @param memberId - 회원 ID입니다.
   * @param applicationStatus - 새로운 지원 상태입니다.
   * @returns void
   */
  UPDATE_MEMBER_APPLY: async (
    semesterId: number,
    memberId: number,
    applicationStatus: string
  ): Promise<void> => {
    await apiClient.patch<void>(`/admin/recruitment/${semesterId}/members/${memberId}`, {
      applicationStatus,
    });
  },

  /**
   * 특정 회원을 탈퇴 처리하는 API입니다.
   * @param memberId - 탈퇴 처리할 회원의 ID입니다.
   * @returns void
   */
  DELETE_MEMBER: async (memberId: number): Promise<void> => {
    await apiClient.post(`/admin/members/${memberId}/withdraw`);
  },

  /**
   * 특정 학기의 회원 정보를 엑셀 파일로 다운로드하는 API입니다.
   * @param semesterId - 다운로드할 학기의 ID입니다.
   * @returns Blob 형태의 엑셀 파일 응답을 반환합니다.
   */
  DOWNLOAD_EXCEL: async (semesterId: number): Promise<AxiosResponse> =>
    await apiClient.get('/admin/members/excel/download', {
      params: { semesterId },
      responseType: 'blob',
    }),
};
