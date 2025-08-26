import { Award, PageableModel } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';
import { AwardQueryParams } from '../types/request/award-query-params';
import { CreateAwardRequest } from '../types/request/create-award-request';
import { UpdateAwardRequest } from '../types/request/update-award-request';

export const awardApi = {
  /**
   * 페이지네이션된 수상 내역 목록을 조회하는 API입니다.
   * @param params - 필터링 및 페이지네이션을 위한 쿼리 파라미터입니다.
   * @returns 수상 내역 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_ADMIN_AWARDS: async (params: AwardQueryParams = {}): Promise<PageableModel<Award>> => {
    const response = await apiClient.get<PageableModel<Award>>('/admin/awards', {
      params,
    });
    return PageableModel.fromJson(response.data, Award);
  },

  /**
   * 새로운 수상 내역을 생성하는 API입니다.
   * @param data - 새 수상 내역의 데이터입니다.
   * @returns void
   */
  CREATE_ADMIN_AWARD: async (data: CreateAwardRequest): Promise<void> => {
    await apiClient.post('/admin/awards', data);
  },

  /**
   * 기존 수상 내역을 수정하는 API입니다.
   * @param awardId - 수정할 수상 내역의 ID입니다.
   * @param data - 수정할 수상 내역 데이터입니다.
   * @returns void
   */
  UPDATE_ADMIN_AWARD: async (awardId: number, data: UpdateAwardRequest): Promise<void> => {
    await apiClient.patch(`/admin/awards/${awardId}`, data);
  },

  /**
   * ID로 수상 내역을 삭제하는 API입니다.
   * @param awardId - 삭제할 수상 내역의 ID입니다.
   * @returns void
   */
  DELETE_ADMIN_AWARD: async (awardId: number): Promise<void> => {
    await apiClient.delete(`/admin/awards/${awardId}`);
  },
};
