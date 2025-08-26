import { Award } from '@hiarc-platform/shared';
import { RatingChipProps } from '@hiarc-platform/ui';
import { Rating } from './rating';
import { Streak } from './streak';

export interface MemberProfile {
  bojHandle?: string | null;
  name?: string | null;
  division?: RatingChipProps['rating'];
  tier?: RatingChipProps['rating'];
  introduction?: string | null;
  rating?: Rating | null;
  streak?: Streak | null;
  award?: Award[] | null;
}

export const MemberProfile = {
  fromJson(json: unknown): MemberProfile {
    const data = (json || {}) as Record<string, unknown>;

    return {
      bojHandle: (data?.bojHandle as string) ?? null,
      name: (data?.name as string) ?? null,
      division: (data?.division as RatingChipProps['rating']) ?? null,
      tier: (data?.tier as RatingChipProps['rating']) ?? null,
      introduction: (data?.introduction as string) ?? null,
      rating: data?.rating ? Rating.fromJson(data.rating) : null,
      streak: data?.streak ? Streak.fromJson(data.streak) : null,
      award: Array.isArray(data?.award)
        ? data.award.map((award: unknown) => Award.fromJson(award))
        : null,
    };
  },
};
