import { PageableModel, StudySummary } from '@hiarc-platform/shared';
import { cn, CommonTableBody, CommonTableHead, Pagination, SlideFade } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { STUDY_LIST_COLUMN } from './study-list-column';

interface StudyTableProps {
  pageableModel?: PageableModel<StudySummary> | null;
  className?: string;
  onPageChange?(page: number): void;
}

export function StudyTable({
  pageableModel,
  className,
  onPageChange,
}: StudyTableProps): React.ReactElement {
  const router = useRouter();
  const columns = useMemo(() => STUDY_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');

  const data = pageableModel?.content ?? [];
  const totalPages = pageableModel?.totalPages ?? 0;

  const table = useTable({
    columns,
    data,
    pageState: [0, () => {}],
    totalPages,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('w-full flex-col items-center', className)}>
      <SlideFade key="table" className="w-full">
        <CommonTableHead table={table} />
        <CommonTableBody
          table={table}
          onClick={function (row: Row<StudySummary>): void {
            const id = row.original.studyId;
            if (!id) {
              return;
            }
            router.push(`/study/${id}`);
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
