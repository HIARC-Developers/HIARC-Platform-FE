'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopMyPage, MobileMyPage } from '@/features/member/pages/my-page';
import { RestrictedPageGuard } from '@/shared/components/ui/RestrictedPageGuard';

export default function MyPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout desktopChildren={<DesktopMyPage />} mobileChildren={<MobileMyPage />} />
    </RestrictedPageGuard>
  );
}
