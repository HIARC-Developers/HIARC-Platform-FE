'use client';

import { AnnouncementDesktopHeader, AnnouncementWrite } from '@hiarc-platform/ui';
import { LoadingDots } from '@hiarc-platform/ui';
import { useAnnouncementEditPageState } from '../../hooks/page/use-announcement-edit-page-state';

export function DesktopAnnouncementEditPage(): React.ReactElement {
  const {
    id,
    studyId,
    announcement,
    studyOptions,
    isLoading,
    error,
    pageTitle,
    handleSubmit,
    handleGoBack,
  } = useAnnouncementEditPageState();

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  // 에러가 발생했을 때
  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500">공지사항을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <AnnouncementDesktopHeader title={pageTitle} onBackClick={handleGoBack} className="pb-6" />
      <AnnouncementWrite
        announcementId={id}
        initialStudyId={studyId}
        announcement={announcement}
        studyOptions={studyOptions}
        disableCategoryChange={true}
        disableStudyTypeChange={true}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
