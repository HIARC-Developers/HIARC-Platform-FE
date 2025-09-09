'use client';

import { AwardSection } from '@/features/award/components/award-section';
import { HitingSection } from '@/features/member/components/hiting-section';
import { MyInfoSection } from '@/features/member/components/my-info-section';
import { StreakSection } from '@/features/member/components/streak-section';
import { BackButton, Divider, TwoColumnLayout, LoadingDots, FadeIn } from '@hiarc-platform/ui';
import { MemberProfile } from '../../types/model/member-profile';

interface DesktopMemberDetailPageProps {
  memberProfileData?: MemberProfile;
  isLoading: boolean;
  error: Error | null;
  onBackClick?(): void;
}

export function DesktopMemberDetailPage({
  memberProfileData,
  isLoading,
  error,
  onBackClick,
}: DesktopMemberDetailPageProps): React.ReactElement {
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
    return <div>Error loading member profile</div>;
  }

  return (
    <FadeIn isVisible={isLoading || error ? false : true}>
      <BackButton onClick={onBackClick} />
      <MyInfoSection
        className="mt-5"
        isMe={false}
        bojHandle={memberProfileData.bojHandle}
        name={memberProfileData.name}
        introduction={memberProfileData.introduction}
        rating={memberProfileData.tier ?? 'UNRATED'}
        div={memberProfileData.division ?? 'UNRATED'}
      />
      <Divider variant="horizontal" size="full" className="mt-4 bg-gray-900" />
      <TwoColumnLayout
        className="mt-8"
        left={
          <>
            <HitingSection
              isMe={false}
              season={memberProfileData.rating?.seasonScore ?? 0}
              total={memberProfileData.rating?.totalScore ?? 0}
              today={memberProfileData.rating?.todayScore ?? 0}
            />
            <StreakSection className="mt-6" />
          </>
        }
        right={<AwardSection awardList={memberProfileData.award ?? []} />}
      />
    </FadeIn>
  );
}
