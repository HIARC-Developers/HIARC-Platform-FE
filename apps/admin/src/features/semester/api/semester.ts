import { CurrentSemester, Semester } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';

export const semesterApi = {
  /**
   * 모든 학기 목록을 조회하는 API입니다.
   * @returns 학기 객체 배열을 반환합니다.
   */
  GET_SEMESTER_LIST: async (): Promise<Semester[]> => {
    const response = await apiClient.get<Semester[]>('/semesters');
    return response.data.map((semester) => Semester.fromJson(semester));
  },

  /**
   * 새로운 학기를 생성하는 API입니다.
   * @param params - 학기 생성 정보입니다.
   * @param params.semesterYear - 학기 연도입니다.
   * @param params.semesterType - 학기 구분(1학기/2학기)입니다.
   * @returns 생성된 학기 객체를 반환합니다.
   */
  CREATE_SEMESTER: async ({
    semesterYear,
    semesterType,
  }: {
    semesterYear: number;
    semesterType: 'FIRST' | 'SECOND';
  }): Promise<Semester> => {
    const response = await apiClient.post<Semester>('/admin/semesters', {
      semesterYear,
      semesterType,
    });
    return Semester.fromJson(response.data);
  },

  /**
   * 현재 활성화된 학기 정보를 조회하는 API입니다.
   * @returns 현재 학기 객체를 반환합니다.
   */
  GET_CURRENT_SEMESTER: async (): Promise<CurrentSemester> => {
    const response = await apiClient.get<CurrentSemester | null>('/semesters/now');
    return CurrentSemester.fromJson(response.data);
  },
};
