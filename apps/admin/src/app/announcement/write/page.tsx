'use client';

import { AnnouncementWritePage } from '@/features/announcement/pages/announcement-write-page';
import { BackButton, Divider, PageLayout, Title } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';

export default function WriteAnnouncementPage(): React.ReactElement {
  const router = useRouter();

  return (
    <PageLayout>
      <AnnouncementWritePage />
    </PageLayout>
  );
}
