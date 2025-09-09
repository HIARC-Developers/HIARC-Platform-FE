'use client';

import { AnnouncementWrite } from '@hiarc-platform/ui';
import { useAnnouncementWritePageState } from '../../hooks/page/use-announcement-write-page-state';

export function MobileAnnouncementWritePage(): React.ReactElement {
  const { studyOptions, initialType, initialStudyId, initialStudyAnnounceType, handleSubmit } =
    useAnnouncementWritePageState();

  return (
    <AnnouncementWrite
      studyOptions={studyOptions}
      initialAnnouncementType={initialType}
      initialStudyId={initialStudyId}
      initialStudyAnnounceType={initialStudyAnnounceType}
      disableCategoryChange={true}
      disableStudyTypeChange={true}
      onSubmit={handleSubmit}
    />
  );
}
