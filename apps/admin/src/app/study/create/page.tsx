import { StudyCreatePage } from '@/features/study/pages';
import { RestrictedPageGuard } from '@/shared/components/RestrictedPageGuard';
import { PageLayout } from '@hiarc-platform/ui';

export default function CreateStudyPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <StudyCreatePage />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
