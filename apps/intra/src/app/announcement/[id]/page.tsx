'use client';

import { PageLayout } from '@hiarc-platform/ui';
import {
  DesktopAnnouncementDetailPage,
  MobileAnnouncementDetailPage,
} from '@/features/announcement/pages/announcement-detail';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function AnnouncementDetail(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout
        desktopChildren={<DesktopAnnouncementDetailPage />}
        mobileChildren={<MobileAnnouncementDetailPage />}
      />
    </RestrictedPageGuard>
  );
}
