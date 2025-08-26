'use client';

import { Divider } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
import { AnnouncementWrite } from '@hiarc-platform/ui';
import { useAnnouncementWritePageState } from '../../hooks/page/use-announcement-write-page-state';

export function MobileAnnouncementWritePage(): React.ReactElement {
  const {
    studyOptions,
    initialType,
    initialStudyId,
    initialStudyAnnounceType,
    handleSubmit,
  } = useAnnouncementWritePageState();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col gap-3">
        <Title size="sm" weight="bold">
          공지사항 작성
        </Title>
        <Divider variant="horizontal" size="full" />
      </div>
      <AnnouncementWrite
        studyOptions={studyOptions}
        initialAnnouncementType={initialType}
        initialStudyId={initialStudyId}
        initialStudyAnnounceType={initialStudyAnnounceType}
        disableCategoryChange={true}
        disableStudyTypeChange={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
}