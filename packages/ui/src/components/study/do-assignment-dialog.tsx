'use client';

import { Assignment } from '@hiarc-platform/shared';
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
import Image from 'next/image';

interface DoAssignmentDialogProps {
  lectureRound: number;
  studyId: number;
  lectureId: number;
  assignment?: Assignment;
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
    assignment?.practiceProblemUrl && isValidUrl(assignment.practiceProblemUrl);
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader className="w-full items-start">
          <DialogTitle>[{lectureRound}회차] 과제</DialogTitle>
        </DialogHeader>
        <div className="mt-6 flex justify-between">
          <Label size="lg">필수 문제</Label>
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
            <Label size="md">백준 바로가기</Label>
            {isRequiredProblemValid && (
              <Image
                src="/shared-assets/Open.svg"
                alt="external-link"
                width={16}
                height={16}
                className="ml-1"
              />
            )}
          </Button>
        </div>

        <div className="mt-6 flex justify-between">
          <Label size="lg">연습 문제</Label>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => {
              if (isPracticeProblemValid) {
                window.open(assignment.practiceProblemUrl, '_blank');
              }
            }}
            disabled={!isPracticeProblemValid}
          >
            <Label size="md">백준 바로가기</Label>
            {isPracticeProblemValid && (
              <Image
                src="/shared-assets/Open.svg"
                alt="external-link"
                width={16}
                height={16}
                className="ml-1"
              />
            )}
          </Button>
        </div>

        <DialogFooter className="mt-6 flex flex-row">
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
