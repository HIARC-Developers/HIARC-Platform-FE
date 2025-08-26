import { apiClient } from '@/shared/api/client';
import {
  PageableModel,
  Recruitment,
  StudentApply,
  UpdateRecruitmentRequest,
} from '@hiarc-platform/shared';
import { AxiosResponse } from 'axios';

export const recruitmentApi = {
  /**
   * 특정 학기의 모집 지원자 목록을 페이지네이션으로 조회하는 API입니다.
   * @param params - 학기 ID와 페이지네이션 정보입니다.
   * @param params.semesterId - 학기 ID입니다.
   * @param params.page - 페이지 번호입니다.
   * @param params.size - 페이지 크기입니다.
   * @returns 지원자 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_RECRUIT_MEMBERS: async ({
    semesterId,
    page,
    size,
  }: {
    semesterId: number;
    page: number;
    size: number;
  }): Promise<PageableModel<StudentApply>> => {
    const response = await apiClient.get<PageableModel<StudentApply>>(
      `/admin/recruitment/${semesterId}/members`,
      {
        params: { page, size },
      }
    );
    return PageableModel.fromJson(response.data, StudentApply);
  },

  /**
   * 특정 학기의 모집을 시작하는 API입니다.
   * @param semesterId - 모집을 시작할 학기의 ID입니다.
   * @returns void
   */
  START_RECRUITMENT: async (semesterId: number): Promise<void> => {
    await apiClient.post<void>(`/admin/recruitment/${semesterId}`);
  },

  /**
   * 특정 학기의 모집 정보를 조회하는 API입니다.
   * @param semesterId - 조회할 모집의 학기 ID입니다.
   * @returns 모집 정보 객체를 반환합니다.
   */
  GET_RECRUITMENT: async (semesterId: number): Promise<Recruitment> => {
    try {
      const response = await apiClient(`/admin/recruitment/${semesterId}`);
      return Recruitment.fromJson(response.data);
    } catch (error) {
      console.error('[RECRUITMENT API] GET_RECRUITMENT 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 학기의 모집 정보를 수정하는 API입니다.
   * @param semesterId - 수정할 모집의 학기 ID입니다.
   * @param data - 수정할 모집 정보 데이터입니다.
   * @returns void
   */
  UPDATE_RECRUITMENT: async (semesterId: number, data: UpdateRecruitmentRequest): Promise<void> => {
    try {
      await apiClient.patch(`/admin/recruitment/${semesterId}`, data);
    } catch (error) {
      console.error('[RECRUITMENT API] UPDATE_RECRUITMENT 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 학기의 모집 정보를 수정하는 API입니다.
   * @param semesterId - 수정할 모집의 학기 ID입니다.
   * @param data - 수정할 모집 정보 데이터입니다.
   * @returns void
   */
  DOWNLOAD_APPLICANT_EXCEL: async (semesterId: number): Promise<AxiosResponse> => {
    try {
      return await apiClient.get(`/admin/recruitment/${semesterId}/applicants/download`, {
        responseType: 'blob',
      });
    } catch (error) {
      console.error('[RECRUITMENT API] DOWNLOAD_APPLICANT_EXCEL 에러:', error);
      throw error;
    }
  },
};
