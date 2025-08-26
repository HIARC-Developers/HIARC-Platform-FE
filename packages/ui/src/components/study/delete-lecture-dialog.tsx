'use client';

import { Button } from '../button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter, DialogDescription } from '../dialog/dialog';

interface DeleteLectureDialogProps {
  onComplete(): void;
}

export function DeleteLectureDialog({ onComplete }: DeleteLectureDialogProps): React.ReactElement {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>강의 삭제</DialogTitle>
          <DialogDescription>정말로 이 강의를 삭제하시겠습니까?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" size="sm" className="w-full">
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="fill"
              size="sm"
              className="w-full"
              onClick={onComplete}
            >
              삭제
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}