import { AnnouncementSummary } from '@hiarc-platform/shared';
import { Label, CategoryChip } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';

function mapAnnouncementType(type: string): 'RATING' | 'STUDY' | 'ETC' | 'GENERAL' | 'EXTERNAL' {
  switch (type) {
    case 'RATING':
      return 'RATING';
    case 'STUDY':
      return 'STUDY';
    case 'GENERAL':
      return 'GENERAL';
    case 'ETC':
      return 'ETC';
    case 'EXTERNAL':
      return 'EXTERNAL';
    default:
      return 'GENERAL';
  }
}

export const ANNOUNCEMENT_LIST_COLUMN: Array<ColumnDef<AnnouncementSummary>> = [
  {
    id: 'id',
    accessorKey: 'id',
    enableSorting: false,
    size: 60,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        번호
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="md" weight="regular">
        {row.original.announcementId ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'category',
    accessorKey: 'category',
    size: 100,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        카테고리
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <CategoryChip
        category={mapAnnouncementType(row.original.announcementType || 'GENERAL')}
      ></CategoryChip>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'title',
    accessorKey: 'title',
    size: 0,
    meta: {
      headAlign: 'center',
      bodyAlign: 'left',
    },
    header: () => (
      <Label size="md" weight="bold">
        제목
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="md" weight="regular" className="pl-4">
        {row.original.announcementTitle ?? '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    size: 96,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        작성일
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.createdAt
          ? new Date(row.original.createdAt).toLocaleDateString('ko-KR')
          : '-'}
      </Label>
    ),
    footer: (props) => props.column.id,
  },
];
