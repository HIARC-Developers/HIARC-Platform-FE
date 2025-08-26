import React from 'react';
import { Admin } from '@hiarc-platform/shared';
import { DialogUtil, IconButton, Label } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { EditAdminDialog } from '../dialog/edit-admin-dialog';

interface AdminColumnsOptions {
  onDelete(admin: Admin): void;
  isDeleting: boolean;
}

export const createAdminColumns = ({
  onDelete,
  isDeleting,
}: AdminColumnsOptions): Array<ColumnDef<Admin>> => [
  {
    id: 'role',
    accessorKey: 'role',
    size: 120,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        직함
      </Label>
    ),
    cell: ({ row }: { row: { original: Admin } }) => (
      <Label size="md" weight="regular">
        {row.original.adminRoleName ?? '-'}
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
        이름
      </Label>
    ),
    cell: ({ row }: { row: { original: Admin } }) => (
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
    cell: ({ row }: { row: { original: Admin } }) => (
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
        직함 시작일
      </Label>
    ),
    cell: ({ row }: { row: { original: Admin } }) => {
      const formatDate = (date: string | Date | null | undefined): string => {
        if (!date) {
          return '-';
        }
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      };

      return (
        <Label size="sm" weight="regular" className="text-gray-700">
          {formatDate(row.original.adminStartedAt)}
        </Label>
      );
    },
    footer: (props) => props.column.id,
  },
  {
    id: 'edit',
    accessorKey: 'edit',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        수정
      </Label>
    ),
    cell: ({ row }: { row: { original: Admin } }) => (
      <IconButton
        className="relative z-10 w-full"
        iconSrc="/shared-assets/Edit.svg"
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          DialogUtil.showComponent(<EditAdminDialog admin={row.original} />);
        }}
      />
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'delete',
    accessorKey: 'delete',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        삭제
      </Label>
    ),
    cell: ({ row }: { row: { original: Admin } }) => (
      <IconButton
        className="relative z-10 w-full"
        iconSrc="/shared-assets/Delete.svg"
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          onDelete(row.original);
        }}
        disabled={isDeleting}
      />
    ),
    footer: (props) => props.column.id,
  },
];
