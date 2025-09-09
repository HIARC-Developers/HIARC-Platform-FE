import { PageableModel, StudySummary } from '@hiarc-platform/shared';
import {
  cn,
  CommonTableBody,
  CommonTableHead,
  Label,
  Pagination,
  SlideFade,
  StudyStatusChip,
} from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/shared';
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

  const handleStudyClick = (study: StudySummary): void => {
    const id = study.studyId;
    if (!id) {
      return;
    }
    router.push(`/study/${id}`);
  };

  return (
    <div className={cn('w-full flex-col items-center', className)}>
      {/* Desktop Table */}
      <div className="hidden w-full md:block">
        <SlideFade key="table" className="w-full">
          <CommonTableHead
            table={table}
            className="border-b border-t border-b-gray-200 border-t-gray-900 bg-white"
          />
          <CommonTableBody
            table={table}
            onClick={function (row: Row<StudySummary>): void {
              handleStudyClick(row.original);
            }}
          />
        </SlideFade>
      </div>

      {/* Mobile List */}
      <div className="block w-full md:hidden">
        <SlideFade key="mobile-list" className="w-full">
          <div className="flex flex-col">
            {data.map((study, index) => (
              <div
                key={study.studyId || index}
                className="cursor-pointer border-b border-gray-200 pb-2 pt-3 transition-colors hover:bg-gray-50"
                onClick={() => handleStudyClick(study)}
              >
                <div className="mb-2 flex items-start justify-between">
                  <StudyStatusChip status={study.studyStatus} />
                  <Label className="whitespace-nowrap text-gray-700">
                    {study.instructorName} ({study.instructorBojHandle})
                  </Label>
                </div>
                <div className="flex gap-2">
                  <Label className="whitespace-nowrap text-gray-900">{study.semesterName}</Label>
                  <Label className="truncate whitespace-nowrap text-gray-900 underline">
                    {study.studyName}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </SlideFade>
      </div>

      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
