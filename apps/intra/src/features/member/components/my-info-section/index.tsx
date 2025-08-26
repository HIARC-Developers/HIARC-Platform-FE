import {
  cn,
  DialogUtil,
  IconButton,
  Label,
  RatingChip,
  RatingChipProps,
  Title,
} from '@hiarc-platform/ui';
import React from 'react';
import { MyInfoDialog } from './my-info-dialog';

interface MyInfoSectionProps {
  name?: string | null;
  bojHandle?: string | null;
  introduction?: string | null;
  rating?: RatingChipProps['rating'];
  div?: RatingChipProps['rating'];
  className?: string;
  isMe?: boolean;
  onSave?(introduction: string): Promise<void>;
}

export function MyInfoSection({
  className,
  introduction,
  name,
  bojHandle,
  onSave,
  rating,
  div,
  isMe,
}: MyInfoSectionProps): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <MyInfoDialog
        initialValue={introduction || ''}
        onSave={onSave}
        onCancel={() => {
          console.log('My info dialog cancelled');
        }}
      />
    );
  };

  return (
    <div className={cn('flex w-full flex-col gap-4 ', className)}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full justify-between">
          <div className="flex w-full items-center gap-2">
            <Title size="sm" weight="bold" disableAnimation={true}>
              {bojHandle}
            </Title>
            <Title size="sm" weight="semibold" disableAnimation={true} className="text-gray-500">
              ({name})
            </Title>
            <RatingChip rating={rating} />
            <RatingChip rating={div} />
          </div>
          {isMe && (
            <IconButton
              type="button"
              iconSrc="/shared-assets/Edit.svg"
              onClick={handleOpenDialog}
            />
          )}
        </div>
        <Label className={cn(!introduction ? 'text-gray-500' : 'text-gray-900')}>
          {introduction ?? '자기소개가 없습니다.'}
        </Label>
      </div>
    </div>
  );
}
