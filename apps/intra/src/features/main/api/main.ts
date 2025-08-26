import { UpcomingSchedule } from '../types/model/upcoming-schedule';
import { apiClient } from '../../../shared/api/client';
import { CalendarSchedule } from '../types/model/calendar-schedule';
import { Schedule } from '../types/model/schedule';
import { StudyNow } from '../types/model/study-now';

export const mainApi = {
  /**
   * 다가오는 일정 정보를 조회하는 API입니다.
   * @returns 다가오는 일정 정보를 반환합니다.
   */
  UPCOMING_SCHEDULE: async (): Promise<UpcomingSchedule> => {
    const response = await apiClient.get('/schedule/upcoming');
    return UpcomingSchedule.fromJson(response.data);
  },

  /**
   * 외부 일정 목록을 조회하는 API입니다.
   * @returns 외부 일정 배열을 반환합니다.
   */
  EXTERNAL_SCHEDULE: async (): Promise<Schedule[]> => {
    const response = await apiClient.get('/schedule/external');
    return response.data.map((schedule: unknown) => Schedule.fromJson(schedule));
  },

  /**
   * 캘린더 일정 목록을 조회하는 API입니다.
   * @param median - 기준 날짜입니다.
   * @param range - 조회 범위(일)입니다.
   * @returns 캘린더 일정 배열을 반환합니다.
   */
  CALENDAR_SCHEDULE: async ({
    median,
    range,
  }: {
    median: string;
    range: number;
  }): Promise<CalendarSchedule[]> => {
    const response = await apiClient.get('/schedule/calendar', {
      params: {
        median,
        range,
      },
    });
    return Array.isArray(response.data)
      ? response.data.map((item) => CalendarSchedule.fromJson(item))
      : [];
  },

  /**
   * 현재 진행 중인 스터디 목록을 조회하는 API입니다.
   * @returns 현재 진행 중인 스터디 배열을 반환합니다.
   */
  STUDIES_NOW: async (): Promise<StudyNow[]> => {
    const response = await apiClient.get('/studies/now');
    return response.data.map((schedule: unknown) => StudyNow.fromJson(schedule));
  },
};
