'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopAnnouncementEditPage, MobileAnnouncementEditPage } from '@/features/announcement/pages/announcement-edit';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function EditAnnouncementPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout
        desktopChildren={<DesktopAnnouncementEditPage />}
        mobileChildren={<MobileAnnouncementEditPage />}
      />
    </RestrictedPageGuard>
  );
}
