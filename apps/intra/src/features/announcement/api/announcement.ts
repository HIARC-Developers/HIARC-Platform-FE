import apiClient from '@/shared/api/client';
import {
  PageableModel,
  AnnouncementSummary,
  Announcement,
  CreateAnnouncementRequest,
  ImageSource,
} from '@hiarc-platform/shared';
import { AnnouncementQueryParams } from '../types/request/announcement-query-params';
import { UpdateAnnouncementRequest } from '../types/request/update-announcement-request';

export const announcementApi = {
  /**
   * 공지사항의 페이지네이션된 목록을 가져오는 API입니다.
   * @param params - 필터링 및 페이지네이션을 위한 쿼리 파라미터입니다.
   * @returns 공지사항 요약 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_ANNOUNCEMENTS: async (
    params: AnnouncementQueryParams = {}
  ): Promise<PageableModel<AnnouncementSummary>> => {
    const response = await apiClient.get<PageableModel<AnnouncementSummary>>('/announcements', {
      params,
    });
    return PageableModel.fromJson(response.data, AnnouncementSummary);
  },

  /**
   * ID로 단일 공지사항을 조회하는 API입니다.
   * @param id - 조회할 공지사항의 ID입니다.
   * @returns 공지사항 객체를 반환합니다.
   */
  GET_ANNOUNCEMENT: async (id: string): Promise<Announcement> => {
    const response = await apiClient.get<Announcement>(`/announcements/${id}`);
    return Announcement.fromJson(response.data);
  },

  /**
   * 새로운 공지사항을 생성하는 API입니다.
   * @param announcementData - 새 공지사항의 데이터입니다.
   * @returns 생성된 공지사항 객체를 반환합니다.
   */
  CREATE_ANNOUNCEMENT: async (
    announcementData: CreateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.post('/announcements', announcementData);
    return Announcement.fromJson(response.data);
  },

  /**
   * 기존 공지사항을 수정하는 API입니다.
   * @param id - 수정할 공지사항의 ID입니다.
   * @param announcementData - 수정된 공지사항 데이터입니다.
   * @returns 수정된 공지사항 객체를 반환합니다.
   */
  UPDATE_ANNOUNCEMENT: async (
    id: string,
    announcementData: UpdateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.put(`/announcements/${id}`, announcementData);
    return Announcement.fromJson(response.data);
  },

  /**
   * ID로 공지사항을 삭제하는 API입니다.
   * @param id - 삭제할 공지사항의 ID입니다.
   * @returns void
   */
  DELETE_ANNOUNCEMENT: async (id: string): Promise<void> => {
    await apiClient.delete(`/announcements/${id}`);
  },

  /**
   * 특정 스터디에 대해 강사로서 공지사항을 생성하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param announcementData - 새 공지사항의 데이터입니다.
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
   * 특정 스터디에서 강사의 공지사항을 수정하는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param announcementId - 수정할 공지사항의 ID입니다.
   * @param announcementData - 수정된 공지사항 데이터입니다.
   * @returns 수정된 공지사항 객체를 반환합니다.
   */
  UPDATE_INSTRUCTOR_ANNOUNCEMENT: async (
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
   * 이미지 업로드를 위한 presigned URL을 가져오는 API입니다.
   * @param studyId - 스터디의 ID입니다.
   * @param contentType - 업로드할 이미지의 콘텐츠 타입입니다.
   * @returns presigned URL과 업로드 정보를 반환합니다.
   */
  GET_IMAGE_UPLOAD_URL: async (studyId: number, contentType: string): Promise<ImageSource> => {
    console.log('[ADMIN ANNOUNCEMENT API] GET_IMAGE_UPLOAD_URL 요청:', { contentType });
    try {
      const response = await apiClient.get<ImageSource>(
        `/studies/${studyId}/instructor/image/upload-url?contentType=${encodeURIComponent(contentType)}`
      );
      console.log('[ADMIN ANNOUNCEMENT API] GET_IMAGE_UPLOAD_URL 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] GET_IMAGE_UPLOAD_URL 에러:', error);
      throw error;
    }
  },
};
