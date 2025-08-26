'use client';
import { Admin } from '@hiarc-platform/shared';
import { cn, CommonTableBody, CommonTableHead, DialogUtil, SlideFade } from '@hiarc-platform/ui';
import { useTable } from '@hiarc-platform/util';
import { useCallback, useMemo, useState } from 'react';
import { useSelectedSemester } from '@/shared/hooks/use-semester-store';
import { createAdminColumns } from './columns';
import { useDeleteAdmin } from '../../hooks';

interface AdminTableSectionProps {
  adminData: Admin[];
  className?: string;
}

export function AdminTable({ adminData, className }: AdminTableSectionProps): React.ReactElement {
  const deleteAdminMutation = useDeleteAdmin();
  const { selectedSemesterId } = useSelectedSemester();
  const [globalFilter, setGlobalFilter] = useState('');

  const handleDeleteAdmin = useCallback(
    async (admin: Admin): Promise<void> => {
      if (!selectedSemesterId) {
        alert('학기를 선택해주세요.');
        return;
      }

      DialogUtil.showConfirm(
        `${admin.memberName}님의 관리자 권한을 삭제하시겠습니까?`,
        async () => {
          try {
            await deleteAdminMutation.mutateAsync({
              memberId: admin.memberId,
              semesterId: Number(selectedSemesterId),
            });
          } catch (error) {
            console.error('삭제 실패:', error);
          }
        }
      );
    },
    [selectedSemesterId, deleteAdminMutation]
  );

  const columns = useMemo(
    () =>
      createAdminColumns({
        onDelete: handleDeleteAdmin,
        isDeleting: deleteAdminMutation.isPending,
      }),
    [deleteAdminMutation.isPending, handleDeleteAdmin]
  );

  const table = useTable({
    columns,
    data: adminData,
    pageState: [0, () => {}],
    totalPages: 10,
    globalFilterState: [globalFilter, setGlobalFilter],
  });

  return (
    <div className={cn('w-full flex-col items-center', className)}>
      <SlideFade key="table" className="w-full">
        <CommonTableHead table={table} className="bg-gray-100" />
        <CommonTableBody table={table} onClick={function (): void {}} />
      </SlideFade>
    </div>
  );
}
