'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopStudyEditPage, MobileStudyEditPage } from '@/features/study/pages/study-edit';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function EditStudyPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout
        desktopChildren={<DesktopStudyEditPage />}
        mobileChildren={<MobileStudyEditPage />}
      />
    </RestrictedPageGuard>
  );
}
