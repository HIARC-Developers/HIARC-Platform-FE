'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopStudyListPage, MobileStudyListPage } from '@/features/study/pages/study-list';
import { RestrictedPageGuard } from '@/shared/components/ui/RestrictedPageGuard';

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
