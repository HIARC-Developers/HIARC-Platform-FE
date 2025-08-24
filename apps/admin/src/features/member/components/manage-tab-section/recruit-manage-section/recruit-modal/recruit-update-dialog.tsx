'use client';

import { useUpdateRecruitment } from '@/features/recruitment/hooks/mutation/use-update-recruitment';
import { useSelectedSemester } from '@/hooks/use-semester-store';
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

interface RecruitUpdateDialogProps {
  startDate?: string | null;
  endDate?: string | null;
  onCancel?(): void;
  showBackground?: boolean;
}

export function RecruitUpdateDialog({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onCancel,
  showBackground = true,
}: RecruitUpdateDialogProps): React.ReactElement {
  const [startDate, setStartDate] = React.useState<Date | null>(
    initialStartDate ? new Date(initialStartDate) : null
  );
  const [endDate, setEndDate] = React.useState<Date | null>(
    initialEndDate ? new Date(initialEndDate) : null
  );
  const { selectedSemesterId } = useSelectedSemester();
  const { mutate: updateRecruitment } = useUpdateRecruitment();

  const handleSaveRecruit = async (): Promise<void> => {
    try {
      if (startDate && endDate) {
        const recruitmentData: UpdateRecruitmentRequest = {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };

        updateRecruitment({
          semesterId: Number(selectedSemesterId),
          data: recruitmentData,
        });

        DialogUtil.hideAllDialogs();
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
            placeholder="기간을 선택해주세요"
            rangeMode={true}
            label="모집 기간"
            value={[startDate, endDate]}
            onChange={(value) => {
              if (Array.isArray(value)) {
                const [start, end] = value as [Date | null, Date | null];
                setStartDate(start);
                setEndDate(end);
              }
            }}
          />
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
            <Label size="lg">취소</Label>
          </Button>
          <Button variant="secondary" className="w-full" size="lg" onClick={handleSaveRecruit}>
            <Label size="lg">저장하기</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
