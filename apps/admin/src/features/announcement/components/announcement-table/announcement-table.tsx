import { cn, CommonTableBody, CommonTableHead, Pagination, SlideFade } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/shared';
import { Announcement, AnnouncementSummary, PageableModel } from '@hiarc-platform/shared';
import { Row } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import {
  getAdminAnnouncementListColumn,
  getMobileAdminAnnouncementListColumn,
} from './announcement-list-column';
import { useDeleteAdminAnnouncement } from '../../hooks/use-delete-admin-announcement';

interface AdminAnnouncementTableProps {
  pageableModel?: PageableModel<AnnouncementSummary> | null;
  className?: string;
  onPageChange?(page: number): void;
  studyId?: number;
  semesterId?: number;
}

export function AnnouncementTable({
  pageableModel,
  className,
  onPageChange,
  studyId,
  semesterId,
}: AdminAnnouncementTableProps): React.ReactElement {
  const router = useRouter();
  const { mutate: deleteAnnouncement } = useDeleteAdminAnnouncement();

  const handleDelete = useCallback(
    (id: number, options?: { onSuccess?(): void; onError?(error: unknown): void }): void => {
      deleteAnnouncement(id, {
        onSuccess: () => {
          options?.onSuccess?.();
        },
        onError: (error) => {
          options?.onError?.(error);
        },
      });
    },
    [deleteAnnouncement]
  );

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

  const desktopColumns = useMemo(
    () => getAdminAnnouncementListColumn(handleDelete, handleEdit),
    [handleEdit, handleDelete]
  );
  const mobileColumns = useMemo(
    () => getMobileAdminAnnouncementListColumn(handleDelete, handleEdit),
    [handleEdit, handleDelete]
  );
  const [globalFilter, setGlobalFilter] = useState('');
  const [page, setPage] = useState(0);

  const data = pageableModel?.content ?? [];
  const totalPages = pageableModel?.totalPages ?? 0;

  const desktopTable = useTable({
    columns: desktopColumns,
    data,
    pageState: [page, setPage],
    totalPages,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  const mobileTable = useTable({
    columns: mobileColumns,
    data,
    pageState: [page, setPage],
    totalPages,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {/* 데스크톱 뷰 */}
      <SlideFade key="desktop-table" className="hidden w-full md:block">
        <CommonTableHead className="text-gray-900" table={desktopTable} />
        <CommonTableBody
          table={desktopTable}
          onClick={function (row: Row<Announcement>): void {
            const announcementId = row.original.announcementId;

            if (announcementId !== undefined) {
              router.push(`/announcement/${announcementId}`);
            }
          }}
        />
      </SlideFade>

      {/* 모바일 뷰 */}
      <SlideFade key="mobile-table" className="block w-full md:hidden">
        <CommonTableBody
          gapPx={0}
          table={mobileTable}
          onClick={function (row: Row<AnnouncementSummary>): void {
            const announcementId = row.original.announcementId;
            if (announcementId !== undefined) {
              router.push(`/announcement/${announcementId}`);
            }
          }}
        />
      </SlideFade>

      {/* PageableModel 기반 Pagination */}
      {pageableModel && onPageChange && (
        <div className="flex w-full justify-center">
          <Pagination className="mt-8" pageableModel={pageableModel} onPageChange={onPageChange} />
        </div>
      )}
    </div>
  );
}
