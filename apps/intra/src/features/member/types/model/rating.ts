import { RatingRecord } from './rating-record';

export interface Rating {
  seasonScore?: number | null;
  totalScore?: number | null;
  todayScore?: number | null;
  records?: RatingRecord[] | null;
}

export const Rating = {
  fromJson(json: unknown): Rating {
    const data = (json || {}) as Record<string, unknown>;
    return {
      seasonScore: (data.seasonScore as number) || null,
      totalScore: (data.totalScore as number) || null,
      todayScore: (data.todayScore as number) || null,
      records: data.records
        ? (data.records as unknown[]).map((record: unknown) => RatingRecord.fromJson(record))
        : null,
    };
  },
};
