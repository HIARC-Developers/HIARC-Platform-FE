import { Label, IconButton, DialogUtil } from '@hiarc-platform/ui';
import { ColumnDef } from '@tanstack/react-table';
import { EditCompetitionDialog } from '../update-award-dialog';
import { useDeleteAward } from '../../hooks/use-delete-award';
import { Award } from '@hiarc-platform/shared';
import { DateUtil } from '@hiarc-platform/shared';

export const useAwardListColumns = (): Array<ColumnDef<Award>> => {
  const deleteAwardMutation = useDeleteAward();

  const handleDeleteAward = async (award: Award): Promise<void> => {
    if (!award.awardId) {
      DialogUtil.showError('수상 ID가 없습니다.');
      return;
    }

    DialogUtil.showConfirm('수상 기록을 삭제하시겠습니까?', async () => {
      try {
        await deleteAwardMutation.mutateAsync(award.awardId!);
        DialogUtil.showSuccess('수상 기록이 성공적으로 삭제되었습니다.');
      } catch (error) {
        console.error('수상 기록 삭제 실패:', error);
        DialogUtil.showError('수상 기록 삭제에 실패했습니다.');
      }
    });
  };

  return [
    {
      id: 'author',
      accessorKey: 'author',
      enableSorting: false,
      size: 150,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          작성자
        </Label>
      ),
      cell: ({ row }: { row: { original: Award } }) => (
        <Label size="md" weight="regular">
          {row.original.isOfficial ? '운영진' : '학회원'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'name',
      accessorKey: 'name',
      enableSorting: false,
      size: 150,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          {'이름(핸들명)'}
        </Label>
      ),
      cell: ({ row }: { row: { original: Award } }) => (
        <Label size="md" weight="regular">
          {row.original.memberName ?? '-'}({row.original.bojHandle ?? '-'})
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'organization',
      accessorKey: 'organization',
      enableSorting: false,
      size: 0,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          {'주체(단체)명'}
        </Label>
      ),
      cell: ({ row }: { row: { original: Award } }) => (
        <Label size="md" weight="regular">
          {row.original.organization ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'competitionName',
      accessorKey: 'competitionName',
      enableSorting: false,
      size: 0,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          대회명
        </Label>
      ),
      cell: ({ row }: { row: { original: Award } }) => (
        <Label size="md" weight="regular">
          {row.original.awardName ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'award',
      accessorKey: 'award',
      enableSorting: false,
      size: 0,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          수상
        </Label>
      ),
      cell: ({ row }: { row: { original: Award } }) => (
        <Label size="md" weight="regular">
          {row.original.awardDetail ?? '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'date',
      accessorKey: 'date',
      size: 100,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          진행일
        </Label>
      ),
      cell: ({ row }: { row: { original: Award } }) => (
        <Label size="sm" weight="regular" className="text-gray-700">
          {row.original.awardDate ? DateUtil.formatDateWithDots(row.original.awardDate) : '-'}
        </Label>
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'edit',
      accessorKey: 'edit',
      size: 56,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          수정
        </Label>
      ),
      cell: ({ row }: { row: { original: Award } }) => (
        <IconButton
          className="relative z-10 w-full"
          iconSrc="/shared-assets/Edit.svg"
          size="sm"
          onClick={(event) => {
            event.stopPropagation();
            DialogUtil.showComponent(<EditCompetitionDialog award={row.original} />);
          }}
        />
      ),
      footer: (props) => props.column.id,
    },
    {
      id: 'delete',
      accessorKey: 'delete',
      size: 56,
      meta: {
        headAlign: 'center',
        bodyAlign: 'center',
      },
      header: () => (
        <Label size="md" weight="bold">
          삭제
        </Label>
      ),
      cell: ({ row }: { row: { original: Award } }) => (
        <IconButton
          className="relative z-10 w-full"
          iconSrc="/shared-assets/Delete.svg"
          size="sm"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteAward(row.original);
          }}
          disabled={deleteAwardMutation.isPending}
        />
      ),
      footer: (props) => props.column.id,
    },
  ];
};
