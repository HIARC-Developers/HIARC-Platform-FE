import { AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';
import {
  cn,
  CommonTableBody,
  CommonTableHead,
  Label,
  Pagination,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  DialogUtil,
} from '@hiarc-platform/ui';
import { DateUtil, useTable } from '@hiarc-platform/shared';
import { ColumnDef, Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo, useState, useCallback } from 'react';
import { useDeleteStudyAnnouncement } from '../../hooks/study-instructor/mutation/use-delete-study-announcement';

const MOBILE_STUDY_ANNOUNCEMENT_COLUMN: Array<ColumnDef<AnnouncementSummary>> = [
  {
    id: 'number',
    accessorKey: 'number',
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
        {row.original.title ?? '-'}
      </Label>
    ),
  },
  {
    id: 'date',
    accessorKey: 'date',
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
      <Label size="xs" weight="regular">
        {DateUtil.formatDateWithDots(row.original.createdAt ?? '') ?? '-'}
      </Label>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    size: 48,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        관리
      </Label>
    ),
    cell: ({ row, column }: { row: { original: AnnouncementSummary }; column: any }) => {
      const announcement = row.original;
      const isInstructor = column.columnDef.meta?.isInstructor;

      if (!isInstructor) {
        return null;
      }

      const handleMoreClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
      };

      const handleEditClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        column.columnDef.meta?.handleEdit(announcement);
      };

      const handleDeleteClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        column.columnDef.meta?.handleDelete(announcement);
      };

      return (
        <div className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <IconButton
                type="button"
                iconSrc="/shared-assets/More.svg"
                size="sm"
                onClick={handleMoreClick}
              />
            </PopoverTrigger>
            <PopoverContent className="w-24 p-1" align="end">
              <div className="flex flex-col">
                <button
                  className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
                  onClick={handleEditClick}
                >
                  <Label className="cursor-pointer">수정</Label>
                </button>
                <button
                  className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
                  onClick={handleDeleteClick}
                >
                  <Label className="cursor-pointer">삭제</Label>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];

const STUDY_ANNOUNCEMENT_COLUMN: Array<ColumnDef<AnnouncementSummary>> = [
  {
    id: 'number',
    accessorKey: 'number',
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
        {row.original.title ?? '-'}
      </Label>
    ),
  },
  {
    id: 'date',
    accessorKey: 'date',
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
      <Label size="xs" weight="regular">
        {DateUtil.formatDateWithDots(row.original.createdAt ?? '') ?? '-'}
      </Label>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    size: 48,
    meta: {
      headAlign: 'center',
      bodyAlign: 'center',
    },
    header: () => (
      <Label size="md" weight="bold">
        관리
      </Label>
    ),
    cell: ({ row, column }: { row: { original: AnnouncementSummary }; column: any }) => {
      const announcement = row.original;
      const isInstructor = column.columnDef.meta?.isInstructor;

      if (!isInstructor) {
        return null;
      }

      const handleMoreClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
      };

      const handleEditClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        column.columnDef.meta?.handleEdit(announcement);
      };

      const handleDeleteClick = (event: React.MouseEvent): void => {
        event.stopPropagation();
        column.columnDef.meta?.handleDelete(announcement);
      };

      return (
        <div className="flex items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <IconButton
                type="button"
                iconSrc="/shared-assets/More.svg"
                size="sm"
                onClick={handleMoreClick}
              />
            </PopoverTrigger>
            <PopoverContent className="w-24 p-1" align="end">
              <div className="flex flex-col">
                <button
                  className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
                  onClick={handleEditClick}
                >
                  <Label className="cursor-pointer">수정</Label>
                </button>
                <button
                  className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
                  onClick={handleDeleteClick}
                >
                  <Label className="cursor-pointer">삭제</Label>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];

interface AnnouncementTableProps {
  pageableModel?: PageableModel<AnnouncementSummary> | null;
  onPageChange?(page: number): void;
  className?: string;
  isInstructor?: boolean;
  studyId?: number;
  semesterId?: number;
}

export function AnnouncementTable({
  className,
  pageableModel,
  onPageChange,
  isInstructor = false,
  studyId,
  semesterId,
}: AnnouncementTableProps): React.ReactElement {
  const router = useRouter();
  const { mutate: deleteStudyAnnouncement } = useDeleteStudyAnnouncement();
  const [globalFilter, setGlobalFilter] = useState('');

  const handleEdit = useCallback(
    (announcement: AnnouncementSummary): void => {
      if (!announcement.announcementId) {
        console.error('공지사항 수정 실패: announcementId가 없습니다.');
        return;
      }

      const params = new URLSearchParams();
      if (studyId) {
        params.set('studyId', studyId.toString());
      }
      if (semesterId) {
        params.set('semesterId', semesterId.toString());
      }

      router.push(`/announcement/${announcement.announcementId}/edit?${params.toString()}`);
    },
    [router, studyId, semesterId]
  );

  const handleDelete = useCallback(
    (announcement: AnnouncementSummary): void => {
      if (!announcement.announcementId || !studyId) {
        console.error('공지사항 삭제 실패: announcementId 또는 studyId가 없습니다.');
        return;
      }

      DialogUtil.showConfirm('정말 이 공지사항을 삭제하시겠습니까?', () => {
        deleteStudyAnnouncement({
          studyId: studyId,
          announcementId: announcement.announcementId!,
        });
      });
    },
    [deleteStudyAnnouncement, studyId]
  );

  const desktopColumns = useMemo(
    () =>
      STUDY_ANNOUNCEMENT_COLUMN.filter((col) => 
        col.id !== 'actions' || isInstructor
      ).map((col) => ({
        ...col,
        meta: {
          ...col.meta,
          isInstructor,
          handleEdit,
          handleDelete,
        },
      })),
    [isInstructor, handleEdit, handleDelete]
  );

  const mobileColumns = useMemo(
    () =>
      MOBILE_STUDY_ANNOUNCEMENT_COLUMN.filter((col) => 
        col.id !== 'actions' || isInstructor
      ).map((col) => ({
        ...col,
        meta: {
          ...col.meta,
          isInstructor,
          handleEdit,
          handleDelete,
        },
      })),
    [isInstructor, handleEdit, handleDelete]
  );

  const desktopTable = useTable({
    columns: desktopColumns,
    data: pageableModel?.content ?? [],
    pageState: [0, () => {}],
    totalPages: pageableModel?.totalPages ?? 0,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  const mobileTable = useTable({
    columns: mobileColumns,
    data: pageableModel?.content ?? [],
    pageState: [0, () => {}],
    totalPages: pageableModel?.totalPages ?? 0,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {/* 데스크톱 뷰 */}
      <div className="hidden w-full md:block">
        <CommonTableHead table={desktopTable} className="border-b border-b-gray-200" />
        <CommonTableBody
          table={desktopTable}
          onClick={function (row: Row<AnnouncementSummary>): void {
            const id = row.original.announcementId;
            if (!id) {
              return;
            }
            router.push(`/announcement/${id}`);
          }}
        />
      </div>

      {/* 모바일 뷰 */}
      <div className="block w-full md:hidden">
        <CommonTableBody
          table={mobileTable}
          gapPx={0}
          onClick={function (row: Row<AnnouncementSummary>): void {
            const id = row.original.announcementId;
            if (!id) {
              return;
            }
            router.push(`/announcement/${id}`);
          }}
        />
      </div>

      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
