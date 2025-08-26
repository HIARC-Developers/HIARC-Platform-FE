import { cn, DialogUtil, IconButton, Label, Title } from '@hiarc-platform/ui';
import React from 'react';
import { AwardListItem } from './award-list-item';
import { AwardDialog } from './award-dialog';
import { Award } from '@hiarc-platform/shared';

interface AwardSectionProps {
  isMe?: boolean;
  awardList?: Award[];
  className?: string;
}

export function AwardSection({
  isMe,
  awardList,
  className,
}: AwardSectionProps): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(<AwardDialog />, {
      showBackground: false,
    });
  };

  console.log('Award List:', awardList);

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <div className="flex items-center justify-between">
        <Title size="sm" weight="bold">
          참여한 대회
        </Title>
        {isMe && (
          <IconButton type="button" iconSrc="/shared-assets/Edit.svg" onClick={handleOpenDialog} />
        )}
      </div>

      {!awardList || awardList.length === 0 ? (
        <Label className="py-20 text-center">대회 정보가 없어요</Label>
      ) : (
        awardList.map((award) => <AwardListItem key={award.awardId} award={award} />)
      )}
    </div>
  );
}
