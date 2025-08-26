import { StudyListPage } from '@/features/study/pages/study-list-page';
import { PageLayout } from '@hiarc-platform/ui';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function StudyPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <StudyListPage />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
