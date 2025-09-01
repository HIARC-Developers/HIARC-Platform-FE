'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopStudyEditPage, MobileStudyEditPage } from '@/features/study/pages/study-edit';
import { RestrictedPageGuard } from '@/shared/components/ui/RestrictedPageGuard';

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
