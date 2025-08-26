import { DialogUtil } from '@hiarc-platform/ui';
import React from 'react';
import { RecruitCompleteDialog } from './recruit-complete-dialog';

export function RecruitCompleteModalTrigger(): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <RecruitCompleteDialog />
    );
  };

  return (
    <div
      className="cursor-pointer rounded-md px-3 py-2 text-md hover:bg-gray-100"
      onClick={handleOpenDialog}
    >
      학회 가입 완료
    </div>
  );
}
