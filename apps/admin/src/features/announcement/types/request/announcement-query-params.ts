import { AnnnouncementType } from '@hiarc-platform/shared';

export interface AnnouncementQueryParams {
  page?: number;
  size?: number;
  sort?: string[];
  announcementType?: AnnnouncementType;
  semesterId?: number;
  title?: string;
  isPublic?: boolean;
}
