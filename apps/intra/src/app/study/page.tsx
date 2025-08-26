'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopStudyListPage, MobileStudyListPage } from '@/features/study/pages/study-list';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function StudyListPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout
        desktopChildren={<DesktopStudyListPage />}
        mobileChildren={<MobileStudyListPage />}
      />
    </RestrictedPageGuard>
  );
}
