'use client';

import { AnnouncementDesktopHeader } from '@hiarc-platform/ui';
import { AnnouncementWrite } from '@hiarc-platform/ui';
import { useAnnouncementWritePageState } from '../../hooks/page/use-announcement-write-page-state';

export function DesktopAnnouncementWritePage(): React.ReactElement {
  const {
    studyOptions,
    initialType,
    initialStudyId,
    initialStudyAnnounceType,
    handleSubmit,
    handleGoBack,
  } = useAnnouncementWritePageState();

  return (
    <div className="flex w-full flex-col">
      <AnnouncementDesktopHeader
        title="공지사항 작성"
        onBackClick={handleGoBack}
        className="pb-6"
      />
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
