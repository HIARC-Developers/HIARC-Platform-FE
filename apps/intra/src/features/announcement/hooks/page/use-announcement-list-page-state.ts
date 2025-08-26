import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useSemesterStoreInit } from '@/shared/hooks/use-semester-store';
import { AnnouncementQueryParams } from '../../types/request/announcement-query-params';
import useAnnouncements from '../query/use-announcements';

export function useAnnouncementListPageState() {
  useSemesterStoreInit();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<Omit<AnnouncementQueryParams, 'page' | 'size'>>(
    {}
  );
  const pageSize = 10;

  // URL에서 파라미터 읽기
  useEffect(() => {
    const page = searchParams.get('page');
    const title = searchParams.get('title');
    const announcementType = searchParams.get('announcementType');
    const semesterId = searchParams.get('semesterId');

    if (page) {
      setCurrentPage(Number(page));
    }

    const params: Omit<AnnouncementQueryParams, 'page' | 'size'> = {};
    if (title) {
      params.title = title;
    }
    if (announcementType) {
      params.announcementType = announcementType || 'GENERAL';
    }
    if (semesterId) {
      params.semesterId = Number(semesterId);
    }

    setFilterParams(params);
  }, [searchParams]);

  const {
    data: announcements,
    isLoading,
    error,
  } = useAnnouncements({
    page: currentPage - 1,
    size: pageSize,
    ...filterParams,
  });

  const updateURL = (
    page: number,
    params: Omit<AnnouncementQueryParams, 'page' | 'size'>
  ): void => {
    const newSearchParams = new URLSearchParams();

    if (page > 1) {
      newSearchParams.set('page', page.toString());
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newSearchParams.set(key, value.toString());
      }
    });

    const queryString = newSearchParams.toString();
    const newURL = queryString ? `?${queryString}` : '/announcement';
    router.replace(newURL, { scroll: false });
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    updateURL(page, filterParams);
  };

  const handleSearch = (params: Omit<AnnouncementQueryParams, 'page' | 'size'>): void => {
    setFilterParams(params);
    setCurrentPage(1);
    updateURL(1, params);
  };

  return {
    currentPage,
    filterParams,
    announcements,
    isLoading,
    error,
    handlePageChange,
    handleSearch,
  };
}
