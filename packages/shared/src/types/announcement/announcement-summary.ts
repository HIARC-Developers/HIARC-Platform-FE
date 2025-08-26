export interface AnnouncementSummary {
  announcementId?: number | null;
  announcementType?: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | null;
  title?: string | null;
  authorId?: number | null;
  authorName?: string | null;
  createdAt?: Date | null;
  isPublic?: boolean | null;
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
  announcementTitle?: string;
}

export const AnnouncementSummary = {
  fromJson(json: unknown): AnnouncementSummary {
    const data = (json || {}) as Record<string, unknown>;
    const announcementSummary = {
      announcementId: (data.announcementId as number) || null,
      announcementType: (data.announcementType as AnnouncementSummary['announcementType']) || null,
      title: (data.title as string) || null,
      authorId: (data.authorId as number) || null,
      authorName: (data.authorName as string) || null,
      createdAt: data.createdAt ? new Date(data.createdAt as string) : null,
      isPublic: (data.isPublic as boolean) || null,
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      lectureRound: (data.lectureRound as number) || null,

      get announcementTitle(): string {
        if (!this.title) {
          return '';
        }

        if (this.announcementType === 'STUDY') {
          if (this.lectureRound !== null && this.lectureRound !== undefined) {
            return `[${this.studyName}][${this.lectureRound}회차] ${this.title}`;
          }
          return `[${this.studyName}] ${this.title}`;
        }

        return this.title;
      },
    };

    return announcementSummary;
  },
};
