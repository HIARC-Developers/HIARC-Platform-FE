import { DialogUtil, IconButton } from '@hiarc-platform/ui';
import { RecruitUpdateDialog } from '../recruit-modal/recruit-update-dialog';

interface RecruitSummaryProps {
  startDate?: string | null;
  endDate?: string | null;
  semesterType?: 'FIRST' | 'SECOND';
}

export function RecruitSummary({
  startDate,
  endDate,
  semesterType,
}: RecruitSummaryProps): React.ReactElement {
  return (
    <div className="flex justify-between gap-4 border-b border-t border-b-gray-200 border-t-gray-700 py-6 text-lg ">
      <div className="w-full">
        <div className="flex gap-4">
          <div className="text-gray-500">모집시작일</div>
          <div>{startDate}</div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex gap-4">
          <div className="text-gray-500">모집종료일</div>
          <div>{endDate}</div>
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex gap-4">
          <div className="text-gray-500">모집학기</div>
          <div>{semesterType === 'FIRST' ? '1학기' : '2학기'}</div>
        </div>
        <IconButton
          iconSize="lg"
          size="sm"
          type="button"
          iconSrc="/shared-assets/Edit.svg"
          onClick={() => {
            DialogUtil.showComponent(
              <RecruitUpdateDialog startDate={startDate} endDate={endDate} />
            );
          }}
        />
      </div>
    </div>
  );
}
