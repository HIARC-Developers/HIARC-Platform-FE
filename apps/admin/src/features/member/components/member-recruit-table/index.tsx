import { cn, CommonTableBody, CommonTableHead, Pagination, SlideFade } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/shared';
import { useMemo, useState } from 'react';
import { getStudentApplyListColumns } from './student-apply-list-column';
import { PageableModel, StudentApply } from '@hiarc-platform/shared';

interface MemberRecruitTableProps {
  showApprovalButton?: boolean;
  pageableModel?: PageableModel<StudentApply>;
  className?: string;
  onPageChange?(page: number): void;
}

export function MemberRecruitTable({
  showApprovalButton = false,
  pageableModel,
  className,
  onPageChange,
}: MemberRecruitTableProps): React.ReactElement {
  const columns = useMemo(
    () => getStudentApplyListColumns(showApprovalButton),
    [showApprovalButton]
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const table = useTable({
    columns,
    data: pageableModel?.content ?? [],
    pageState: [pageableModel?.number ?? 0, () => {}],
    totalPages: pageableModel?.totalPages ?? 0,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('w-full flex-col items-center', className)}>
      <SlideFade key="table" className="w-full">
        <CommonTableHead className="bg-gray-100 text-gray-900" table={table} />
        <CommonTableBody table={table} onClick={function (): void {}} />
      </SlideFade>
      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination 
            className="mt-8" 
            pageableModel={pageableModel} 
            onPageChange={(page) => onPageChange(page - 1)} 
          />
        </div>
      )}
    </div>
  );
}
