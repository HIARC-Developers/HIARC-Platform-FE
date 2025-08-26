import { Semester } from '../semester/semester';
import { StudySummary } from '../study/study-summary';

export interface Student {
  id?: number | null;
  name?: string | null;
  bojHandle?: string | null;
  studentId?: string | null;
  phoneAddress?: string | null;
  studies?: StudySummary[] | null;
  participatedSemesters?: Semester[] | null;
  memberRole?: 'GUEST' | 'ASSOCIATE' | 'ADMIN' | 'REGULAR' | null;

  readonly memberRoleLabel: string;
}

export const Student = {
  fromJson(json: unknown): Student {
    const data = (json || {}) as Record<string, unknown>;
    const student = {
      id: (data.id as number) || null,
      name: (data.name as string) || null,
      bojHandle: (data.bojHandle as string) || null,
      studentId: (data.studentId as string) || null,
      phoneAddress: (data.phoneAddress as string) || null,
      studies: (data.studies as StudySummary[]) || null,
      participatedSemesters: (data.participatedSemesters as Semester[]) || null,
      memberRole: (data.memberRole as 'GUEST' | 'ASSOCIATE' | 'ADMIN' | 'REGULAR') || null,
      get memberRoleLabel(): string {
        switch (this.memberRole) {
          case 'ADMIN':
            return '운영진';
          case 'REGULAR':
            return '학회원';
          case 'ASSOCIATE':
            return '준회원';
          case 'GUEST':
            return '비회원';
          default:
            return '-';
        }
      },
    };
    return student;
  },

  /**
   * memberRole을 한글 라벨로 변환하는 유틸리티 함수입니다.
   * @param memberRole - 변환할 memberRole 값입니다.
   * @returns 한글 라벨을 반환합니다.
   */
  getMemberRoleLabel(memberRole: 'GUEST' | 'ASSOCIATE' | 'ADMIN' | 'REGULAR' | null): string {
    switch (memberRole) {
      case 'ADMIN':
        return '운영진';
      case 'REGULAR':
        return '학회원';
      case 'ASSOCIATE':
        return '준회원';
      case 'GUEST':
        return '비회원';
      default:
        return '-';
    }
  },
};
