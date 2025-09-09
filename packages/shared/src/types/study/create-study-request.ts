export interface CreateStudyRequest {
  name: string;
  bojHandle: string;
  isGroupStudy: boolean;
  semesterId: number | null;
  startDate?: string | null;
  endDate?: string | null;
  scheduledDays?: string[] | null;
  startTime?: string | null;
  isOnline?: boolean | null;
  isPublic?: boolean | null;
  lang?: string | null;
  introduction?: string | null;
  recruitmentStartAt?: string | null;
  recruitmentEndAt?: string | null;
  precaution?: string | null;
}
