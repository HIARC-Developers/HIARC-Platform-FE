import { ZodType } from 'zod';

export abstract class BaseModel<P extends object> {
  protected readonly props: Readonly<P>;
  protected static schema: ZodType<unknown>;

  constructor(props: P) {
    const Ctor = this.constructor as typeof BaseModel & { schema: ZodType<P> };
    Ctor.schema.parse(props);
    this.props = Object.freeze(props);
  }

  toJson(): P {
    return { ...this.props };
  }

  equals(other?: this): boolean {
    return Boolean(other) && JSON.stringify(this.props) === JSON.stringify(other?.props);
  }

  compareTo(other: this): number {
    return JSON.stringify(this.props).localeCompare(JSON.stringify(other.props));
  }

  static fromJson<P extends object, T extends BaseModel<P>>(
    this: { new (p: P): T; schema: ZodType<P> },
    json: unknown
  ): T {
    const data = this.schema.parse(json); // 정적 schema는 서브클래스가 채움
    return new this(data);
  }
}