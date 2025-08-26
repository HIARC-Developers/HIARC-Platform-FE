import { AnnouncementWritePage } from '@/features/announcement/pages/announcement-write-page';
import { PageLayout } from '@hiarc-platform/ui';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function WriteAnnouncementPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <AnnouncementWritePage />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
