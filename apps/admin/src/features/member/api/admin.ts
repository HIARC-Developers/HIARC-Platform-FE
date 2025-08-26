import { Admin, Instructor } from '@hiarc-platform/shared';
import { apiClient } from '../../../shared/api/client';

export const adminApi = {
  /**
   * 특정 학기의 관리자 목록을 조회하는 API입니다.
   * @param semesterId - 조회할 학기의 ID입니다.
   * @returns 관리자 객체 배열을 반환합니다.
   */
  GET_ADMINS: async (semesterId: number): Promise<Admin[]> => {
    const response = await apiClient.get('/admin/members/admin', {
      params: { semesterId },
    });
    return response.data.map((item: unknown) => Admin.fromJson(item));
  },

  /**
   * 특정 학기의 강사 목록을 조회하는 API입니다.
   * @param semesterId - 조회할 학기의 ID입니다.
   * @returns 강사 객체 배열을 반환합니다.
   */
  GET_INSTRUCTORS: async (semesterId: number): Promise<Instructor[]> => {
    const response = await apiClient.get('/admin/members/instructor', {
      params: { semesterId },
    });
    return response.data.map((item: unknown) => Instructor.fromJson(item));
  },

  /**
   * 새로운 관리자를 생성하는 API입니다.
   * @param params - 관리자 생성 정보입니다.
   * @param params.semesterId - 학기 ID입니다.
   * @param params.bojHandle - 백준 핸들입니다.
   * @param params.adminRole - 관리자 역할입니다.
   * @returns void
   */
  CREATE_ADMIN: async ({
    semesterId,
    bojHandle,
    adminRole,
  }: {
    semesterId: number;
    bojHandle: string;
    adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
  }): Promise<void> => {
    await apiClient.post('/admin/members/admin', {
      semesterId,
      bojHandle,
      adminRole,
    });
  },

  /**
   * 기존 관리자의 역할을 수정하는 API입니다.
   * @param params - 관리자 수정 정보입니다.
   * @param params.semesterId - 학기 ID입니다.
   * @param params.memberId - 회원 ID입니다.
   * @param params.adminRole - 새로운 관리자 역할입니다.
   * @returns void
   */
  UPDATE_ADMIN: async ({
    semesterId,
    memberId,
    adminRole,
  }: {
    semesterId: number;
    memberId: number;
    adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
  }): Promise<void> => {
    await apiClient.patch(`/admin/members/admin/${memberId}`, {
      semesterId,
      adminRole,
    });
  },

  /**
   * 관리자 권한을 삭제하는 API입니다.
   * @param memberId - 관리자 권한을 삭제할 회원의 ID입니다.
   * @param semesterId - 학기 ID입니다.
   * @returns void
   */
  DELETE_ADMIN: async (memberId: number, semesterId: number): Promise<void> => {
    await apiClient.delete(`/admin/members/admin/${memberId}`, {
      data: { semesterId },
    });
  },

  /**
   * 관리자 권한을 삭제하는 API입니다.
   * @param bojHandle - 백준 핸들입니다.
   * @returns void
   */
  VALIDATE_ADMIN_HANDLE: async (bojHandle: string): Promise<void> => {
    await apiClient.post('/admin/members/validate-admin', {
      bojHandle,
    });
  },
};
