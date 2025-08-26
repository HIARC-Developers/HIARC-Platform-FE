'use client';

import { PageLayout } from '@hiarc-platform/ui';
import {
  DesktopAnnouncementListPage,
  MobileAnnouncementListPage,
} from '@/features/announcement/pages/announcement-list';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function AnnouncementList(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout
        desktopChildren={<DesktopAnnouncementListPage />}
        mobileChildren={<MobileAnnouncementListPage />}
      />
    </RestrictedPageGuard>
  );
}
