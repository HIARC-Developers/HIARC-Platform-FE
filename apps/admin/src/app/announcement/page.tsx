import { AnnouncementListPage } from '@/features/announcement/pages/announcement-list-page';
import { PageLayout } from '@hiarc-platform/ui';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function AnnouncementPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <AnnouncementListPage />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
