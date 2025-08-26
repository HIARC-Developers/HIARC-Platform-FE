'use client';

import { AnnouncementWrite } from '@hiarc-platform/ui';
import { BackButton, Divider, LoadingDots } from '@hiarc-platform/ui';
import { Title, Label } from '@hiarc-platform/ui';
import { useAnnouncementEditPageState } from '../../hooks/page/use-announcement-edit-page-state';

export function DesktopAnnouncementEditPage(): React.ReactElement {
  const {
    id,
    studyId,
    announcement,
    studyOptions,
    isLoading,
    error,
    isLecture,
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
      <div className="flex w-full flex-col items-center gap-6">
        <BackButton onClick={handleGoBack} />
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <Title size="sm" weight="bold">
              {pageTitle}
            </Title>
          </div>
          {isLecture && (
            <div className="flex items-center gap-4">
              <Label size="md" className="text-gray-600">
                스터디: {announcement?.studyName}
              </Label>
              <Label size="md" className="text-gray-600">
                회차: {announcement?.lectureRound}회차
              </Label>
            </div>
          )}
        </div>
        <Divider variant="horizontal" size="full" />
      </div>
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