import { DialogUtil } from '@hiarc-platform/ui';
import React from 'react';
import { RecruitInformationDialog } from './recruit-information-dialog';

export function RecruitInfromationModalTrigger(): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <RecruitInformationDialog />
    );
  };

  return (
    <div 
      className="cursor-pointer rounded-md px-3 py-2 text-md hover:bg-gray-100"
      onClick={handleOpenDialog}
    >
      안내사항
    </div>
  );
}
