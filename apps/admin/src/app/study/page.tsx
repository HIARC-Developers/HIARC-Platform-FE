'use client';
import { Title, Button, PageLayout, LoadingDots } from '@hiarc-platform/ui';
import { useRouter } from 'next/navigation';
import { StudyTable } from '@/features/study/components/study-table';
import { useStudies } from '@/features/study/hooks';
import { useState } from 'react';
import { FadeIn } from '@/components/fade-in';

export default function StudyPage(): React.ReactElement {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: studiesData,
    isLoading,
    error,
  } = useStudies({
    page: currentPage - 1,
    size: 10,
  });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  if (isLoading) {
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

  if (error) {
    return (
      <FadeIn
        isVisible={true}
        duration={0.3}
        className="flex min-h-screen items-center justify-center"
      >
        <p className="text-gray-500">스터디 목록을 불러오는 중 오류가 발생했습니다.</p>
      </FadeIn>
    );
  }

  const contentComponent = (
    <FadeIn isVisible={Boolean(studiesData)} duration={0.4} className="flex flex-col">
      <div className="flex justify-between">
        <Title size="sm" weight="bold">
          스터디
        </Title>
        <Button size="md" className="w-[100px]" onClick={() => router.push('/study/information')}>
          개설하기
        </Button>
      </div>
      <StudyTable className="mt-6" pageableModel={studiesData} onPageChange={handlePageChange} />
    </FadeIn>
  );

  return <PageLayout>{contentComponent}</PageLayout>;
}
