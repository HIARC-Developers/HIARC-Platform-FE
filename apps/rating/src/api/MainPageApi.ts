import apiClient from './ApiClient';
import { HitingDataState } from '../types/DataType';

export const fetchHitingData = async (): Promise<HitingDataState> => {
  try {
    const response = await apiClient.get<HitingDataState>('/');
    console.log(' API 응답 데이터:', response.data);

    return (
      response.data || {
        div1List: [],
        div2List: [],
        div3List: [],
        streakList: [],
        eventList: [],
      }
    );
  } catch (error) {
    console.error(' API 요청 실패:', error);
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};
