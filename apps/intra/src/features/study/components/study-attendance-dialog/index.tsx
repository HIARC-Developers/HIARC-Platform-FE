import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogUtil,
  Label,
} from '@hiarc-platform/ui';
import { NumberInput } from '@hiarc-platform/ui/src/components/input/number-input';
import React, { useState } from 'react';

import { useCheckAttendanceCode } from '../../hooks/study-member/mutation/use-check-attendance-code';
import { AttendanceableStudy } from '../../types/request/attendanceable-study';

interface StudyAttendanceDialogProps {
  data?: AttendanceableStudy;
}

export function StudyAttendanceDialog({ data }: StudyAttendanceDialogProps): React.ReactElement {
  const [attendanceCode, setAttendanceCode] = useState<string>('');
  const checkAttendanceMutation = useCheckAttendanceCode();

  const handleCancel = (): void => {
    DialogUtil.hideAllDialogs();
  };

  const handleAttendance = (): void => {
    if (!attendanceCode.trim() || !data) {
      return;
    }

    const studyId = data.studyId;
    const lectureRound = data.currentRound;

    if (!studyId || !lectureRound) {
      return;
    }

    checkAttendanceMutation.mutate({
      studyId,
      lectureRound,
      attendanceCode: attendanceCode.trim(),
    });
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent>
        <DialogTitle>출석 체크</DialogTitle>
        {data && (
          <ol className="list-disc pl-4 pt-6 text-sm text-gray-600">
            <li>
              <Label size="lg">{data.studyName}</Label>
            </li>
            <li>
              <Label size="lg">
                {data.currentRound}주차 : {data.lectureTitle}
              </Label>
            </li>
          </ol>
        )}
        <NumberInput
          className="mt-6 w-full justify-center"
          length={6}
          value={attendanceCode}
          onChange={setAttendanceCode}
        />
        <DialogFooter>
          <div className="mt-6 flex w-full flex-row gap-2">
            <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
              <Label size="lg">취소</Label>
            </Button>
            <Button
              className="w-full"
              size="lg"
              disabled={attendanceCode.length !== 6 || checkAttendanceMutation.isPending}
              onClick={handleAttendance}
            >
              <Label size="lg">
                {checkAttendanceMutation.isPending ? '출석 중...' : '출석하기'}
              </Label>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
