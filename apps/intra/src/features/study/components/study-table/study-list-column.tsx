import { StudySummary } from '@hiarc-platform/shared';
import { Label, StudyStatusChip } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';

export const STUDY_LIST_COLUMN: Array<ColumnDef<StudySummary>> = [
  {
    id: 'activeStatus',
    accessorKey: 'activeStatus',
    size: 100,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        상태
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <StudyStatusChip status={row.original.studyStatus}></StudyStatusChip>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'semester',
    accessorKey: 'semester',
    size: 150,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        진행 학기
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="md" weight="regular">
        {row.original.semesterName}
      </Label>
    ),
    footer: (props) => props.column.id,
  },

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
        스터디명
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="md" weight="regular" className="underline">
        {row.original.studyName ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'instructor',
    accessorKey: 'instructorName',
    size: 200,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        스터디장 이름(핸들명)
      </Label>
    ),
    cell: ({ row }: { row: { original: StudySummary } }) => (
      <Label size="md" weight="regular">
        {row.original.instructorName} ({row.original.instructorBojHandle})
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];
