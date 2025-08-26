import {
  Announcement,
  AnnouncementSummary,
  CreateAnnouncementRequest,
  ImageSource,
  PageableModel,
} from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';

import { AnnouncementQueryParams } from '../types/request/announcement-query-params';

export const announcementApi = {
  /**
   * 페이지네이션된 관리자 공지사항 목록을 조회하는 API입니다.
   * @param params - 필터링 및 페이지네이션을 위한 쿼리 파라미터입니다.
   * @returns 공지사항 요약 정보를 담은 페이지네이션 모델을 반환합니다.
   */
  GET_ADMIN_ANNOUNCEMENTS: async (
    params: AnnouncementQueryParams = {}
  ): Promise<PageableModel<AnnouncementSummary>> => {
    const response = await apiClient.get<PageableModel<AnnouncementSummary>>(
      '/admin/announcements',
      {
        params,
      }
    );
    return PageableModel.fromJson(response.data, AnnouncementSummary);
  },

  /**
   * ID로 특정 관리자 공지사항의 상세 정보를 조회하는 API입니다.
   * @param id - 조회할 공지사항의 ID입니다.
   * @returns 공지사항 객체를 반환합니다.
   */
  GET_ADMIN_ANNOUNCEMENT: async (id: number) => {
    const response = await apiClient.get(`/admin/announcements/${id}`);
    return Announcement.fromJson(response.data);
  },

  /**
   * 새로운 관리자 공지사항을 생성하는 API입니다.
   * @param announcementData - 새 공지사항의 데이터입니다.
   * @returns 생성된 공지사항 객체를 반환합니다.
   */
  CREATE_ADMIN_ANNOUNCEMENT: async (
    announcementData: CreateAnnouncementRequest
  ): Promise<Announcement> => {
    const response = await apiClient.post('/admin/announcements', announcementData);

    return Announcement.fromJson(response.data);
  },

  /**
   * 기존 관리자 공지사항을 수정하는 API입니다.
   * @param id - 수정할 공지사항의 ID입니다.
   * @param announcementData - 수정할 공지사항 데이터입니다.
   * @returns 수정된 공지사항 객체를 반환합니다.
   */
  UPDATE_ADMIN_ANNOUNCEMENT: async (
    id: number,
    announcementData: CreateAnnouncementRequest
  ): Promise<Announcement> => {
    console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT 요청:', {
      id,
      data: announcementData,
    });
    try {
      const response = await apiClient.patch(`/admin/announcements/${id}`, announcementData);
      console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT 에러:', error);
      throw error;
    }
  },

  /**
   * ID로 관리자 공지사항을 삭제하는 API입니다.
   * @param id - 삭제할 공지사항의 ID입니다.
   * @returns void
   */
  DELETE_ADMIN_ANNOUNCEMENT: async (id: number): Promise<void> => {
    await apiClient.delete(`/admin/announcements/${id}`);
  },

  /**
   * 관리자 공지사항의 게시/숨김 상태를 변경하는 API입니다.
   * @param id - 상태를 변경할 공지사항의 ID입니다.
   * @param isPublished - 게시 여부입니다.
   * @returns 수정된 공지사항 객체를 반환합니다.
   */
  UPDATE_ADMIN_ANNOUNCEMENT_STATUS: async (
    id: string,
    isPublished: boolean
  ): Promise<Announcement> => {
    console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_STATUS 요청:', {
      id,
      isPublished,
    });
    try {
      const response = await apiClient.patch(`/admin/announcements/${id}/status`, { isPublished });
      console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_STATUS 응답:', response.data);
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_STATUS 에러:', error);
      throw error;
    }
  },

  /**
   * 관리자 공지사항의 중요도를 변경하는 API입니다.
   * @param id - 중요도를 변경할 공지사항의 ID입니다.
   * @param isImportant - 중요 공지사항 여부입니다.
   * @returns 수정된 공지사항 객체를 반환합니다.
   */
  UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE: async (
    id: string,
    isImportant: boolean
  ): Promise<Announcement> => {
    console.log('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE 요청:', {
      id,
      isImportant,
    });
    try {
      const response = await apiClient.patch(`/admin/announcements/${id}/importance`, {
        isImportant,
      });
      console.log(
        '[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE 응답:',
        response.data
      );
      return Announcement.fromJson(response.data);
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] UPDATE_ADMIN_ANNOUNCEMENT_IMPORTANCE 에러:', error);
      throw error;
    }
  },

  /**
   * 이미지 업로드를 위한 presigned URL을 가져오는 API입니다.
   * @param contentType - 업로드할 이미지의 콘텐츠 타입입니다.
   * @returns presigned URL과 업로드 정보를 반환합니다.
   */
  GET_IMAGE_UPLOAD_URL: async (contentType: string): Promise<ImageSource> => {
    console.log('[ADMIN ANNOUNCEMENT API] GET_IMAGE_UPLOAD_URL 요청:', { contentType });
    try {
      const response = await apiClient.get<ImageSource>(
        `/admin/announcements/image/upload-url?contentType=${encodeURIComponent(contentType)}`
      );
      console.log('[ADMIN ANNOUNCEMENT API] GET_IMAGE_UPLOAD_URL 응답:', response.data);
      return response.data;
    } catch (error) {
      console.error('[ADMIN ANNOUNCEMENT API] GET_IMAGE_UPLOAD_URL 에러:', error);
      throw error;
    }
  },
};
