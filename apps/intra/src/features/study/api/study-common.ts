import { apiClient } from '../../../shared/api/client';
import { StudyQueryParams } from '../types/request/study-query-params';
import {
  AnnouncementSummary,
  Lecture,
  PageableModel,
  Study,
  StudySummary,
} from '@hiarc-platform/shared';

export const studyCommonApi = {
  /**
   * 스터디 목록을 페이지네이션으로 조회하는 API입니다.
   * @param params - 필터링 및 페이지네이션을 위한 쿼리 파라미터입니다.
   * @returns 스터디 요약 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_STUDIES: async (params: StudyQueryParams = {}): Promise<PageableModel<StudySummary>> => {
    const response = await apiClient.get('/studies', { params });
    return PageableModel.fromJson(response.data, StudySummary);
  },

  /**
   * 특정 스터디의 상세 정보를 조회하는 API입니다.
   * @param id - 조회할 스터디의 ID입니다.
   * @returns 스터디 상세 정보를 반환합니다.
   */
  GET_STUDY: async (id: number): Promise<Study> => {
    const response = await apiClient.get(`/studies/${id}`);
    return Study.fromJson(response.data);
  },

  /**
   * 스터디에 신청하는 API입니다.
   * @param studyId - 신청할 스터디의 ID입니다.
   * @returns void
   */
  APPLY_TO_STUDY: async (studyId: number): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/application`);
  },

  /**
   * 특정 스터디의 강의 목록을 조회하는 API입니다.
   * @param studyId - 강의 목록을 조회할 스터디의 ID입니다.
   * @returns 강의 목록 배열을 반환합니다.
   */
  GET_LECTURES: async (studyId: number): Promise<Lecture[]> => {
    const response = await apiClient.get(`/studies/${studyId}/lecture`);
    return response.data.map((lecture: unknown) => Lecture.fromJson(lecture));
  },

  /**
   * 특정 스터디의 공지사항 목록을 페이지네이션으로 조회하는 API입니다.
   * @param studyId - 공지사항을 조회할 스터디의 ID입니다.
   * @param page - 페이지 번호입니다. (기본값: 0)
   * @param size - 페이지 크기입니다. (기본값: 10)
   * @returns 공지사항 요약 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_STUDY_ANNOUNCEMENTS: async (
    studyId: number,
    page: number = 0,
    size: number = 10
  ): Promise<PageableModel<AnnouncementSummary>> => {
    const response = await apiClient.get<PageableModel<AnnouncementSummary>>(
      `/studies/${studyId}/announcements`,
      {
        params: {
          page,
          size,
        },
      }
    );
    return PageableModel.fromJson(response.data, AnnouncementSummary);
  },
};

export type { StudyQueryParams } from '../types/request/study-query-params';
