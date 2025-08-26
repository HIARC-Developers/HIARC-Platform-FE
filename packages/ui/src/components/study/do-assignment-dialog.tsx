'use client';

import { Button } from '../button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '../dialog/dialog';
import { Label } from '../label/label';

interface DoAssignmentDialogProps {
  lectureRound: number;
  studyId: number;
  lectureId: number;
  assignment: any; // Assignment 타입이 UI 패키지에서 접근할 수 없으므로 any로 처리
  isLoading?: boolean;
}

export function DoAssignmentDialog({
  lectureRound,
  assignment,
}: DoAssignmentDialogProps): React.ReactElement {
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isRequiredProblemValid =
    assignment?.requiredProblemUrl && isValidUrl(assignment.requiredProblemUrl);
  const isPracticeProblemValid =
    assignment?.practiceProblems?.url && isValidUrl(assignment.practiceProblems.url);
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>[{lectureRound}회차] 과제</DialogTitle>
        </DialogHeader>
        <div className="mt-6 flex justify-between">
          <Label>필수 문제</Label>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => {
              if (isRequiredProblemValid) {
                window.open(assignment.requiredProblemUrl, '_blank');
              }
            }}
            disabled={!isRequiredProblemValid}
          >
            <Label>백준 바로가기</Label>
          </Button>
        </div>

        <div className="mt-6 flex justify-between">
          <Label>연습 문제</Label>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => {
              if (isPracticeProblemValid) {
                window.open(assignment.practiceProblems.url, '_blank');
              }
            }}
            disabled={!isPracticeProblemValid}
          >
            <Label>백준 바로가기</Label>
          </Button>
        </div>

        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="secondary" size="sm" className="w-full">
              취소
            </Button>
          </DialogClose>
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
