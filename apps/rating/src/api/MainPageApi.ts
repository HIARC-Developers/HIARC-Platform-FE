import apiClient from './ApiClient';
import { HitingDataState } from '../store/Atom';

export interface ApiResponse {
  data: HitingDataState;
}

export const fetchHitingData = async (): Promise<HitingDataState> => {
  try {
    const response = await apiClient.get<ApiResponse>('/');

    return (
      response.data.data || {
        div1List: [],
        div2List: [],
        div3List: [],
        streakList: [],
        eventList: [],
      }
    );
  } catch (error) {
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};
