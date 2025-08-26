import { AwardListPage } from '@/features/award/pages/award-list-page';
import { PageLayout } from '@hiarc-platform/ui';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function CompetitonListPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <AwardListPage />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
