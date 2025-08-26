export interface Instructor {
  memberId: number;
  memberName: string;
  bojHandle: string;
  studyId: number;
  studyName: string;
}

export const Instructor = {
  fromJson(json: unknown): Instructor {
    const data = (json || {}) as Record<string, unknown>;
    return {
      memberId: (data.memberId as number) || 0,
      memberName: (data.memberName as string) || '',
      bojHandle: (data.bojHandle as string) || '',
      studyId: (data.studyId as number) || 0,
      studyName: (data.studyName as string) || '',
    };
  },
};
