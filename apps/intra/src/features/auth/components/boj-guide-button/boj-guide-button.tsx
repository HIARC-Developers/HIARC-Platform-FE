import { DialogUtil, Label } from '@hiarc-platform/ui';
import { BojGuideDialog } from './boj-guide-dialog';

export function BojGuideButton(): React.ReactElement {
  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(<BojGuideDialog />);
  };

  return (
    <div>
      <Label size="sm" weight="regular" className="text-gray-500">
        혹시 백준이 처음이실까요?
      </Label>
      <button
        className="ml-2 h-auto p-0 font-pretendard text-xs text-gray-900 underline"
        onClick={handleOpenDialog}
      >
        자세히 보기
      </button>
    </div>
  );
}
