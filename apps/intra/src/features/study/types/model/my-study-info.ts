import { RoundStatus } from '@hiarc-platform/shared/src/types/study/round-status';

export interface MyStudyInfo {
  studyId?: number | null;
  studyName?: string | null;
  roundStatuses?: RoundStatus[] | null;
  totalRounds?: number | null;
}

export const MyStudyInfo = {
  fromJson(json: unknown): MyStudyInfo {
    const data = (json || {}) as Record<string, unknown>;
    return {
      studyId: typeof data.studyId === 'number' ? data.studyId : null,
      studyName: (data.studyName as string) || null,
      roundStatuses: data.roundStatuses
        ? (data.roundStatuses as unknown[]).map((status: unknown) => RoundStatus.fromJson(status))
        : null,
      totalRounds: typeof data.totalRounds === 'number' ? data.totalRounds : null,
    };
  },
};
