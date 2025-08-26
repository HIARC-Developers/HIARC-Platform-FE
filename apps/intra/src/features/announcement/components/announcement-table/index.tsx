import { cn, CommonTableBody, CommonTableHead, Pagination, SlideFade } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ANNOUNCEMENT_LIST_COLUMN } from './announcement-list-column';
import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';

interface AnnouncementTableSectionProps {
  pageableModel?: PageableModel<AnnouncementSummary>;
  className?: string;
  onPageChange?(page: number): void;
}

export function AnnouncementTable({
  className,
  pageableModel,
  onPageChange,
}: AnnouncementTableSectionProps): React.ReactElement {
  const columns = useMemo(() => ANNOUNCEMENT_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');
  const [page, setPage] = useState(0);
  const router = useRouter();

  const table = useTable({
    columns,
    data: pageableModel?.content || [],
    pageState: [page, setPage],
    totalPages: Math.ceil((pageableModel?.totalElements || 0) / 10),
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <SlideFade key="table" className="w-full">
        <CommonTableHead
          table={table}
          className="border-b border-t border-b-gray-200 border-t-gray-900 bg-white"
        />
        <CommonTableBody
          table={table}
          onClick={function (row: Row<AnnouncementSummary>): void {
            const announcementId = row.original.announcementId;
            if (!announcementId) {
              return;
            }
            router.push(`/announcement/${announcementId}`);
          }}
        />
      </SlideFade>
      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
