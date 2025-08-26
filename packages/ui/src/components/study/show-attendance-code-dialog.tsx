'use client';

import React from 'react';
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

interface ShowAttendanceCodeDialogProps {
  studyId: number;
  lectureId: number;
  studyName?: string;
  round?: number;
  lectureName?: string;
  attendanceCode?: string;
  isLoading?: boolean;
  error?: Error | null;
  fetchAttendanceCode?(): void;
}

export function ShowAttendanceCodeDialog({
  studyName,
  round,
  lectureName,
  attendanceCode,
  isLoading,
  error,
  fetchAttendanceCode,
}: ShowAttendanceCodeDialogProps): React.ReactElement {
  // 다이얼로그가 열릴 때 출석 코드를 패칭
  React.useEffect(() => {
    fetchAttendanceCode?.();
  }, [fetchAttendanceCode]);

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출석 번호 확인</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <ol className="list-disc pl-4 pt-2 text-sm text-gray-600">
            <li>
              <Label size="lg">{studyName || '스터디명'}</Label>
            </li>
            <li>
              <Label size="lg">
                {round}주차 : {lectureName || '강의명'}
              </Label>
            </li>
          </ol>
          {isLoading && <div className="py-4 text-center">출석 번호를 불러오는 중...</div>}
          {error && (
            <div className="text-red-500 py-4 text-center">출석 번호를 불러올 수 없습니다.</div>
          )}
          {attendanceCode && !isLoading && !error && (
            <NumberInput
              className="w-full justify-center pt-6"
              length={6}
              value={attendanceCode}
              onChange={() => {}}
              disabled
            />
          )}
        </div>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button className="w-full" variant="fill" size="sm">
              확인
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
