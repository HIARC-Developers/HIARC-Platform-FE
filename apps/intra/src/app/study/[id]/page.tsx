'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopStudyDetailPage, MobileStudyDetailPage } from '@/features/study/pages/study-detail';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function StudyPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout
        desktopChildren={<DesktopStudyDetailPage />}
        mobileChildren={<MobileStudyDetailPage />}
      />
    </RestrictedPageGuard>
  );
}
