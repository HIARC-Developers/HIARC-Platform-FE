import { StudyQueryParams } from '@/features/study/types/request/study-query-params';
import { useSemesterStoreInit } from '@/shared/hooks/use-semester-store';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useStudies from '../study-common/query/use-studies';

export function useStudyListPageState() {
  useSemesterStoreInit();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterParams, setFilterParams] = useState<Omit<StudyQueryParams, 'page' | 'size'>>({});
  const pageSize = 10;

  useEffect(() => {
    const page = searchParams.get('page');
    const studyName = searchParams.get('studyName');
    const semesterId = searchParams.get('semesterId');
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    if (page) {
      setCurrentPage(Number(page));
    }

    const params: Omit<StudyQueryParams, 'page' | 'size'> = {};
    if (studyName) {
      params.studyName = studyName;
    }
    if (semesterId) {
      params.semesterId = Number(semesterId);
    }
    if (category) {
      params.category = category;
    }
    if (status) {
      params.status = status as 'active' | 'completed' | 'cancelled';
    }

    setFilterParams(params);
  }, [searchParams]);

  const {
    data: studies,
    isLoading,
    error,
  } = useStudies({
    page: currentPage - 1,
    size: pageSize,
    ...filterParams,
  });

  const updateURL = (page: number, params: Omit<StudyQueryParams, 'page' | 'size'>): void => {
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
    const newURL = queryString ? `?${queryString}` : '/study';
    router.replace(newURL, { scroll: false });
  };

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
    updateURL(page, filterParams);
  };

  const handleSearch = (params: Omit<StudyQueryParams, 'page' | 'size'>): void => {
    setFilterParams(params);
    setCurrentPage(1);
    updateURL(1, params);
  };

  return {
    studies,
    isLoading,
    error,
    filterParams,
    handlePageChange,
    handleSearch,
  };
}
