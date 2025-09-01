'use client';

import { CreateStudyForm } from '@/features/study/components/create-study-form-section/create-study-form';
import { BackButton, PageLayout, LoadingDots, FadeIn } from '@hiarc-platform/ui';
import { Title } from '@hiarc-platform/ui';
import { useParams, useRouter } from 'next/navigation';
import { useStudy } from '@/features/study/hooks';
import React, { useState, useEffect } from 'react';
import { RestrictedPageGuard } from '@/shared/components/RestrictedPageGuard';

export default function EditStudyPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const studyId = typeof params.id === 'string' ? Number(params.id) : undefined;
  const { data: studyData, isLoading, error } = useStudy(studyId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const contentComponent = (
    <FadeIn isVisible={Boolean(studyData)} duration={0.4} className="flex flex-col">
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-6">
        <BackButton onClick={() => router.back()} />
        <div className="flex w-full items-center justify-between">
          <Title size="sm" weight="bold">
            {studyData.name} - 스터디 수정
          </Title>
        </div>
        <div className=" h-px w-full bg-gray-700"></div>
      </div>
      <CreateStudyForm studyId={studyId} isEditMode={true} />
    </FadeIn>
  );

  return (
    <RestrictedPageGuard>
      <PageLayout>{contentComponent}</PageLayout>
    </RestrictedPageGuard>
  );
}
