'use client';

import { AwardSection } from '@/features/award/components/award-section';
import { HitingSection } from '@/features/member/components/hiting-section';
import { MyInfoSection } from '@/features/member/components/my-info-section';
import { StreakSection } from '@/features/member/components/streak-section';
import { Divider, LoadingDots, FadeIn } from '@hiarc-platform/ui';
import { MemberProfile } from '../../types/model/member-profile';

interface MobileMemberDetailPageProps {
  memberProfileData?: MemberProfile;
  isLoading: boolean;
  error: Error | null;
}

export function MobileMemberDetailPage({
  memberProfileData,
  isLoading,
  error,
}: MobileMemberDetailPageProps): React.ReactElement {
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (error !== null) {
    return <div>Error loading member profile</div>;
  }

  if (!memberProfileData) {
    return <div>No member profile data available</div>;
  }

  return (
    <FadeIn isVisible={!isLoading && !error}>
      <MyInfoSection
        className="mt-5"
        isMe={false}
        bojHandle={memberProfileData?.bojHandle}
        name={memberProfileData?.name}
        introduction={memberProfileData?.introduction}
        rating={memberProfileData?.tier ?? 'UNRATED'}
        div={memberProfileData?.division ?? 'UNRATED'}
      />
      <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
      <HitingSection
        className="mt-6"
        isMe={false}
        season={memberProfileData?.rating?.seasonScore ?? 0}
        total={memberProfileData?.rating?.totalScore ?? 0}
        today={memberProfileData?.rating?.todayScore ?? 0}
      />
      <StreakSection className="mt-4" />
      <AwardSection className="mt-4" awardList={memberProfileData?.award ?? []} />
    </FadeIn>
  );
}
