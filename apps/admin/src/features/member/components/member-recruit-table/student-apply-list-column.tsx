import { StudentApply } from '@hiarc-platform/shared';
import { Label } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { ApprovalButton } from './approval-button';

export const getStudentApplyListColumns = (
  showApprovalButton: boolean
): Array<ColumnDef<StudentApply>> => {
  console.log('getStudentApplyListColumns called with showApprovalButton:', showApprovalButton);

  const baseColumns: Array<ColumnDef<StudentApply>> = [
    {
      id: 'number',
      accessorKey: 'number',
      enableSorting: false,
      size: 56,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          번호
        </Label>
      ),
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.memberId ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'name',
      accessorKey: 'name',
      enableSorting: false,
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
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.memberName ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'bojHandle',
      accessorKey: 'bojHandle',
      enableSorting: false,
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
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.bojHandle ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'contact',
      accessorKey: 'contact',
      enableSorting: false,
      size: 120,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          연락처
        </Label>
      ),
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.phoneAddress ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'studentId',
      accessorKey: 'studentId',
      enableSorting: false,
      size: 80,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          학번
        </Label>
      ),
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.studentId ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'department',
      accessorKey: 'department',
      enableSorting: false,
      size: 96,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          학과
        </Label>
      ),
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.department ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'doubleMajor',
      accessorKey: 'doubleMajor',
      enableSorting: false,
      size: 60,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          복전 여부
        </Label>
      ),
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.isDoubleMajorLabel ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'grade',
      accessorKey: 'grade',
      enableSorting: false,
      size: 80,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          학년
        </Label>
      ),
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.gradeLabel ?? '-'}
        </Label>
      ),
    },
    {
      id: 'status',
      accessorKey: 'status',
      enableSorting: false,
      size: 80,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          재학여부
        </Label>
      ),
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.absenceStatusLabel ?? '-'}
        </Label>
      ),
    },
    {
      id: 'approve',
      accessorKey: 'approve',
      enableSorting: false,
      size: 96,
      meta: {
        headAlign: 'left',
        bodyAlign: 'left',
      },
      header: () => (
        <Label size="md" weight="bold">
          승인여부
        </Label>
      ),
      cell: ({ row }: { row: { original: StudentApply } }) => (
        <Label size="md" weight="regular">
          {row.original.applicationStatusLabel ?? '-'}
        </Label>
      ),
    },
  ];

  const approvalColumn: ColumnDef<StudentApply> = {
    id: 'approveButton',
    accessorKey: 'approveButton',
    enableSorting: false,
    size: 96,
    meta: {
      headAlign: 'center' as const,
      bodyAlign: 'center' as const,
    },
    header: () => (
      <Label size="md" weight="bold">
        승인 처리
      </Label>
    ),
    cell: ({ row }: { row: { original: StudentApply } }) => (
      <ApprovalButton studentApply={row.original} />
    ),
    footer: (props) => props.column.id,
  };

  const result = showApprovalButton ? [...baseColumns, approvalColumn] : baseColumns;

  console.log('Final columns count:', result.length);
  console.log(
    'Columns:',
    result.map((col) => col.id)
  );

  return result;
};
