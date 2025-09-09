'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '../../dialog/dialog';
import { LabeledInput } from '../../input/labeled-input';
import { CreateGroupRequest, StudyGroup } from '@hiarc-platform/shared';
import Image from 'next/image';

interface HandleInput {
  id: number;
  value: string;
  isValidated: boolean;
}

interface EditGroupDialogProps {
  initialData: StudyGroup;
  onEditGroup?(group: CreateGroupRequest): void;
  onValidateHandle?(handle: string): Promise<boolean> | boolean;
}

export function EditGroupDialog({
  initialData,
  onEditGroup,
  onValidateHandle,
}: EditGroupDialogProps): React.ReactElement {
  const [groupName, setGroupName] = useState(initialData.groupName || '');
  const [handleInputs, setHandleInputs] = useState<HandleInput[]>([]);
  const [nextId, setNextId] = useState(1);

  // Initialize handle inputs from StudyGroup data
  useEffect(() => {
    if (initialData.students && initialData.students.length > 0) {
      const initialHandles = initialData.students
        .filter((student) => student.bojHandle)
        .map((student, index) => ({
          id: index + 1,
          value: student.bojHandle || '',
          isValidated: true, // Existing handles are already validated
        }));

      setHandleInputs(initialHandles);
      setNextId(initialHandles.length + 1);
    } else {
      // If no students, start with one empty input
      setHandleInputs([{ id: 1, value: '', isValidated: false }]);
      setNextId(2);
    }
  }, [initialData]);

  return (
    <Dialog defaultOpen>
      <DialogContent onOpenAutoFocus={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle>스터디 조 수정하기</DialogTitle>
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-4">
          <LabeledInput
            label="조이름"
            placeholder="예) 1조, 브론즈 조"
            value={groupName}
            onChange={setGroupName}
          />
          <div className="flex max-h-64 flex-col gap-6 overflow-y-auto">
            {handleInputs.map((handleInput, index) => (
              <div key={handleInput.id} className="flex w-full gap-2">
                <div className="flex w-full flex-col gap-2">
                  <div className="flex w-full items-end gap-2">
                    <LabeledInput
                      label="핸들명"
                      placeholder="핸들명을 입력하세요"
                      value={handleInput.value}
                      onChange={(value) => {
                        const newInputs = [...handleInputs];
                        newInputs[index] = {
                          ...handleInput,
                          value,
                          isValidated: false,
                        };
                        setHandleInputs(newInputs);
                      }}
                    />
                    {!handleInput.isValidated && (
                      <Button
                        variant="fill"
                        size="md"
                        disabled={!handleInput.value.trim()}
                        onClick={async () => {
                          if (!handleInput.value.trim()) {
                            return;
                          }

                          // Check for duplicate handles
                          const isDuplicate = handleInputs.some(
                            (input, i) =>
                              i !== index && input.value.trim() === handleInput.value.trim()
                          );

                          if (isDuplicate) {
                            alert('이미 입력된 핸들명입니다.');
                            return;
                          }

                          if (onValidateHandle) {
                            const isValid = await onValidateHandle(handleInput.value.trim());
                            if (isValid) {
                              const newInputs = [...handleInputs];
                              newInputs[index] = {
                                ...handleInput,
                                isValidated: true,
                              };
                              setHandleInputs(newInputs);
                            }
                          }
                        }}
                      >
                        인증하기
                      </Button>
                    )}
                  </div>
                </div>
                {handleInputs.length > 1 && (
                  <div
                    className="flex w-[20px] cursor-pointer items-center justify-center rounded-md bg-gray-300"
                    onClick={() => {
                      const newInputs = handleInputs.filter((_, i) => i !== index);
                      setHandleInputs(newInputs);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(ev) => {
                      if (ev.key === 'Enter' || ev.key === ' ') {
                        const newInputs = handleInputs.filter((_, i) => i !== index);
                        setHandleInputs(newInputs);
                      }
                    }}
                  >
                    <div className="h-px w-[10px] rounded-md bg-white"></div>
                  </div>
                )}
              </div>
            ))}
            <button
              className="flex items-center justify-center rounded-md border-gray-300 bg-white p-2 transition-colors duration-200 hover:bg-gray-50"
              onClick={() => {
                setHandleInputs([...handleInputs, { id: nextId, value: '', isValidated: false }]);
                setNextId(nextId + 1);
              }}
            >
              <div className="relative flex h-6 w-6 items-center justify-center">
                <Image src="/shared-assets/PlusButton.svg" alt="add" width={24} height={24} />
              </div>
            </button>
          </div>
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
              disabled={
                !groupName.trim() ||
                !handleInputs.every((handle) => handle.value.trim() && handle.isValidated)
              }
              onClick={() => {
                const groupData: CreateGroupRequest = {
                  groupName: groupName.trim(),
                  bojHandles: handleInputs
                    .filter((handle) => handle.value.trim() && handle.isValidated)
                    .map((handle) => handle.value.trim()),
                };
                onEditGroup?.(groupData);
              }}
            >
              수정하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
