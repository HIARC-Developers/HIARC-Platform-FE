'use client';

import { TabSection } from '@/features/study/components';
import { BackButton, Button, PageLayout, LoadingDots, StudyInfoSection } from '@hiarc-platform/ui';
import { useRouter, useParams } from 'next/navigation';
import { useStudy } from '@/features/study/hooks';
import React, { useState, useEffect } from 'react';
import { FadeIn } from '@hiarc-platform/ui';
import { RestrictedPageGuard } from '@/shared/components/RestrictedPageGuard';

export default function StudyPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const studyId = Number(params.id);
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

  if (error || !studyData) {
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
      <BackButton onClick={() => router.back()} />
      <StudyInfoSection
        className="pt-5"
        isAdmin={true}
        studyData={studyData}
        onEditClick={() => router.push(`/study/${studyId}/edit`)}
      />
      <TabSection
        className="pt-8"
        isAdmin={true}
        studyName={studyData?.name ?? ''}
        studyId={studyId}
        isGroupStudy={studyData?.isGroupStudy ?? false}
      />
      <div className="mt-8 flex items-center justify-center gap-4">
        <Button variant="line" className="w-[186px]" onClick={() => router.push('/study')}>
          목록으로
        </Button>
      </div>
    </FadeIn>
  );

  return (
    <RestrictedPageGuard>
      <PageLayout>{contentComponent}</PageLayout>
    </RestrictedPageGuard>
  );
}
