'use client';

import { AnnouncementSearchSection } from '@/features/announcement/components/announcement-search-section';
import { AnnouncementTable } from '@/features/announcement/components/announcement-table';

import { Title, LoadingDots } from '@hiarc-platform/ui';
import { useAnnouncementListPageState } from '../../hooks/page/use-announcement-list-page-state';

export function MobileAnnouncementListPage(): React.ReactElement {
  const { filterParams, announcements, isLoading, error, handlePageChange, handleSearch } =
    useAnnouncementListPageState();

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
        <p className="text-gray-500">공지사항을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Title size="sm" weight="bold">
        공지사항
      </Title>
      <AnnouncementSearchSection
        className="mt-2"
        onSearch={handleSearch}
        initialValues={filterParams}
      />
      <AnnouncementTable
        className="mt-4"
        pageableModel={announcements}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
