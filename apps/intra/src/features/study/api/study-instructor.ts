import { apiClient } from '../../../shared/api/client';
import { UpdateStudyRequest } from '../types/request/update-study-request';
import { StudyQueryParams } from '../types/request/study-query-params';
import {
  Announcement,
  Assignment,
  CreateAnnouncementRequest,
  CreateAssignmentRequest,
  CreateGroupRequest,
  PageableModel,
  Study,
  StudyGroupList,
  StudyInitialForm,
  StudySummary,
} from '@hiarc-platform/shared';
import { UpdateAnnouncementRequest } from '@/features/announcement/types/request/update-announcement-request';

export const studyInstructorApi = {
  /**
   * 강사용 모든 스터디 목록을 조회하는 API입니다.
   * @param params - 필터링 및 페이지네이션을 위한 쿼리 파라미터입니다.
   * @returns 스터디 요약 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_ALL_STUDIES: async (params: StudyQueryParams = {}): Promise<PageableModel<StudySummary>> => {
    const response = await apiClient.get<PageableModel<StudySummary>>('/admin/studies', {
      params,
    });
    return PageableModel.fromJson(response.data, StudySummary);
  },

  /**
   * 스터디 정보를 수정하는 API입니다.
   * @param studyId - 수정할 스터디의 ID입니다.
   * @param studyData - 수정할 스터디 데이터입니다.
   * @returns void
   */
  UPDATE_STUDY: async (studyId: number, studyData: UpdateStudyRequest): Promise<void> => {
    await apiClient.patch<Study>(`/admin/studies/${studyId}`, studyData);
  },

  /**
   * 특정 스터디의 멤버 목록과 상태를 조회하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @returns 스터디 멤버 객체 배열을 반환합니다.
   */
  GET_STUDY_GROUP_LIST: async (studyId: number): Promise<StudyGroupList> => {
    try {
      const response = await apiClient.get(`/studies/${studyId}/instructor/status`);
      return StudyGroupList.fromJson(response.data);
    } catch (error) {
      console.error('[STUDY API] GET_STUDY_MEMBERS 에러:', error);
      throw error;
    }
  },

  /**
   * 강의에 과제를 생성하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param lectureId - 강의 ID입니다.
   * @param data - 생성할 과제 데이터입니다.
   * @returns void
   */
  CREATE_ASSIGNMENT: async (
    studyId: number,
    lectureId: number,
    data: CreateAssignmentRequest
  ): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/instructor/lecture/${lectureId}/assignment`, data);
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
   * 강의에 출석 코드를 생성하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param lectureId - 강의 ID입니다.
   * @param code - 생성할 출석 코드입니다.
   * @returns void
   */
  CREATE_ATTENDANCE_CODE: async (
    studyId: number,
    lectureId: number,
    code: string
  ): Promise<void> => {
    await apiClient.post(`/studies/${studyId}/instructor/lecture/${lectureId}/attendance`, {
      code,
    });
  },

  /**
   * 강의의 출석 코드를 조회하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param lectureId - 강의 ID입니다.
   * @returns 출석 코드 문자열을 반환합니다.
   */
  GET_ATTENDANCE_CODE: async (studyId: number, lectureId: number): Promise<string> => {
    const response = await apiClient.get(
      `/studies/${studyId}/instructor/lecture/${lectureId}/attendance`
    );
    return response.data.code;
  },

  /**
   * 강의를 삭제하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param announcementId - 삭제할 공지사항 ID입니다.
   * @returns void
   */
  DELETE_LECTURE: async (studyId: number, announcementId: number): Promise<void> => {
    await apiClient.delete(`/studies/${studyId}/instructor/announcements/${announcementId}`);
  },

  /**
   * 스터디의 초기 폼 데이터를 조회하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @returns 스터디 초기 폼 데이터를 반환합니다.
   */
  GET_STUDY_INITIAL_FORM: async (studyId: number): Promise<StudyInitialForm> => {
    const response = await apiClient.get<Study>(`/admin/studies/${studyId}`);
    return StudyInitialForm.fromJson(response.data);
  },

  /**
   * 출석 코드를 확인하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param lectureRound - 강의 회차입니다.
   * @param attendanceCode - 확인할 출석 코드입니다.
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
   * 스터디에 공지사항을 생성하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param announcementData - 생성할 공지사항 데이터입니다.
   * @returns 생성된 공지사항 객체를 반환합니다.
   */
  CREATE_STUDY_ANNOUNCEMENT: async (
    studyId: number,
    announcementData: CreateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.post(
      `/studies/${studyId}/instructor/announcements`,
      announcementData
    );
    return Announcement.fromJson(response.data);
  },

  /**
   * 스터디의 공지사항을 수정하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param announcementId - 수정할 공지사항 ID입니다.
   * @param announcementData - 수정할 공지사항 데이터입니다.
   * @returns 수정된 공지사항 객체를 반환합니다.
   */
  UPDATE_STUDY_ANNOUNCEMENT: async (
    studyId: number,
    announcementId: number,
    announcementData: UpdateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.patch(
      `/studies/${studyId}/instructor/announcements/${announcementId}`,
      announcementData
    );
    return Announcement.fromJson(response.data);
  },

  /**
   * 스터디의 공지사항을 삭제하는 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param announcementId - 삭제할 공지사항 ID입니다.
   * @returns void
   */
  DELETE_STUDY_ANNOUNCEMENT: async (studyId: number, announcementId: number): Promise<void> => {
    const response = await apiClient.delete(
      `/studies/${studyId}/instructor/announcements/${announcementId}`
    );
  },

  /**
   * 특정 스터디의 강의(공지사항)를 삭제하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param groupData - 수정할 그룹 데이터입니다.
   * @returns void
   */
  CREATE_GROUP: async (studyId: number, groupData: CreateGroupRequest): Promise<void> => {
    try {
      await apiClient.post(`/studies/${studyId}/instructor/group`, groupData);
    } catch (error) {
      console.error('[STUDY API] CREATE_GROUP 에러:', error);
      throw error;
    }
  },

  /**
   * 수강생 핸들명 검증 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param bojHandle - 학생의 BOJ 핸들입니다.
   * @returns void
   */
  VALIDATE_STUDENT: async (studyId: number, bojHandle: string): Promise<void> => {
    try {
      await apiClient.post(`/studies/${studyId}/instructor/group/validate-student`, { bojHandle });
    } catch (error) {
      console.error('[STUDY API] VALIDATE_STUDENT 에러:', error);
      throw error;
    }
  },

  /**
   * 스터디 조 수정 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param groupId - 그룹의 ID입니다.
   * @param groupData - 수정할 그룹 데이터입니다.
   * @returns void
   */
  PATCH_GROUP: async (
    studyId: number,
    groupId: number,
    groupData: CreateGroupRequest
  ): Promise<void> => {
    try {
      await apiClient.patch(`/studies/${studyId}/instructor/group/${groupId}`, groupData);
    } catch (error) {
      console.error('[STUDY API] PATCH_GROUP 에러:', error);
      throw error;
    }
  },

  CHECK_ASSIGNMENT: async (studyId: number, round: number): Promise<void> => {
    try {
      await apiClient.post(`/studies/${studyId}/instructor/lecture/${round}/assignment/status`);
    } catch (error) {
      console.error('[STUDY API] CHECK_ASSIGNMENT 에러:', error);
      throw error;
    }
  },

  /**
   * 학생 탈퇴 API입니다.
   * @param studyId - 스터디 ID입니다.
   * @param memberId - 탈퇴할 학생 ID입니다.
   * @returns void
   */
  WITHDRAW_STUDENT: async (studyId: number, memberId: number): Promise<void> => {
    try {
      await apiClient.delete(`/studies/${studyId}/instructor/students/${memberId}`);
    } catch (error) {
      console.error('[STUDY API] WITHDRAW_STUDENT 에러:', error);
      throw error;
    }
  },

  DOWNLOAD_MEMBER_EXCEL: async (studyId: number): Promise<unknown> => {
    try {
      const response = await apiClient.get(`/studies/excel/${studyId}/download`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      console.error('[STUDY API] DOWNLOAD_MEMBER_EXCEL 에러:', error);
      throw error;
    }
  },
};

export type { CreateStudyRequest } from '../types/request/create-study-request';
export type { UpdateStudyRequest } from '../types/request/update-study-request';
