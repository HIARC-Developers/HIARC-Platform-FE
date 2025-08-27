import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
  Button,
  LabeledTextarea,
} from '@hiarc-platform/ui';
import React, { useState } from 'react';
import { useSelectedSemester } from '@/shared/hooks/use-semester-store';
import { useUpdateRecruitment } from '@/features/recruitment/hooks/mutation/use-update-recruitment';

interface RecruitInformationDialogProps {
  greetingDescription?: string;
  showBackground?: boolean;
}

export function RecruitInformationDialog({
  greetingDescription,
  showBackground = true,
}: RecruitInformationDialogProps): React.ReactElement {
  const [greetingText, setGreetingText] = useState(greetingDescription);
  const { selectedSemesterId } = useSelectedSemester();
  const { mutate: updateRecruitment } = useUpdateRecruitment();
  const handleSave = async (): Promise<void> => {
    try {
      updateRecruitment({
        semesterId: Number(selectedSemesterId),
        data: {
          greetingDescription: greetingText,
        },
      });
      DialogUtil.hideAllDialogs();
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = (): void => {
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent
        onOpenAutoFocus={(ev) => ev.preventDefault()}
        className="fixed left-1/2 top-1/2 !w-[540px] !max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
        showBackground={showBackground}
      >
        <DialogHeader>
          <DialogTitle className="w-full">학회원 모집 문구 관리 - 안내사항</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 w-[482px]">
          <LabeledTextarea
            label="일반 대상"
            className="min-h-[213px]"
            value={greetingText}
            onChange={(value) => setGreetingText(value)}
          />
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
            <Label size="lg">취소</Label>
          </Button>
          <Button className="w-full" size="lg" onClick={handleSave}>
            <Label size="lg">수정하기</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
