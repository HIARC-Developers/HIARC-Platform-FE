import apiClient from './ApiClient';

interface RankingItem {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  totalScore: number;
  dailyScore: number;
  currentSeasonScore: number;
  currentEventScore: number;
}

export const fetchRankingData = async (selected: number) => {
  if (selected === 0) {
    return { RankingData: [], graphData: 0 };
  }

  try {
    const response = await apiClient.get<{
      streakRatio: number;
      ranking: RankingItem[];
    }>(`/${selected}/rating`);

    console.log(' Success: 랭킹 데이터 받아옴', response.data);

    if (!response.data) {
      console.warn(' 데이터 구조가 예상과 다릅니다. 빈 배열을 반환합니다.');
      return { rankingData: [], graphData: 0 };
    }

    return {
      rankingData: response.data.ranking.map((item, index) => ({
        num: index + 1,
        bojHandle: item.bojHandle,
        tier: item.tier,
        today: item.dailyScore,
        total: item.totalScore,
      })),
      graphData: response.data.streakRatio,
    };
  } catch (err) {
    console.error(' API 요청 실패:', err);
    return { rankingData: [], graphData: 0 };
  }
};
