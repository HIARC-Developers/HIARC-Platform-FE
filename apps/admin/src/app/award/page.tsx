import { AwardListPage } from '@/features/award/pages/award-list-page';
import { RestrictedPageGuard } from '@/shared/components/RestrictedPageGuard';
import { PageLayout } from '@hiarc-platform/ui';

export default function CompetitonListPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <AwardListPage />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
