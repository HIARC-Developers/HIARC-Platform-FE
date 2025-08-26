'use client';

import { BackButton, LoadingDots, FadeIn, Title } from '@hiarc-platform/ui';
import { useStudyEditPageState } from '@/features/study/hooks/page/use-study-edit-page-state';
import { EditStudyForm } from '../../components/edit-study-form';

export function MobileStudyEditPage(): React.ReactElement {
  const { studyId, studyData, isLoading, error, mounted, handleBackClick } =
    useStudyEditPageState();

  if (!mounted || isLoading) {
    return (
      <FadeIn
        isVisible={true}
        duration={0.3}
        className="flex min-h-screen items-center justify-center"
      >
        <LoadingDots size="lg" className="flex min-h-screen items-center justify-center" />
      </FadeIn>
    );
  }

  if (error || !studyData || !studyId) {
    return (
      <FadeIn
        isVisible={true}
        duration={0.3}
        className="flex min-h-screen items-center justify-center"
      >
        <p className="text-gray-500">스터디 정보를 불러오는 중 오류가 발생했습니다.</p>
      </FadeIn>
    );
  }

  return (
    <FadeIn isVisible={Boolean(studyData)} duration={0.4} className="flex flex-col">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-4">
        <BackButton onClick={handleBackClick} />
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            {studyData.name} - 스터디 수정
          </Title>
        </div>
        <div className=" h-px w-full bg-gray-700"></div>
      </div>
      <EditStudyForm studyId={studyId} />
    </FadeIn>
  );
}
