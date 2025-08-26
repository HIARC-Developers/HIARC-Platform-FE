export interface Schedule {
  announcementId?: number | null;
  announcementType?: 'RATING' | 'STUDY' | 'GENERAL' | 'EXTERNAL' | 'ETC';
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
  scheduleName?: string | null;
  isScheduled?: boolean | null;
  scheduledAt?: Date | null;
  createdAt?: Date | null;
  scheduleTitle?: string;
}

export const Schedule = {
  fromJson(json: unknown): Schedule {
    const data = (json || {}) as Record<string, unknown>;
    const schedule = {
      announcementId: (data.announcementId as number) || null,
      announcementType:
        (data.announcementType as 'RATING' | 'STUDY' | 'GENERAL' | 'EXTERNAL' | 'ETC') || null,
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      lectureRound: (data.lectureRound as number) || null,
      scheduleName: (data.scheduleName as string) || null,
      isScheduled: (data.isScheduled as boolean) || null,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt as string) : null,
      createdAt: data.createdAt ? new Date(data.createdAt as string) : null,

      get scheduleTitle(): string {
        if (!this.studyName) {
          return this.scheduleName || '';
        }

        if (this.announcementType === 'STUDY') {
          if (this.lectureRound !== null && this.lectureRound !== undefined) {
            return `[${this.studyName}][${this.lectureRound}회차] ${this.scheduleName || ''}`;
          }
          return `[${this.studyName}] ${this.scheduleName || ''}`;
        }

        return this.scheduleName || '';
      },
    };

    return schedule;
  },
};
