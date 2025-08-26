export interface StudyQueryParams {
  semesterId?: number;
  page?: number;
  size?: number;
  category?: string;
  status?: 'active' | 'completed' | 'cancelled';
  authorId?: string;
  studyName?: string;
}
