'use client';

import { useMemberProfile } from '@/features/member/hooks/query/use-member-profile';
import {
  DesktopMemberDetailPage,
  MobileMemberDetailPage,
} from '@/features/member/pages/member-detail-page';
import { PageLayout } from '@hiarc-platform/ui';
import { useParams, useRouter } from 'next/navigation';

export default function MemberProfilePage(): React.ReactElement {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, error } = useMemberProfile(Number(id));
  const router = useRouter();

  const handleBackClick = (): void => {
    router.back();
  };

  return (
    <PageLayout
      desktopChildren={
        <DesktopMemberDetailPage
          memberProfileData={data}
          isLoading={isLoading}
          error={error}
          onBackClick={handleBackClick}
        />
      }
      mobileChildren={
        <MobileMemberDetailPage memberProfileData={data} isLoading={isLoading} error={error} />
      }
    />
  );
}
