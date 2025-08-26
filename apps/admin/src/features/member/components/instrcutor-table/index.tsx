'use client';
import { Instructor } from '@hiarc-platform/shared';
import { cn, CommonTableBody, CommonTableHead, Label } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { ColumnDef } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';

const STUDY_LEADER_LIST_COLUMN: Array<ColumnDef<Instructor>> = [
  {
    id: 'name',
    accessorKey: 'name',
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        이름
      </Label>
    ),
    cell: ({ row }: { row: { original: Instructor } }) => (
      <Label size="md" weight="regular">
        {row.original.memberName ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'handle',
    accessorKey: 'handle',
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        핸들명
      </Label>
    ),
    cell: ({ row }: { row: { original: Instructor } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.bojHandle ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'startStaff',
    accessorKey: 'startStaff',
    size: 0,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디명
      </Label>
    ),
    cell: ({ row }: { row: { original: Instructor } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.studyName ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];

interface StudyReaderTableSectionProps {
  instructorData: Instructor[];
  className?: string;
}

export function InstructorTable({
  instructorData,
  className,
}: StudyReaderTableSectionProps): React.ReactElement {
  const columns = useMemo(() => STUDY_LEADER_LIST_COLUMN, []);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useTable({
    columns,
    data: instructorData,
    pageState: [0, () => {}],
    totalPages: 10,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('w-full flex-col items-center', className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key="table"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          className="w-full"
        >
          <CommonTableHead table={table} className="bg-gray-100" />
          <CommonTableBody table={table} onClick={function (): void {}} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
