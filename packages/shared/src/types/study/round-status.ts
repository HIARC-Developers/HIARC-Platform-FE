export interface RoundStatus {
  round?: number | null;
  attendanceCompleted?: boolean | null;
  assignmentCompleted?: boolean | null;
}

export const RoundStatus = {
  fromJson(json: unknown): RoundStatus {
    const data = (json || {}) as Record<string, unknown>;
    return {
      round: typeof data.round === 'number' ? data.round : null,
      attendanceCompleted:
        typeof data.attendanceCompleted === 'boolean' ? data.attendanceCompleted : null,
      assignmentCompleted:
        typeof data.assignmentCompleted === 'boolean' ? data.assignmentCompleted : null,
    };
  },
};
