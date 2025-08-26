'use client';

import { StudySearchSection } from '@/features/study/components/study-search-section';
import { StudyTable } from '@/features/study/components/study-table';
import { useStudyListPageState } from '@/features/study/hooks/page/use-study-list-page-state';
import { Title, LoadingDots } from '@hiarc-platform/ui';

export function MobileStudyListPage(): React.ReactElement {
  const {
    studies,
    isLoading,
    error,
    filterParams,
    handlePageChange,
    handleSearch,
  } = useStudyListPageState();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingDots size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">스터디 목록을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Title size="sm" weight="bold">
          스터디
        </Title>
      </div>
      <StudySearchSection
        className="mt-4"
        onSearchChange={handleSearch}
        initialValues={filterParams}
      />
      <StudyTable className="mt-4" pageableModel={studies} onPageChange={handlePageChange} />
    </>
  );
}