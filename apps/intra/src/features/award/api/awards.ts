import { apiClient } from '../../../shared/api/client';

import { Award } from '@hiarc-platform/shared';
import { CreateAwardRequest } from '../types/request/create-award-request';
import { UpdateAwardRequest } from '../types/request/update-award-request';

export const awardsApi = {
  /**
   * 내 수상 내역을 조회하는 API입니다.
   * @returns 내 수상 내역 배열을 반환합니다.
   */
  GET_MY_AWARDS: async (): Promise<Award[]> => {
    const response = await apiClient.get('/awards/me');
    return response.data.map((item: unknown) => Award.fromJson(item));
  },

  /**
   * 새로운 수상 내역을 추가하는 API입니다.
   * @param awardData - 추가할 수상 내역 데이터입니다.
   * @returns void
   */
  CREATE_AWARD: async (awardData: CreateAwardRequest): Promise<void> => {
    await apiClient.post('/awards/me', awardData);
  },

  /**
   * 기존 수상 내역을 수정하는 API입니다.
   * @param awardId - 수정할 수상 내역의 ID입니다.
   * @param awardData - 수정할 수상 내역 데이터입니다.
   * @returns void
   */
  UPDATE_AWARD: async (awardId: number, awardData: UpdateAwardRequest): Promise<void> => {
    await apiClient.patch(`/awards/${awardId}`, awardData);
  },

  /**
   * 수상 내역을 삭제하는 API입니다.
   * @param awardId - 삭제할 수상 내역의 ID입니다.
   * @returns void
   */
  DELETE_AWARD: async (awardId: number): Promise<void> => {
    await apiClient.delete(`/awards/${awardId}`);
  },
};

export type { CreateAwardRequest } from '../types/request/create-award-request';
export type { UpdateAwardRequest } from '../types/request/update-award-request';
