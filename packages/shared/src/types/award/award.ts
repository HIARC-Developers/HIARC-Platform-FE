export interface Award {
  awardId?: number | null;
  memberId?: number | null;
  memberName?: string | null;
  handle?: string | null;
  organization?: string | null;
  awardName?: string | null;
  awardDetail?: string | null;
  awardDate?: Date | null;
  isOfficial?: boolean | null;
}

export const Award = {
  fromJson(json: unknown): Award {
    const data = (json || {}) as Record<string, unknown>;
    return {
      awardId: (data.awardId as number) || null,
      memberId: (data.memberId as number) || null,
      memberName: (data.memberName as string) || null,
      handle: (data.handle as string) || null,
      organization: (data.organization as string) || null,
      awardName: (data.awardName as string) || null,
      awardDetail: (data.awardDetail as string) || null,
      awardDate: data.awardDate ? new Date(data.awardDate as string) : null,
      isOfficial: (data.isOfficial as boolean) || null,
    };
  },
};
