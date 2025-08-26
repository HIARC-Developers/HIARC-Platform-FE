import { StudyCreatePage } from '@/features/study/pages/study-create-page';
import { PageLayout } from '@hiarc-platform/ui';
import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function CreateStudyPage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <PageLayout>
        <StudyCreatePage />
      </PageLayout>
    </RestrictedPageGuard>
  );
}
