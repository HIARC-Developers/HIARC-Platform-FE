export interface AwardQueryParams {
  organization?: string;
  awardName?: string;
  memberName?: string;
  handle?: string;
  awardYear?: number;
  isOfficial?: boolean;
  page?: number;
  size?: number;
  sort?: string[];
}
