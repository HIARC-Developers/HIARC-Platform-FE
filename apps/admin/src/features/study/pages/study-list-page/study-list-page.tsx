'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Title, Button, LoadingDots, FadeIn } from '@hiarc-platform/ui';
import { StudyTable } from '../../components/study-table';
import { useStudies } from '../../hooks';
import { useSemesterStoreInit, useSemesterStore } from '@/shared/hooks/use-semester-store';

export function StudyListPage(): React.ReactElement {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize semester store on component mount
  useSemesterStoreInit();
  const { selectedSemesterId } = useSemesterStore();

  const {
    data: studiesData,
    isLoading,
    error,
  } = useStudies({
    semesterId: selectedSemesterId ? Number(selectedSemesterId) : 1,
    page: currentPage - 1,
    size: 10,
  });

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const handleCreateStudy = (): void => {
    router.push('/study/create');
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

  return (
    <FadeIn isVisible={Boolean(studiesData)} duration={0.4} className="flex flex-col">
      <div className="flex justify-between">
        <Title size="sm" weight="bold">
          스터디
        </Title>
        <Button size="md" className="w-[100px]" onClick={handleCreateStudy}>
          개설하기
        </Button>
      </div>
      <StudyTable className="mt-6" pageableModel={studiesData} onPageChange={handlePageChange} />
    </FadeIn>
  );
}