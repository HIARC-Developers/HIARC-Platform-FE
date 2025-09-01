import { StudyListPage } from '@/features/study/pages';
import { RestrictedPageGuard } from '@/shared/components/RestrictedPageGuard';
import { PageLayout } from '@hiarc-platform/ui';

export default function StudyPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <StudyListPage />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
