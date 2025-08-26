export interface StudySummary {
  studyId?: number | null;
  studyName?: string | null;
  semesterYear?: number | null;
  semesterType?: string | null;
  studyStatus?: 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED' | null;
  instructorId?: number | null;
  instructorName?: string | null;
  instructorBojHandle?: string | null;

  get semesterName(): string;
}

export const StudySummary = {
  fromJson(json: unknown): StudySummary {
    const data = (json || {}) as Record<string, unknown>;
    return {
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      semesterYear: (data.semesterYear as number) || null,
      semesterType: (data.semesterType as string) || null,
      studyStatus:
        (data.studyStatus as 'PREPARING' | 'PRE_OPEN' | 'RECRUITING' | 'IN_PROGRESS' | 'CLOSED') ||
        null,
      instructorId: (data.instructorId as number) || null,
      instructorName: (data.instructorName as string) || null,
      instructorBojHandle: (data.instructorBojHandle as string) || null,

      get semesterName(): string {
        if (!this.semesterYear || !this.semesterType) {
          return '';
        }
        const semester = this.semesterType === 'FIRST' ? '1학기' : '2학기';
        return `${this.semesterYear}년 ${semester}`;
      },
    };
  },
};
