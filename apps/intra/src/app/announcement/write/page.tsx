'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopAnnouncementWritePage, MobileAnnouncementWritePage } from '@/features/announcement/pages/announcement-write';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function WriteAnnouncementPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout
        desktopChildren={<DesktopAnnouncementWritePage />}
        mobileChildren={<MobileAnnouncementWritePage />}
      />
    </RestrictedPageGuard>
  );
}
