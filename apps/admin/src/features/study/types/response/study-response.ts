export interface StudyStatusUpdateResponse {
  success: boolean;
  message: string;
}

export interface AssignMentorResponse {
  success: boolean;
  data: {
    studyId: number;
    mentorId: number;
    mentorName: string;
  };
  message?: string;
}
