export interface DivData {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  totalScore: number;
  dailyScore: number;
  currentSeasonScore: number;
  currentEventScore: number;
}

export interface StreakData {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  div: number;
  streakStartAt: string;
  currentTotalStreak: number;
  currentSeasonStreak: number;
}

export interface EventData {
  memberId: number;
  name: string;
  bojHandle: string;
  tier: number;
  totalScore: number;
  dailyScore: number;
  currentSeasonScore: number;
  currentEventScore: number;
}

export interface HitingDataState {
  div1Ranking: DivData[];
  div2Ranking: DivData[];
  div3Ranking: DivData[];
  streakRanking: StreakData[];
  eventRanking: EventData[];
}
