import { AnnouncementSummary } from '@hiarc-platform/shared';
import { Label, CategoryChip, IconButton, DialogUtil } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { MobileMoreMenu } from './mobile-more-menu';

export const getAdminAnnouncementListColumn = (
  deleteAnnouncement: (
    id: number,
    options?: { onSuccess?(): void; onError?(error: unknown): void }
  ) => void,
  onEdit: (announcement: AnnouncementSummary) => void
): Array<ColumnDef<AnnouncementSummary>> => [
  {
    id: 'announcementId',
    accessorKey: 'announcementId',
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
    id: 'announcementType',
    accessorKey: 'announcementType',
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
      <CategoryChip category={row.original.announcementType ?? 'RATING'} />
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
    id: 'author',
    accessorKey: 'authorName',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        작성자
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.authorName ?? '-'}
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
  },
  {
    id: 'isPublic',
    accessorKey: 'isPublic',
    size: 64,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        공개 여부
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <Label size="sm" weight="regular" className="text-gray-700">
        {row.original.isPublic === null
          ? '비공개'
          : row.original.isPublic === true
            ? '공개'
            : '비공개'}
      </Label>
    ),
  },
  {
    id: 'edit',
    size: 60,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        수정
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <IconButton
        className="ml-1.5"
        type="button"
        iconSrc="/shared-assets/Edit.svg"
        onClick={(event) => {
          event.stopPropagation();
          onEdit(row.original);
        }}
      />
    ),
  },
  {
    id: 'delete',
    size: 60,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        삭제
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <IconButton
        className="ml-1.5"
        type="button"
        iconSrc="/shared-assets/Delete.svg"
        onClick={(event) => {
          event.stopPropagation();
          DialogUtil.showConfirm(
            '삭제된 공지사항은 복구할 수 없습니다.',
            () => {
              if (row.original.announcementId) {
                deleteAnnouncement(row.original.announcementId, {
                  onSuccess: () => {
                    DialogUtil.showSuccess('삭제되었습니다.');
                  },
                  onError: (error) => {
                    const errorMessage =
                      error instanceof Error ? error.message : '삭제에 실패했습니다.';
                    DialogUtil.showError(errorMessage);
                  },
                });
              }
            },
            undefined,
            {
              title: '정말로 삭제하시겠습니까?',
            }
          );
        }}
      />
    ),
  },
];

export const getMobileAdminAnnouncementListColumn = (
  deleteAnnouncement: (
    id: number,
    options?: { onSuccess?(): void; onError?(error: unknown): void }
  ) => void,
  onEdit: (announcement: AnnouncementSummary) => void
): Array<ColumnDef<AnnouncementSummary>> => [
  {
    id: 'announcementId',
    accessorKey: 'announcementId',
    enableSorting: false,
    size: 48,
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
    size: 88,
    meta: {
      headAlign: 'left',
      bodyAlign: 'left',
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
  {
    id: 'more',
    size: 40,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        더보기
      </Label>
    ),
    cell: ({ row }: { row: { original: AnnouncementSummary } }) => (
      <MobileMoreMenu
        announcement={row.original}
        onEdit={onEdit}
        onDelete={(announcement) => {
          DialogUtil.showConfirm(
            '삭제된 공지사항은 복구할 수 없습니다.',
            () => {
              if (announcement.announcementId) {
                deleteAnnouncement(announcement.announcementId, {
                  onSuccess: () => {
                    DialogUtil.showSuccess('삭제되었습니다.');
                  },
                  onError: (error) => {
                    const errorMessage =
                      error instanceof Error ? error.message : '삭제에 실패했습니다.';
                    DialogUtil.showError(errorMessage);
                  },
                });
              }
            },
            undefined,
            {
              title: '정말로 삭제하시겠습니까?',
            }
          );
        }}
      />
    ),
  },
];
