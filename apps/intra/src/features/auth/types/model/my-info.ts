export interface MyInfoProps {
  memberId?: number | null;
  bojHandle?: string | null;
  memberRole?: string | null;
  adminRole?: string | null;
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

  toJson(): any {
    return {
      memberId: this.props.memberId,
      bojHandle: this.props.bojHandle,
      memberRole: this.props.memberRole,
      adminRole: this.props.adminRole,
    };
  }

  static fromJson(json: any): MyInfo {
    return new MyInfo({
      memberId: json?.memberId ?? null,
      bojHandle: json?.bojHandle ?? null,
      memberRole: json?.memberRole ?? null,
      adminRole: json?.adminRole ?? null,
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
