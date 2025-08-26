export interface AnnouncementNavigationItem {
  announcementId?: number | null;
  title?: string | null;
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
}

export interface ImageSource {
  resourceKey?: string;
  url?: string;
}

export interface Announcement {
  announcementId?: number | null;
  title?: string | null;
  place?: string | null;
  scheduleStartAt?: Date | null;
  scheduleEndAt?: Date | null;
  content?: string | null;
  announcementType?: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | null;
  authorId?: number | null;
  authorName?: string | null;
  createdAt?: Date | null;
  applicationUrl?: string | null;
  applicationStartAt?: Date | null;
  applicationEndAt?: Date | null;
  attachmentUrls?: string[] | null;
  imageUrls?: ImageSource[] | null;
  studyId?: number | null;
  studyName?: string | null;
  lectureRound?: number | null;
  isPublic?: boolean | null;
  semesterId?: number | null;
  prev?: AnnouncementNavigationItem | null;
  next?: AnnouncementNavigationItem | null;

  readonly announcementTitle?: string | null;
}

export const Announcement = {
  fromJson(json: unknown): Announcement {
    const data = (json || {}) as Record<string, unknown>;
    const announcement = {
      announcementId: (data.announcementId as number) || null,
      title: data.title as string,
      place: (data.place as string) || null,
      scheduleStartAt: data.scheduleStartAt ? new Date(data.scheduleStartAt as string) : null,
      scheduleEndAt: data.scheduleEndAt ? new Date(data.scheduleEndAt as string) : null,
      content: (data.content as string) || null,
      announcementType: (data.announcementType as Announcement['announcementType']) || null,
      authorId: (data.authorId as number) || null,
      authorName: (data.authorName as string) || null,
      createdAt: data.createdAt ? new Date(data.createdAt as string) : null,
      applicationUrl: (data.applicationUrl as string) || null,
      applicationStartAt: data.applicationStartAt
        ? new Date(data.applicationStartAt as string)
        : null,
      applicationEndAt: data.applicationEndAt ? new Date(data.applicationEndAt as string) : null,
      attachmentUrls: (data.attachmentUrls as string[]) || null,
      imageUrls: (data.imageUrls as ImageSource[]) || null,
      studyId: (data.studyId as number) || null,
      studyName: (data.studyName as string) || null,
      lectureRound: (data.lectureRound as number) || null,
      isPublic: (data.isPublic as boolean) ?? null,
      semesterId: (data.semesterId as number) || null,
      prev: (data.prev as AnnouncementNavigationItem) || null,
      next: (data.next as AnnouncementNavigationItem) || null,
    };

    return { ...announcement, announcementTitle: this.getAnnouncementTitle(announcement) };
  },

  getAnnouncementTitle(announcement: Announcement): string {
    if (!announcement.title) {
      return '';
    }

    if (announcement.announcementType === 'STUDY') {
      if (announcement.lectureRound !== null && announcement.lectureRound !== undefined) {
        return `[${announcement.studyName}][${announcement.lectureRound}회차] ${announcement.title}`;
      }
      return `[${announcement.studyName}] ${announcement.title}`;
    }

    return announcement.title;
  },
};
