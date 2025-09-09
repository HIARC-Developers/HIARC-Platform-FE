import { cn, CommonTableBody, CommonTableHead, Pagination, SlideFade } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/shared';
import { useMemo, useState } from 'react';
import { useAwardListColumns } from './award-list-column';
import { PageableModel } from '@hiarc-platform/shared';
import { Award } from '../../../../../../../packages/shared/src/types/award/award';

interface CompetitionTableProps {
  data?: PageableModel<Award> | null;
  className?: string;
  onPageChange?(page: number): void;
}

export function CompetitionTable({
  data,
  className,
  onPageChange,
}: CompetitionTableProps): React.ReactElement {
  const column = useAwardListColumns();
  const columns = useMemo(() => column, [column]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useTable({
    columns,
    data: data?.content ?? [],
    pageState: [data?.number ?? 0, () => {}], // Use server page state, disable local state
    totalPages: data?.totalPages ?? 0,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  const handlePageChange = (page: number): void => {
    onPageChange?.(page - 1);
  };

  return (
    <div className={cn('w-full flex-col items-center', className)}>
      <SlideFade key="table" className="w-full">
        <CommonTableHead className="bg-gray-100 text-gray-900" table={table} />
        <CommonTableBody table={table} onClick={() => {}} />
      </SlideFade>
      <Pagination className="mt-8" pageableModel={data} onPageChange={handlePageChange} />
    </div>
  );
}
