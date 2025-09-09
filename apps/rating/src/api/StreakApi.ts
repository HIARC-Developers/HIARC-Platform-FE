import apiClient from './ApiClient';

export interface StreakDataItem {
  date: string;
  value: boolean;
}

export interface Streak {
  today: string;
  streakData: StreakDataItem[];
  streakStartAt: string;
  currentTotalStreak: number;
  currentSeasonStreak: number;
}

export interface Member {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: string;
  streak: Streak;
}

export interface PageableResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Member[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
}

export interface PaginationParams {
  page: number;
  size: number;
  sort?: string[];
}

export const fetchStreakData = async (params: PaginationParams): Promise<PageableResponse> => {
  try {
    const response = await apiClient.get<PageableResponse>('/streak/ranking', {
      params: {
        page: params.page,
        size: params.size,
        ...(params.sort && { sort: params.sort }),
      },
    });

    console.log('API 응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('Streak 데이터 가져오기 실패:', error);
    return {
      totalPages: 0,
      totalElements: 0,
      size: 0,
      content: [],
      number: 0,
      sort: { empty: true, sorted: false, unsorted: true },
      first: true,
      last: true,
      numberOfElements: 0,
      pageable: {
        offset: 0,
        sort: { empty: true, sorted: false, unsorted: true },
        pageNumber: 0,
        pageSize: 0,
        paged: false,
        unpaged: true,
      },
      empty: true,
    };
  }
};
