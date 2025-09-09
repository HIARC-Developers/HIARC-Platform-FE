'use client';

import { useState } from 'react';
import { Button } from '../button';
import { NumberInput } from '../input/number-input';
import { Label } from '../label/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '../dialog/dialog';

interface AttendanceCheckDialogProps {
  studyName: string;
  lectureName: string;
  round: number;
  onCheckAttendance?(attendanceCode: string): void;
}

export function AttendanceCheckDialog({
  onCheckAttendance,
  studyName,
  lectureName,
  round,
}: AttendanceCheckDialogProps): React.ReactElement {
  const [inputValue, setInputValue] = useState('');

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출석 체크</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <ol className="list-disc pl-4 pt-2 text-sm text-gray-600">
            <li>
              <Label size="lg">{studyName}</Label>
            </li>
            <li>
              <Label size="lg">
                {round}주차 : {lectureName}
              </Label>
            </li>
          </ol>
          <NumberInput
            className="w-full justify-center pt-6"
            length={6}
            value={inputValue}
            onChange={(value: string) => setInputValue(value)}
          />
        </div>
        <DialogFooter className="mt-6 flex flex-row gap-2">
          <DialogClose asChild>
            <Button variant="secondary" size="sm" className="w-full">
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="w-full"
              variant="fill"
              size="sm"
              onClick={() => {
                onCheckAttendance?.(inputValue);
              }}
            >
              출석하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
