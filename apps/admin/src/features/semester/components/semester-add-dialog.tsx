'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
  LabeledSelectButton,
} from '@hiarc-platform/ui';
import React from 'react';
import { NumberInput } from '../../../../../../packages/ui/src/components/input/number-input';
import { useCreateSemester } from '../hooks/use-create-semester';

export function SemesterAddDialog(): React.ReactElement {
  const [year, setYear] = React.useState<string>('');
  const [semesterType, setSemesterType] = React.useState<string>('');
  const createSemesterMutation = useCreateSemester();

  // 모든 필수 값이 입력되었는지 확인
  const isFormValid = year.trim() !== '' && year.length === 4 && semesterType !== '';

  const handleConfirm = (): void => {
    if (!isFormValid) {
      return;
    }

    createSemesterMutation.mutate({
      semesterYear: Number(year),
      semesterType: semesterType as 'FIRST' | 'SECOND',
    });
  };

  const handleCancel = (): void => {
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="max-w-full sm:max-w-md">
        <div className="flex flex-col">
          <DialogHeader className="text-center">
            <DialogTitle>학기 추가하기</DialogTitle>
          </DialogHeader>
          <Label className="mt-6" size="md" weight="medium">
            연도
          </Label>
          <NumberInput
            className="w-full justify-center"
            length={4}
            value={year}
            onChange={setYear}
          />
          <LabeledSelectButton
            className="mt-6"
            label={'학기'}
            options={[
              { value: 'FIRST', label: '1학기' },
              { value: 'SECOND', label: '2학기' },
            ]}
            value={semesterType}
            onChange={setSemesterType}
          />
          <Label className="mt-6 w-full text-center" size="md" weight="medium">
            학기는 한 번 생성하면 삭제할 수 없습니다. 반드시 확인 후 생성하세요.
          </Label>
          <Label className="w-full text-center" size="md" weight="medium">
            (삭제가 꼭 필요할 경우, 개발팀에 문의해 주세요.)
          </Label>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={handleCancel} className="w-full">
              취소
            </Button>
            <Button
              onClick={handleConfirm}
              className="w-full"
              disabled={!isFormValid || createSemesterMutation.isPending}
            >
              {createSemesterMutation.isPending ? '생성 중...' : '생성하기'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
