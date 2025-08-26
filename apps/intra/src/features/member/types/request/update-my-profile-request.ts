import { z } from 'zod';

export interface UpdateMyProfileRequestProps {
  name?: string;
  bojHandle?: string;
  bio?: string;
  profileImageUrl?: string;
}

export class UpdateMyProfileRequest {
  constructor(public readonly props: UpdateMyProfileRequestProps) {}

  static readonly schema = z.object({
    name: z.string().min(1).max(50).optional(),
    bojHandle: z.string().min(3).max(20).optional(),
    bio: z.string().max(500).optional(),
    profileImageUrl: z.string().url().optional(),
  });

  static fromJson(json: any): UpdateMyProfileRequest {
    const validated = this.schema.parse(json);
    return new UpdateMyProfileRequest(validated);
  }

  toJson(): UpdateMyProfileRequestProps {
    return { ...this.props };
  }
}