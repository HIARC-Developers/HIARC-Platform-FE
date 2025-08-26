import { CurrentSemester, Semester } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';

export const semesterApi = {
  /**
   * 모든 학기 목록을 조회하는 API입니다.
   * @returns 학기 배열을 반환합니다.
   */
  GET_SEMESTER_LIST: async (): Promise<Semester[]> => {
    const response = await apiClient.get<Semester[]>('/semesters');
    return response.data.map((semester) => Semester.fromJson(semester));
  },

  /**
   * 현재 학기 정보를 조회하는 API입니다.
   * @returns 현재 학기 정보를 반환합니다.
   */
  GET_CURRENT_SEMESTER: async (): Promise<CurrentSemester> => {
    const response = await apiClient.get<CurrentSemester | null>('/semesters/now');
    return CurrentSemester.fromJson(response.data);
  },
};
