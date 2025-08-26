import { apiClient } from '../../../shared/api/client';
import { Assignment } from '@hiarc-platform/shared';
import { AttendanceableStudy } from '../types/request/attendanceable-study';
import { MyStudy } from '../types/model/my-study';
import { MyStudyInfo } from '../types/model/my-study-info';

export const studyMemberApi = {
  /**
   * 내가 참여한 스터디 목록을 조회하는 API입니다.
   * @param isCurrent - 현재 진행 중인 스터디만 조회할지 여부입니다.
   * @returns 내가 참여한 스터디 목록을 반환합니다.
   */
  GET_MY_STUDIES: async (isCurrent: boolean): Promise<MyStudy[]> => {
    const response = await apiClient.get('/studies/me', {
      params: {
        isCurrent,
      },
    });
    return response.data.map((study: unknown) => MyStudy.fromJson(study));
  },

  /**
   * 특정 강의의 과제를 조회하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param lectureId - 강의 ID입니다.
   * @returns 과제 정보를 반환합니다.
   */
  GET_ASSIGNMENT: async (studyId: number, lectureId: number): Promise<Assignment> => {
    const response = await apiClient.get(`/studies/${studyId}/lecture/${lectureId}/assignment`);
    return Assignment.fromJson(response.data);
  },

  /**
   * 출석 처리가 가능한 스터디 정보를 조회하는 API입니다.
   * @returns 출석 처리가 가능한 스터디 정보를 반환합니다.
   */
  GET_STUDY_FOR_ATTENDANCE: async (): Promise<AttendanceableStudy> => {
    const response = await apiClient.get('/studies/me/current-for-attendance');
    return AttendanceableStudy.fromJson(response.data);
  },

  /**
   * 출석 코드를 확인하여 출석을 처리하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param lectureRound - 강의 회차입니다.
   * @param attendanceCode - 출석 코드입니다.
   * @returns void
   */
  CHECK_ATTENDANCE_CODE: async (
    studyId: number,
    lectureRound: number,
    attendanceCode: string
  ): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/lecture/${lectureRound}/attendance-code`, {
      code: attendanceCode,
    });
  },

  /**
   * 내가 참여한 특정 스터디의 정보를 조회하는 API입니다.
   * @param studyId - 조회할 스터디의 ID입니다.
   * @returns 내 스터디 정보를 반환합니다.
   */
  GET_MY_STUDY_INFO: async (studyId: number): Promise<MyStudyInfo> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/me`);
      return MyStudyInfo.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_MY_STUDY_INFO 에러:', error);
      throw error;
    }
  },
};
