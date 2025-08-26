import Image from 'next/image';
import {
  Button,
  DialogUtil,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hiarc-platform/ui';
import { RecruitCompleteDialog } from '../recruit-modal/recruit-complete-dialog';
import { RecruitInformationDialog } from '../recruit-modal/recruit-information-dialog';
import { useState } from 'react';

export function RecruitTextManageButton(): React.ReactElement {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" className="bg-primary-200">
          <Label size="md" weight="regular">
            모집문구 관리
          </Label>
          <Image src="/shared-assets/Down.svg" alt="down" width={11} height={7} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[190px] p-3" align="end" sideOffset={4}>
        <div className="flex flex-col gap-2">
          <button
            className="cursor-pointer rounded-md px-3 py-2 text-left text-md hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              DialogUtil.showComponent(<RecruitCompleteDialog />);
            }}
          >
            학회 가입 완료
          </button>
          <button
            className="cursor-pointer rounded-md px-3 py-2 text-left text-md hover:bg-gray-100"
            onClick={() => {
              setOpen(false);
              DialogUtil.showComponent(<RecruitInformationDialog />);
            }}
          >
            안내사항
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
