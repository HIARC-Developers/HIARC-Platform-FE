'use client';

import { useState, useEffect } from 'react';
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
import { LabeledInput } from '../input/labeled-input';
import { Assignment } from '@hiarc-platform/shared';
import { Label } from '../label/label';
import { DialogUtil } from '../../utils/dialog-util';

interface CreateAssignmentDialogProps {
  studyId?: number;
  round?: number;
  isUpdate?: boolean;
  assignment?: Assignment;
  isLoading?: boolean;
  error?: Error | null;
  fetchAssignment?(): void;
  onComplete(): void;
  onCreateAssignment?(data: {
    requiredProblemUrl: string;
    practiceProblemUrl: string;
    minProblemCount: number;
  }): void;
  onUpdateAssignment?(data: {
    requiredProblemUrl: string;
    practiceProblemUrl: string;
    minProblemCount: number;
  }): void;
  onCheckAssignment?(studyId: number, round: number): void;
}

export function CreateAssignmentDialog({
  studyId,
  round,
  isUpdate = false,
  assignment,
  isLoading,
  error,
  fetchAssignment,
  onComplete,
  onCreateAssignment,
  onUpdateAssignment,
  onCheckAssignment,
}: CreateAssignmentDialogProps): React.ReactElement {
  const [requiredProblemUrl, setRequiredProblemUrl] = useState('');
  const [practiceProblemUrl, setPracticeProblemUrl] = useState('');
  const [minProblemCount, setMinProblemCount] = useState('');

  // 업데이트 모드일 때 데이터 패칭
  useEffect(() => {
    if (isUpdate && !assignment && !isLoading && !error) {
      fetchAssignment?.();
    }
  }, [isUpdate, fetchAssignment, assignment, isLoading, error]);

  // 업데이트 모드일 때 assignment 데이터로 폼 초기화
  useEffect(() => {
    if (isUpdate && assignment && !isLoading) {
      setRequiredProblemUrl(assignment.requiredProblemUrl || '');
      setPracticeProblemUrl(assignment.practiceProblemUrl || '');
      setMinProblemCount(assignment.minProblemCount?.toString() || '');
    }
  }, [isUpdate, assignment, isLoading]);

  const isAllFieldsFilled =
    requiredProblemUrl.trim() && practiceProblemUrl.trim() && minProblemCount.trim();

  const isDisabled = isUpdate && assignment && assignment.isUpdatable === false;

  // 초기 데이터와 현재 데이터가 같은지 확인
  const isDataUnchanged =
    isUpdate &&
    assignment &&
    requiredProblemUrl === (assignment.requiredProblemUrl || '') &&
    practiceProblemUrl === (assignment.practiceProblemUrl || '') &&
    minProblemCount === (assignment.minProblemCount?.toString() || '');

  const handleSubmit = (): void => {
    const data = {
      requiredProblemUrl,
      practiceProblemUrl,
      minProblemCount: Number(minProblemCount) || 0,
    };

    if (isUpdate) {
      onUpdateAssignment?.(data);
    } else {
      onCreateAssignment?.(data);
    }
    onComplete();
  };

  const handleCheckAssignment = async (): Promise<void> => {
    if (!studyId || !round) {
      return;
    }

    const message = isDisabled
      ? '과제를 채점하시겠습니까?'
      : '과제 채점을 하면 과제 수정이 불가능해집니다.\n\n과제 채점을 진행하시겠습니까?';

    const confirmed = await DialogUtil.confirm(message, {
      title: '과제 채점 확인',
      confirmText: '확인',
      cancelText: '취소',
    });

    if (confirmed) {
      DialogUtil.hideAllDialogs();
      onCheckAssignment?.(studyId, round);
    }
  };

  return (
    <Dialog defaultOpen>
      <DialogContent fullscreen className="flex max-h-screen flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{isUpdate ? '과제 수정' : '과제 등록'}</DialogTitle>
        </DialogHeader>
        <div className={`flex-1 overflow-y-auto ${isUpdate ? 'pb-40' : 'pb-20'} md:pb-0`}>
          <DialogDescription className="pt-2 text-left text-sm text-gray-700">
            <br />
            <Label size="lg">과제 완료 조건</Label>
            <br />
            <li className="ml-4 list-disc">
              <Label size="lg">필수 문제: 모두 풀어야 합니다.</Label>
            </li>
            <li className="ml-4 list-disc">
              <Label size="lg">연습 문제: 설정한 개수 이상 풀어야 합니다.</Label>
            </li>
            <Label size="lg">→ 두 조건을 모두 만족해야 과제가 완료로 처리됩니다.</Label>
            <br />
            <br />
            <Label size="lg">
              [BOJ 과제 결과 가져오기] 버튼을 클릭하면 BOJ에서 문제 풀이 결과를 불러옵니다. 여러 번
              실행할 수 있으나, 버튼 실행 이후에는 URL 및 문제 수 수정이 불가능 합니다.
            </Label>
          </DialogDescription>
          <div className="mt-6" />

          {isUpdate && isLoading && (
            <div className="py-4 text-center">과제 정보를 불러오는 중...</div>
          )}

          {isUpdate && error && (
            <div className="text-red-500 py-4 text-center">과제 정보를 불러올 수 없습니다.</div>
          )}

          {(!isUpdate || (assignment && !isLoading && !error)) && (
            <>
              <LabeledInput
                className="mb-6"
                label="필수 문제 URL"
                placeholder="ex. https://www.acmicpc.net/group/practice/view/20429/9"
                value={requiredProblemUrl}
                onChange={(value) => setRequiredProblemUrl(value)}
                disabled={isDisabled}
              />
              <LabeledInput
                className="mb-6"
                label="연습 문제 URL"
                placeholder="ex. https://www.acmicpc.net/group/practice/view/20429/9"
                value={practiceProblemUrl}
                onChange={(value) => setPracticeProblemUrl(value)}
                disabled={isDisabled}
              />
              <LabeledInput
                className="mb-6"
                label="연습 문제 중 몇 문제를 풀어야 과제 완료로 인정할까요?"
                placeholder="최소 문제 수를 입력해주세요. (예: 3)"
                value={minProblemCount}
                onChange={(value) => setMinProblemCount(value)}
                disabled={isDisabled}
              />
              {isUpdate && isDataUnchanged && isAllFieldsFilled && (
                <div className="mb-6 hidden md:block">
                  <Button
                    className="w-full bg-primary-200"
                    variant="fill"
                    size="md"
                    onClick={handleCheckAssignment}
                  >
                    BOJ 과제 결과 가져오기
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <DialogFooter className="hidden flex-shrink-0 flex-row md:flex">
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
              onClick={handleSubmit}
              disabled={isUpdate && (isLoading || Boolean(error) || isDisabled)}
            >
              {isUpdate ? '수정' : '등록'}
            </Button>
          </DialogClose>
        </DialogFooter>

        {/* 모바일 하단 버튼들 */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white p-4 md:hidden">
          {isUpdate && isDataUnchanged && isAllFieldsFilled && (
            <div className="mb-4">
              <Button
                className="w-full bg-primary-200"
                variant="fill"
                size="lg"
                onClick={handleCheckAssignment}
              >
                BOJ 과제 결과 가져오기
              </Button>
            </div>
          )}
          <div className="flex gap-3">
            <DialogClose asChild>
              <Button variant="secondary" size="lg" className="w-full">
                취소
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="w-full"
                variant="fill"
                size="lg"
                onClick={handleSubmit}
                disabled={isUpdate && (isLoading || Boolean(error) || isDisabled)}
              >
                {isUpdate ? '수정' : '등록'}
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
