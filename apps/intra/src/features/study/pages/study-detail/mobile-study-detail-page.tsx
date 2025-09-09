'use client';

import { LoadingDots, StudyInfoSection, MobileStudyButton } from '@hiarc-platform/ui';
import { useStudyDetailPageState } from '@/features/study/hooks/page/use-study-detail-page-state';
import { TabSection } from '@/features/study/components/tab-section';

export function MobileStudyDetailPage(): React.ReactElement {
  const { studyId, studyData, isLoading, error, mounted, handleEditClick, handleApplyClick } =
    useStudyDetailPageState();

  if (!mounted || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingDots size="lg" />
      </div>
    );
  }

  if (error || !studyData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">스터디 정보를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-10 pb-20 md:pb-0">
      <StudyInfoSection
        className="pt-4"
        studyData={studyData}
        onEditClick={handleEditClick}
        onApplyClick={handleApplyClick}
      />
      <TabSection
        className="pt-6"
        studyName={studyData?.name ?? ''}
        isStudent={studyData?.isStudent ?? false}
        isAdmin={studyData?.isInstructor ?? false}
        studyId={studyId}
        semesterId={studyData?.semesterId ?? 1}
        isGroupStudy={studyData?.isGroupStudy ?? false}
      />
      <MobileStudyButton studyData={studyData} onApplyClick={handleApplyClick} />
    </div>
  );
}
