import { RoundStatus } from '@hiarc-platform/shared/src/types/study/round-status';

export interface MemberStatus {
  studyName?: string | null;
  memberName?: string | null;
  bojHandle?: string | null;
  roundStatuses?: RoundStatus[] | null;
  totalRounds?: number | null;
}

export const MemberStatus = {
  fromJson(json: unknown): MemberStatus {
    const data = (json || {}) as Record<string, unknown>;
    return {
      studyName: (data.studyName as string) || null,
      memberName: (data.memberName as string) || null,
      bojHandle: (data.bojHandle as string) || null,
      roundStatuses: Array.isArray(data.roundStatuses)
        ? data.roundStatuses.map((status) => RoundStatus.fromJson(status))
        : [],
      totalRounds: typeof data.totalRounds === 'number' ? data.totalRounds : 0,
    };
  },
};
