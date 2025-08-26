interface ApprovedNotification {
  semesterId?: number;
  semesterYear?: number;
  semesterType?: 'FIRST' | 'SECOND';
  greetingDescription?: string;
}

export interface MyInfoProps {
  memberId?: number | null;
  bojHandle?: string | null;
  memberRole?: string | null;
  adminRole?: string | null;
  approvedNotification?: ApprovedNotification | null;
}

interface MyInfoJson {
  memberId?: number;
  bojHandle?: string;
  memberRole?: string;
  adminRole?: string;
  approvedNotification?: ApprovedNotification | null;
}

export class MyInfo {
  private readonly props: MyInfoProps;

  constructor(props: MyInfoProps) {
    this.props = props;
  }

  get memberId(): number | null {
    return this.props.memberId ?? null;
  }

  get bojHandle(): string | null {
    return this.props.bojHandle ?? null;
  }

  get memberRole(): string | null {
    return this.props.memberRole ?? null;
  }

  get adminRole(): string | null {
    return this.props.adminRole ?? null;
  }

  get approvedNotification(): ApprovedNotification | null {
    return this.props.approvedNotification ?? null;
  }

  toJson(): unknown {
    return {
      memberId: this.props.memberId,
      bojHandle: this.props.bojHandle,
      memberRole: this.props.memberRole,
      adminRole: this.props.adminRole,
    };
  }

  static fromJson(json: unknown): MyInfo {
    const data = json as MyInfoJson;
    return new MyInfo({
      memberId: data?.memberId ?? null,
      bojHandle: data?.bojHandle ?? null,
      memberRole: data?.memberRole ?? null,
      adminRole: data?.adminRole ?? null,
      approvedNotification: data?.approvedNotification
        ? (data.approvedNotification as ApprovedNotification)
        : null,
    });
  }

  copyWith(updates: Partial<MyInfoProps>): MyInfo {
    return new MyInfo({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: MyInfo): boolean {
    return Boolean(other) && this.props.memberId === other?.props.memberId;
  }

  compareTo(other: MyInfo): number {
    const thisMemberId = this.props.memberId ?? 0;
    const otherMemberId = other.props.memberId ?? 0;
    return thisMemberId - otherMemberId;
  }
}
