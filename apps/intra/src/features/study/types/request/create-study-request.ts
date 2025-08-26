export interface CreateStudyRequest {
  title: string;
  description: string;
  category: string;
  maxParticipants: number;
  startDate: Date;
  endDate: Date;
}