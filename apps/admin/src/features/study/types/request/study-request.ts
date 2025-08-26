export interface UpdateStudyRequest {
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  capacity?: number;
  category?: string;
  mentorId?: number;
  scheduledDays?: string[];
  startTime?: string;
  isOnline?: boolean;
  lang?: string;
  introduction?: string;
  recruitmentStartAt?: string;
  recruitmentEndAt?: string;
  precaution?: string;
  isPublic?: boolean;
}

export interface AssignMentorRequest {
  mentorId: number;
}

export interface StudyQueryParams {
  semesterId?: number;
  page?: number;
  size?: number;
  title?: string;
}
