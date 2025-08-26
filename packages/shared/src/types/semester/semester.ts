export interface Semester {
  semesterId?: number | null;
  semesterYear?: number | null;
  semesterType?: 'FIRST' | 'SECOND' | null;
  
  get semesterName(): string;
}

export const Semester = {
  fromJson(json: unknown): Semester {
    const data = (json || {}) as Record<string, unknown>;
    return {
      semesterId: (data.semesterId as number) || null,
      semesterYear: (data.semesterYear as number) || null,
      semesterType: (data.semesterType as 'FIRST' | 'SECOND') || null,
      
      get semesterName(): string {
        if (!this.semesterYear || !this.semesterType) {
          return '';
        }
        const semester = this.semesterType === 'FIRST' ? '1학기' : '2학기';
        return `${this.semesterYear}년 ${semester}`;
      }
    };
  },
};
