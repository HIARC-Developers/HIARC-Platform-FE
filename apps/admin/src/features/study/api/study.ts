import { apiClient } from '@/shared/api/client';
import type { UpdateStudyRequest, StudyQueryParams } from '../types/request/study-request';
import {
  AnnouncementSummary,
  Assignment,
  CreateStudyRequest,
  Lecture,
  PageableModel,
  Study,
  StudyMember,
  StudySummary,
} from '@hiarc-platform/shared';
import { StudyInitialForm } from '../types';

import { CreateAssignmentRequest } from '@hiarc-platform/shared/src/types/study/create-assignment-request';

export const studyApi = {
  /**
   * 페이지네이션된 스터디 목록을 조회하는 API입니다.
   * @param params - 필터링 및 페이지네이션을 위한 쿼리 파라미터입니다.
   * @returns 스터디 요약 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_ALL_STUDIES: async (params: StudyQueryParams = {}): Promise<PageableModel<StudySummary>> => {
    try {
      const response = await apiClient.get<PageableModel<StudySummary>>('/admin/studies', {
        params,
      });
      return PageableModel.fromJson(response.data, StudySummary);
    } catch (error) {
      console.error('[STUDY API] GET_ALL_STUDIES 에러:', error);
      throw error;
    }
  },

  /**
   * ID로 특정 스터디의 상세 정보를 조회하는 API입니다.
   * @param studyId - 조회할 스터디의 ID입니다.
   * @returns 스터디 객체를 반환합니다.
   */
  GET_STUDY_DETAIL: async (studyId: number): Promise<Study> => {
    try {
      const response = await apiClient.get<Study>(`/studies/${studyId}`);
      return Study.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_DETAIL 에러:', error);
      throw error;
    }
  },

  /**
   * 스터디 수정을 위한 초기 폼 데이터를 조회하는 API입니다.
   * @param studyId - 조회할 스터디의 ID입니다.
   * @returns 스터디 초기 폼 데이터를 반환합니다.
   */
  GET_STUDY_INITIAL_FORM: async (studyId: number): Promise<StudyInitialForm> => {
    try {
      const response = await apiClient.get<Study>(`/admin/studies/${studyId}`);
      return StudyInitialForm.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_INITIAL_FORM 에러:', error);
      throw error;
    }
  },

  /**
   * 새로운 스터디를 생성하는 API입니다.
   * @param studyData - 새 스터디의 데이터입니다.
   * @returns 생성된 스터디 객체를 반환합니다.
   */
  CREATE_STUDY: async (studyData: CreateStudyRequest): Promise<Study> => {
    try {
      const response = await apiClient.post<Study>('/admin/studies', studyData);
      return Study.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] CREATE_STUDY 에러:', error);
      throw error;
    }
  },

  /**
   * 기존 스터디 정보를 수정하는 API입니다.
   * @param studyId - 수정할 스터디의 ID입니다.
   * @param studyData - 수정할 스터디 데이터입니다.
   * @returns void
   */
  UPDATE_STUDY: async (studyId: number, studyData: UpdateStudyRequest): Promise<void> => {
    await apiClient.patch<Study>(`/admin/studies/${studyId}`, studyData);
  },

  /**
   * 특정 스터디의 공지사항 목록을 페이지네이션으로 조회하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param page - 페이지 번호 (기본값: 0)입니다.
   * @param size - 페이지 크기 (기본값: 10)입니다.
   * @returns 스터디 공지사항 요약 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_STUDY_ANNOUNCEMENT_LIST: async (
    studyId: number,
    page: number = 0,
    size: number = 10
  ): Promise<PageableModel<AnnouncementSummary>> => {
    try {
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
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_ANNOUNCEMENT_LIST 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 스터디의 모든 강의 목록을 조회하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @returns 강의 객체 배열을 반환합니다.
   */
  GET_LECTURES_BY_STUDY: async (studyId: number): Promise<Lecture[]> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/lecture`);
      return response.data.map((lecture: unknown) => Lecture.fromJson(lecture));
    } catch (error) {
      console.error('[STUDY API] GET_LECTURES_BY_STUDY 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 스터디의 멤버 목록과 상태를 조회하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @returns 스터디 멤버 객체 배열을 반환합니다.
   */
  GET_STUDY_MEMBERS: async (studyId: number): Promise<StudyMember[]> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/instructor/status`);
      return response.data.map((member: unknown) => StudyMember.fromJson(member));
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_MEMBERS 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 스터디의 특정 강의에 과제를 생성하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param lectureId - 강의의 ID입니다.
   * @param data - 과제 생성 요청 데이터입니다.
   * @returns void
   */
  CREATE_ASSIGNMENT: async (
    studyId: number,
    lectureId: number,
    data: CreateAssignmentRequest
  ): Promise<void> => {
    try {
      await apiClient.post(`/studies/${studyId}/instructor/lecture/${lectureId}/assignment`, data);
    } catch (error) {
      console.error('[STUDY API] CREATE_ASSIGNMENT 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 스터디의 특정 강의의 과제 정보를 조회하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param lectureId - 강의의 ID입니다.
   * @returns 과제 객체를 반환합니다.
   */
  GET_ASSIGNMENT: async (studyId: number, lectureId: number): Promise<Assignment> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/lecture/${lectureId}/assignment`);
      return Assignment.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_ASSIGNMENT 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 스터디의 특정 강의에 출석 코드를 생성하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param lectureId - 강의의 ID입니다.
   * @param code - 생성할 출석 코드입니다.
   * @returns void
   */
  CREATE_ATTENDANCE_CODE: async (
    studyId: number,
    lectureId: number,
    code: string
  ): Promise<void> => {
    try {
      await apiClient.post(`/studies/${studyId}/instructor/lecture/${lectureId}/attendance`, {
        code,
      });
    } catch (error) {
      console.error('[STUDY API] CREATE_ATTENDANCE_CODE 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 스터디의 특정 강의의 출석 코드를 조회하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param lectureId - 강의의 ID입니다.
   * @returns 출석 코드 문자열을 반환합니다.
   */
  GET_ATTENDANCE_CODE: async (studyId: number, lectureId: number): Promise<string> => {
    try {
      const response = await apiClient.get(
        `/studies/${studyId}/instructor/lecture/${lectureId}/attendance`
      );
      return response.data.code;
    } catch (error) {
      console.error('[STUDY API] GET_ATTENDANCE_CODE 에러:', error);
      throw error;
    }
  },

  /**
   * 특정 스터디의 강의(공지사항)를 삭제하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param announcementId - 삭제할 공지사항(강의)의 ID입니다.
   * @returns void
   */
  DELETE_LECTURE: async (studyId: number, announcementId: number): Promise<void> => {
    try {
      await apiClient.delete(`/studies/${studyId}/instructor/announcements/${announcementId}`);
    } catch (error) {
      console.error('[STUDY API] DELETE_LECTURE 에러:', error);
      throw error;
    }
  },
};

export type * from '../types/request/study-request';
export type * from '../types/response/study-response';
