'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
  Button,
  LabeledCalanderInput,
} from '@hiarc-platform/ui';
import React from 'react';

interface RecruitManageDialogProps {
  onSave?(): Promise<void>;
  onCancel?(): void;
  showBackground?: boolean;
}

export function RecruitManageDialog({
  onSave,
  onCancel,
  showBackground = true,
}: RecruitManageDialogProps): React.ReactElement {
  const [recruitPeriod, setRecruitPeriod] = React.useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleSave = async (): Promise<void> => {
    try {
      alert('변경이 완료되었습니다');
      if (onSave) {
        await onSave();
      }
      DialogUtil.hideAllDialogs();
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent
        onOpenAutoFocus={(ev) => ev.preventDefault()}
        className="relative !w-[540px] !max-w-[540px] overflow-visible"
        showBackground={showBackground}
      >
        <DialogHeader>
          <DialogTitle className="w-full">학회원 모집 관리</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 w-[482px]">
          <LabeledCalanderInput
            placeholder="기간을 선택해주세요"
            rangeMode={true}
            label="모집 기간"
            value={recruitPeriod}
            onChange={(value) => {
              if (Array.isArray(value)) {
                setRecruitPeriod(value);
              }
            }}
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
