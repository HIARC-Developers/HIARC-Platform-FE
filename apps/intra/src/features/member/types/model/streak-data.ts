export interface StreakDataProps {
  date?: string | null;
  value?: boolean | null;
}

export class StreakData {
  private readonly props: StreakDataProps;

  constructor(props: StreakDataProps) {
    this.props = props;
  }

  get date(): string | null {
    return this.props.date ?? null;
  }

  get value(): boolean | null {
    return this.props.value ?? null;
  }

  toJson(): any {
    return {
      date: this.props.date,
      value: this.props.value,
    };
  }

  static fromJson(json: any): StreakData {
    return new StreakData({
      date: json?.date ?? null,
      value: json?.value ?? null,
    });
  }

  copyWith(updates: Partial<StreakDataProps>): StreakData {
    return new StreakData({
      ...this.props,
      ...updates,
    });
  }

  equals(other?: StreakData): boolean {
    return Boolean(other) && this.props.date === other?.props.date;
  }

  compareTo(other: StreakData): number {
    const thisDate = this.props.date ? new Date(this.props.date).getTime() : 0;
    const otherDate = other.props.date ? new Date(other.props.date).getTime() : 0;
    return thisDate - otherDate;
  }
}