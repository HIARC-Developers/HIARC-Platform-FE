import { ImageSource } from './announcement';

export interface CreateAnnouncementForm {
  title: string;
  place?: string;
  scheduleStartAt?: string | null;
  scheduleEndAt?: string | null;
  content: string;
  announcementType: 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | 'LECTURE';
  applicationUrl?: string | null;
  applicationStartAt?: string | null;
  applicationEndAt?: string | null;
  isPublic: boolean;
  studyId?: number | null;
  lectureRound?: number | null;
  images?: File[] | null;
  imageSources?: ImageSource[] | null;
  attachmentUrls?: string[] | null;
}
