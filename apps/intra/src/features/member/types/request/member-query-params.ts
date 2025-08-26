import { z } from 'zod';

export interface MemberQueryParamsProps {
  page?: number;
  size?: number;
  sort?: 'name' | 'createdAt' | 'generation';
  direction?: 'asc' | 'desc';
  generation?: number;
  role?: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  status?: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
  search?: string;
}

export class MemberQueryParams {
  constructor(public readonly props: MemberQueryParamsProps) {}

  static readonly schema = z.object({
    page: z.number().min(0).optional(),
    size: z.number().min(1).max(100).optional(),
    sort: z.enum(['name', 'createdAt', 'generation']).optional(),
    direction: z.enum(['asc', 'desc']).optional(),
    generation: z.number().min(1).optional(),
    role: z.enum(['STUDENT', 'INSTRUCTOR', 'ADMIN']).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED']).optional(),
    search: z.string().min(1).optional(),
  });

  static fromJson(json: any): MemberQueryParams {
    const validated = this.schema.parse(json);
    return new MemberQueryParams(validated);
  }

  toJson(): MemberQueryParamsProps {
    return { ...this.props };
  }
}