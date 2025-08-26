'use client';
import { Button, DialogUtil } from '@hiarc-platform/ui';
import React from 'react';
import { RecruitStartDialog } from './recruit-start-dialog';

export function RecruitStartModalTrigger(): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(<RecruitStartDialog />);
  };

  return (
    <Button className="w-full" onClick={handleOpenDialog}>
      모집 시작하기
    </Button>
  );
}
