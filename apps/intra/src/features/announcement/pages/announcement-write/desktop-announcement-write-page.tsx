'use client';

import { BackButton, Divider } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
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
      <div className="flex w-full flex-col items-center gap-6">
        <BackButton onClick={handleGoBack} />
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            공지사항 작성
          </Title>
        </div>
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