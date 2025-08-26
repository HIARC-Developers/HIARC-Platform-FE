import { PageableModel } from '@hiarc-platform/shared';

const DOTS = 'DOTS';

export interface PaginationState {
  pageRange: Array<number | typeof DOTS>;
  currentPage: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  canGoToFirst: boolean;
  canGoToLast: boolean;
}

// New API using PageableModel
export function usePaginationWithPageable<T>(params: {
  pageableModel: PageableModel<T> | null | undefined;
  siblingCount?: number;
}): PaginationState {
  const { pageableModel, siblingCount = 1 } = params;
  
  if (!pageableModel) {
    return {
      pageRange: [],
      currentPage: 1,
      totalPages: 0,
      hasPrevious: false,
      hasNext: false,
      canGoToFirst: false,
      canGoToLast: false,
    };
  }

  const totalPages = pageableModel.totalPages ?? 0;
  const currentPage = pageableModel.getCurrentPage();
  const hasPrevious = pageableModel.hasPrevious;
  const hasNext = pageableModel.hasNext;

  if (totalPages === 0) {
    return {
      pageRange: [],
      currentPage: 1,
      totalPages: 0,
      hasPrevious: false,
      hasNext: false,
      canGoToFirst: false,
      canGoToLast: false,
    };
  }

  const totalPageNumbers = siblingCount * 2 + 5;

  let pageRange: Array<number | typeof DOTS> = [];

  if (totalPageNumbers >= totalPages) {
    pageRange = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      pageRange = [...leftRange, DOTS, totalPages];
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      pageRange = [firstPageIndex, DOTS, ...rightRange];
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      pageRange = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    } else {
      pageRange = Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  }

  return {
    pageRange,
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    canGoToFirst: currentPage > 1,
    canGoToLast: currentPage < totalPages,
  };
}

// Legacy API for backwards compatibility
export function usePagination(params: {
  totalPageCount: number;
  currentPage: number;
  siblingCount?: number;
}): Array<number | typeof DOTS> {
  const { totalPageCount, currentPage, siblingCount = 1 } = params;
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPageNumbers >= totalPageCount) {
    return Array.from({ length: totalPageCount }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPageCount - rightItemCount + i + 1
    );
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }

  return Array.from({ length: totalPageCount }, (_, i) => i + 1);
}
