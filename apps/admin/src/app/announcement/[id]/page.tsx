import { AnnouncementDetailPage as AnnouncementDetailPageComponent } from '@/features/announcement/pages/announcement-detail-page';
import { PageLayout } from '@hiarc-platform/ui';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function AnnouncementDetailPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <AnnouncementDetailPageComponent />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
