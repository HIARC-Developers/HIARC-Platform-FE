import { ReactElement } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { usePaginationWithPageable } from '@hiarc-platform/util';
import { PageableModel } from '@hiarc-platform/shared';

interface PaginationProps<T = unknown> {
  pageableModel: PageableModel<T> | null | undefined;
  onPageChange(page: number): void;
  className?: string;
  siblingCount?: number;
}

export const Pagination = <T = unknown,>({
  pageableModel,
  onPageChange,
  className,
  siblingCount = 1,
}: PaginationProps<T>): ReactElement => {
  const paginationState = usePaginationWithPageable({
    pageableModel,
    siblingCount,
  });

  const { pageRange, currentPage, totalPages, hasPrevious, hasNext } = paginationState;


  // 빈 데이터인 경우에만 숨김 (totalPages가 0인 경우)
  if (!totalPages || totalPages <= 0) {
    return <div></div>;
  }

  return (
    <div className={cn('flex flex-row items-center justify-center gap-2', className)}>
      <Button
        variant="line_secondary"
        size="xs"
        className="h-8 w-8 px-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
      >
        {'<'}
      </Button>

      <ul className="m-0 flex list-none flex-row items-center justify-center gap-2 p-0">
        {pageRange.map((page: number | string, index: number) => {
          if (page === 'DOTS') {
            return (
              <li key={`dots-${index}`} className="select-none px-2 text-gray-400">
                ...
              </li>
            );
          }

          return (
            <li key={page}>
              <Button
                variant={page === currentPage ? 'fill' : 'line_secondary'}
                size="xs"
                className="h-8 min-w-8 px-2"
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </Button>
            </li>
          );
        })}
      </ul>

      <Button
        variant="line_secondary"
        size="xs"
        className="h-8 w-8 px-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        {'>'}
      </Button>
    </div>
  );
};
