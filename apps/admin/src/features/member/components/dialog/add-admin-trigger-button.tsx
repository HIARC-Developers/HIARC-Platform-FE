'use client';

import { Button, DialogUtil } from '@hiarc-platform/ui';
import React from 'react';
import { AddAdminDialog } from './add-admin-dialog';

export function AddAdminTriggerButton(): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(<AddAdminDialog />);
  };
  return (
    <Button size="sm" className="w-[106px]" onClick={handleOpenDialog}>
      추가하기
    </Button>
  );
}
