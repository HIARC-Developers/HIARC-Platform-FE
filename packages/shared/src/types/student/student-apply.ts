export interface StudentApply {
  memberId?: number | null;
  memberName?: string | null;
  bojHandle?: string | null;
  phoneAddress?: string | null;
  studentId?: string | null;
  department?: string | null;
  isDoubleMajor?: boolean | null;
  grade?: 'FRESHMAN' | 'SOPHOMORE' | 'JUNIOR' | 'SENIOR' | 'OVER' | null;
  absenceStatus?: 'ENROLLED' | 'ON_LEAVE' | 'MILITARY_LEAVE' | null;
  applicationStatus?: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | null;

  readonly isDoubleMajorLabel: string;
  readonly gradeLabel: string;
  readonly absenceStatusLabel: string;
  readonly applicationStatusLabel: string;
}

export const StudentApply = {
  fromJson(json: unknown): StudentApply {
    const data = (json || {}) as Record<string, unknown>;
    const studentApply = {
      memberId: (data.memberId as number) || null,
      memberName: (data.memberName as string) || null,
      bojHandle: (data.bojHandle as string) || null,
      studentId: (data.studentId as string) || null,
      phoneAddress: (data.phoneAddress as string) || null,
      department: (data.department as string) || null,
      isDoubleMajor: typeof data.isDoubleMajor === 'boolean' ? data.isDoubleMajor : null,
      grade: (data.grade as 'FRESHMAN' | 'SOPHOMORE' | 'JUNIOR' | 'SENIOR' | 'OVER') || null,
      absenceStatus: (data.absenceStatus as 'ENROLLED' | 'ON_LEAVE' | 'MILITARY_LEAVE') || null,
      applicationStatus:
        (data.applicationStatus as 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED') || null,
      get isDoubleMajorLabel(): string {
        if (this.isDoubleMajor === true) {
          return 'O';
        }
        if (this.isDoubleMajor === false) {
          return 'X';
        }
        return '-';
      },
      get gradeLabel(): string {
        switch (this.grade) {
          case 'FRESHMAN':
            return '1학년';
          case 'SOPHOMORE':
            return '2학년';
          case 'JUNIOR':
            return '3학년';
          case 'SENIOR':
            return '4학년';
          case 'OVER':
            return '5학년 이상';
          default:
            return '-';
        }
      },
      get absenceStatusLabel(): string {
        switch (this.absenceStatus) {
          case 'ENROLLED':
            return '재학중';
          case 'ON_LEAVE':
            return '일반 휴학';
          case 'MILITARY_LEAVE':
            return '군휴학';
          default:
            return '-';
        }
      },
      get applicationStatusLabel(): string {
        switch (this.applicationStatus) {
          case 'PENDING_APPROVAL':
            return '승인 대기중';
          case 'APPROVED':
            return '승인됨';
          case 'REJECTED':
            return '거절됨';
          default:
            return '-';
        }
      },
    };
    return studentApply;
  },

  /**
   * isDoubleMajor를 한글 라벨로 변환하는 유틸리티 함수입니다.
   * @param isDoubleMajor - 변환할 isDoubleMajor 값입니다.
   * @returns 한글 라벨을 반환합니다.
   */
  getIsDoubleMajorLabel(isDoubleMajor: boolean | null): string {
    if (isDoubleMajor === true) {
      return 'O';
    }
    if (isDoubleMajor === false) {
      return 'X';
    }
    return '-';
  },

  /**
   * grade를 한글 라벨로 변환하는 유틸리티 함수입니다.
   * @param grade - 변환할 grade 값입니다.
   * @returns 한글 라벨을 반환합니다.
   */
  getGradeLabel(grade: 'FRESHMAN' | 'SOPHOMORE' | 'JUNIOR' | 'SENIOR' | 'OVER' | null): string {
    switch (grade) {
      case 'FRESHMAN':
        return '1학년';
      case 'SOPHOMORE':
        return '2학년';
      case 'JUNIOR':
        return '3학년';
      case 'SENIOR':
        return '4학년';
      case 'OVER':
        return '5학년 이상';
      default:
        return '-';
    }
  },

  /**
   * absenceStatus를 한글 라벨로 변환하는 유틸리티 함수입니다.
   * @param absenceStatus - 변환할 absenceStatus 값입니다.
   * @returns 한글 라벨을 반환합니다.
   */
  getAbsenceStatusLabel(absenceStatus: 'ENROLLED' | 'ON_LEAVE' | 'MILITARY_LEAVE' | null): string {
    switch (absenceStatus) {
      case 'ENROLLED':
        return '재학중';
      case 'ON_LEAVE':
        return '일반 휴학';
      case 'MILITARY_LEAVE':
        return '군휴학';
      default:
        return '-';
    }
  },

  /**
   * applicationStatus를 한글 라벨로 변환하는 유틸리티 함수입니다.
   * @param applicationStatus - 변환할 applicationStatus 값입니다.
   * @returns 한글 라벨을 반환합니다.
   */
  getApplicationStatusLabel(
    applicationStatus: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | null
  ): string {
    switch (applicationStatus) {
      case 'PENDING_APPROVAL':
        return '승인 대기중';
      case 'APPROVED':
        return '승인됨';
      case 'REJECTED':
        return '거절됨';
      default:
        return '-';
    }
  },
};
