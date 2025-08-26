import { AnnouncementEditPage } from '@/features/announcement/pages/announcement-edit-page';
import { PageLayout } from '@hiarc-platform/ui';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function EditAnnouncementPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <AnnouncementEditPage />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
