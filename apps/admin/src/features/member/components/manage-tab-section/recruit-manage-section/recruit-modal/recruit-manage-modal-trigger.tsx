'use client';
import { IconButton, DialogUtil } from '@hiarc-platform/ui';
import React from 'react';
import { RecruitManageDialog } from './recruit-manage-dialog';

export function RecruitManageModalTrigger(): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <RecruitManageDialog
        onSave={async () => {
          console.log('Recruit manage dialog saved');
        }}
        onCancel={() => {
          console.log('Recruit manage dialog cancelled');
        }}
      />
    );
  };

  return (
    <IconButton 
      iconSize="lg" 
      size="sm" 
      type="button" 
      iconSrc="/shared-assets/Edit.svg" 
      onClick={handleOpenDialog}
    />
  );
}
