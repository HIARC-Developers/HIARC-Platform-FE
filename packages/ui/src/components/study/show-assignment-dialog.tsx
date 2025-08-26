'use client';

import React from 'react';
import { Button } from '../button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from '../dialog/dialog';
import { Assignment } from '@hiarc-platform/shared';

interface ShowAssignmentDialogProps {
  assignment?: Assignment;
  isLoading?: boolean;
  error?: Error | null;
  fetchAssignment?(): void;
}

export function ShowAssignmentDialog({
  assignment,
  isLoading,
  error,
  fetchAssignment,
}: ShowAssignmentDialogProps): React.ReactElement {
  // 다이얼로그가 열릴 때 과제 정보를 패칭
  React.useEffect(() => {
    fetchAssignment?.();
  }, [fetchAssignment]);

  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>과제 확인</DialogTitle>
          <DialogDescription>등록된 과제를 확인할 수 있습니다.</DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          {isLoading && <div>과제 정보를 불러오는 중...</div>}
          {error && <div className="text-red-500">과제 정보를 불러올 수 없습니다.</div>}
          {assignment && !isLoading && !error && (
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-gray-700">필수 문제 URL</div>
                <div className="text-sm text-gray-600">
                  {assignment.requiredProblemUrl || '등록된 필수 문제가 없습니다.'}
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">연습 문제 URL</div>
                <div className="text-sm text-gray-600">
                  {assignment.practiceProblemUrl || '등록된 연습 문제가 없습니다.'}
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-700">최소 문제 수</div>
                <div className="text-sm text-gray-600">{assignment.minProblemCount}문제</div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
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
