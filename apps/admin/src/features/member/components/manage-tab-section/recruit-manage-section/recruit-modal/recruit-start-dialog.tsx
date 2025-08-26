'use client';

import { useStartRecruitment } from '@/features/recruitment/hooks/mutation/use-start-recruitment';
import { useUpdateRecruitment } from '@/features/recruitment/hooks/mutation/use-update-recruitment';
import { useSelectedSemester } from '@/shared/hooks/use-semester-store';
import { UpdateRecruitmentRequest } from '@hiarc-platform/shared';
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

interface RecruitStartDialogProps {
  isRecruit?: boolean;
  onCancel?(): void;
  showBackground?: boolean;
}

export function RecruitStartDialog({
  isRecruit = false,
  onCancel,
  showBackground = true,
}: RecruitStartDialogProps): React.ReactElement {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const { selectedSemesterId } = useSelectedSemester();
  const { mutate: startRecruitment } = useStartRecruitment();

  const handleStartRecruit = async (): Promise<void> => {
    try {
      if (startDate && endDate) {
        startRecruitment(Number(selectedSemesterId));

        DialogUtil.hideAllDialogs();
      } else {
        alert('모집 시작일과 모집 종료일을 입력해주세요');
      }
    } catch (error) {
      console.error('저장 실패:', error);
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
        className="fixed left-1/2 top-1/2 !w-[540px] !max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-visible"
        showBackground={showBackground}
      >
        <DialogHeader>
          <DialogTitle className="w-full">학회원 모집 관리</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 w-[482px]">
          <LabeledCalanderInput
            placeholder="시작일을 선택해주세요"
            rangeMode={false}
            label="모집 시작일"
            value={startDate}
            onChange={(value) => {
              setStartDate(value as Date | null);
            }}
          />
          <LabeledCalanderInput
            className="mt-2"
            placeholder="종료일을 선택해주세요"
            rangeMode={false}
            label="모집 종료일"
            value={endDate}
            onChange={(value) => {
              setEndDate(value as Date | null);
            }}
          />
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
            <Label size="lg">취소</Label>
          </Button>
          {!isRecruit && (
            <Button className="w-full" size="lg" onClick={handleStartRecruit}>
              <Label size="lg">모집 시작하기</Label>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
