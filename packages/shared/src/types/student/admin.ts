export interface Admin {
  memberId: number;
  memberName: string;
  bojHandle: string;
  adminRole: 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE';
  adminStartedAt: Date;
  adminRoleName: string;
}

export const Admin = {
  fromJson(json: unknown): Admin {
    const data = (json || {}) as Record<string, unknown>;
    const adminRole =
      (data.adminRole as 'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE') ||
      'PRESIDENT';
    return {
      memberId: (data.memberId as number) || 0,
      memberName: (data.memberName as string) || '',
      bojHandle: (data.bojHandle as string) || '',
      adminRole,
      adminStartedAt: (data.adminStartedAt as Date) || new Date(),
      get adminRoleName(): string {
        switch (adminRole) {
          case 'PRESIDENT':
            return '회장';
          case 'VICE_PRESIDENT':
            return '부회장';
          case 'SECRETARY':
            return '총무';
          case 'STAFF':
            return '운영진';
          case 'NONE':
            return '역할 없음';
          default:
            return '역할 없음';
        }
      },
    };
  },
};
