'use client';

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
  LabeledInput,
  LabeledSelector,
} from '@hiarc-platform/ui';
import React, { useState } from 'react';
import { useSelectedSemester } from '@/shared/hooks/use-semester-store';
import { useCreateAdmin } from '../../hooks';
import { useValidateAdminHandle } from '../../hooks/admin/mutation/use-validate-admin-handle';

interface AddAdminDialogProps {
  onSave?(): Promise<void>;
  onCancel?(): void;
  showBackground?: boolean;
}

export function AddAdminDialog({
  onSave,
  onCancel,
  showBackground = true,
}: AddAdminDialogProps): React.ReactElement {
  const [bojHandle, setBojHandle] = useState('');
  const [adminRole, setAdminRole] = useState<
    'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE'
  >('STAFF');
  const [isValidated, setIsValidated] = useState(false);

  const { selectedSemesterId } = useSelectedSemester();
  const createAdminMutation = useCreateAdmin();
  const validateAdminHandleMutation = useValidateAdminHandle();

  const handleValidate = async (): Promise<void> => {
    if (!bojHandle.trim()) {
      alert('핸들명을 입력해주세요.');
      return;
    }

    try {
      await validateAdminHandleMutation.mutateAsync(bojHandle.trim());
      setIsValidated(true);
    } catch (error) {
      setIsValidated(false);
    }
  };

  const handleSave = async (): Promise<void> => {
    if (!bojHandle.trim()) {
      alert('핸들명을 입력해주세요.');
      return;
    }

    if (!isValidated) {
      alert('핸들명을 먼저 인증해주세요.');
      return;
    }

    try {
      if (!selectedSemesterId) {
        alert('학기를 선택해주세요.');
        return;
      }

      await createAdminMutation.mutateAsync({
        semesterId: Number(selectedSemesterId),
        bojHandle: bojHandle.trim(),
        adminRole,
      });

      if (onSave) {
        await onSave();
      }
    } catch (error) {
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent
        className="!w-[540px] !max-w-[540px]"
        showBackground={showBackground}
        onOpenAutoFocus={(ev) => ev.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>직함 추가하기</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-6 flex w-full flex-col gap-6">
            <div className="flex items-end gap-2">
              <LabeledInput
                label="핸들명"
                placeholder="핸들명 입력하기"
                value={bojHandle}
                onChange={(value) => {
                  setBojHandle(value);
                  setIsValidated(false); // 핸들명 변경 시 인증 상태 초기화
                }}
              />
              <Button
                size="md"
                className="w-[120px]"
                onClick={handleValidate}
                disabled={!bojHandle.trim() || validateAdminHandleMutation.isPending || isValidated}
              >
                {validateAdminHandleMutation.isPending
                  ? '인증 중...'
                  : isValidated
                    ? '인증 확인'
                    : '인증하기'}
              </Button>
            </div>
            <LabeledSelector
              label="직함"
              placeholder="직함을 입력해주세요"
              options={[
                { value: 'STAFF', label: '스태프' },
                { value: 'SECRETARY', label: '총무' },
                { value: 'VICE_PRESIDENT', label: '부회장' },
                { value: 'PRESIDENT', label: '회장' },
              ]}
              value={adminRole}
              onChange={(value) => setAdminRole(value as typeof adminRole)}
            />
          </div>
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
            <Label size="lg">취소</Label>
          </Button>
          <Button
            className="w-full"
            size="lg"
            onClick={handleSave}
            disabled={!isValidated || createAdminMutation.isPending}
          >
            <Label size="lg">{createAdminMutation.isPending ? '추가 중...' : '추가하기'}</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
