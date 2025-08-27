import {
  cn,
  Divider,
  IconButton,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  DialogUtil,
} from '@hiarc-platform/ui';
import React from 'react';

import { EditAwardDialog } from './edit-award-dialog';
import { Award } from '@hiarc-platform/shared';
import { formatDateWithDots } from '@hiarc-platform/util';
import useDeleteAward from '@/features/award/hooks/mutation/use-delete-award';

interface AwardListItemProps {
  award: Award;
}

export function AwardListItem({ award }: AwardListItemProps): React.ReactElement {
  const deleteAwardMutation = useDeleteAward();

  const handleEdit = (): void => {
    DialogUtil.showComponent(
      <EditAwardDialog
        award={award}
        onSave={() => {}}
        onCancel={() => {
        }}
      />
    );
  };

  const handleDelete = async (): Promise<void> => {
    DialogUtil.showConfirm(
      '이 대회 기록을 삭제하시겠습니까?\n삭제된 기록은 복구할 수 없습니다.',
      () => {
        deleteAwardMutation.mutateAsync(award.awardId ?? 0);
      },
      () => {},
      {
        title: '대회 기록 삭제',
        confirmText: '삭제',
        cancelText: '취소',
      }
    );
  };
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between',
        'border-b border-gray-200',
        'gap-4 py-4'
      )}
    >
      <div className="flex w-full flex-col">
        <Label size="sm" className="text-gray-500">
          {formatDateWithDots(award.awardDate ?? '') ?? '날짜 미등록'}
        </Label>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-row items-center gap-2">
            {award.organization && (
              <div className="flex flex-row items-center gap-2">
                <Label size="lg">{award.organization}</Label>
                <Divider variant="vertical" size="10px" />
              </div>
            )}
            <Label size="lg">{award.awardDetail || '대회 참여'}</Label>
          </div>
          <Label size="lg" weight="bold">
            {award.awardName || '참여'}
          </Label>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <IconButton type="button" iconSrc="/shared-assets/More.svg" />
        </PopoverTrigger>
        <PopoverContent align="end">
          <button
            className="flex h-10 w-24 items-center rounded-sm transition-colors hover:bg-gray-100"
            onClick={handleEdit}
            disabled={deleteAwardMutation.isPending}
          >
            <Label className="ml-3">수정</Label>
          </button>
          <button
            className="flex h-10 w-24 items-center rounded-sm transition-colors hover:bg-gray-100"
            onClick={handleDelete}
            disabled={deleteAwardMutation.isPending}
          >
            <Label className="ml-3">{deleteAwardMutation.isPending ? '삭제 중...' : '삭제'}</Label>
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
