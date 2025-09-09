import { atom } from 'jotai';
import { HitingDataState } from '../types/DataType';

export const loadingAtom = atom<boolean>(true);
export const errorAtom = atom<string | null>(null);
export const hitingDataAtom = atom<HitingDataState>({
  div1Ranking: [],
  div2Ranking: [],
  div3Ranking: [],
  streakRanking: [],
  eventRanking: [],
});

export const handleAtom = atom<string>('');
