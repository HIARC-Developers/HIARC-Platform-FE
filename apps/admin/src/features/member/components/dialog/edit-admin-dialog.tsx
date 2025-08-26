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
import { Admin } from '@hiarc-platform/shared';
import { useUpdateAdmin } from '@/features/member/hooks/admin/mutation/use-update-admin';

interface AddStaffDialogProps {
  admin: Admin;
  onSave?(): Promise<void>;
  onCancel?(): void;
  showBackground?: boolean;
}

export function EditAdminDialog({
  admin,
  onSave,
  onCancel,
  showBackground = true,
}: AddStaffDialogProps): React.ReactElement {
  const [bojHandle, setBojHandle] = useState(admin.bojHandle);
  const [adminRole, setAdminRole] = useState<
    'PRESIDENT' | 'VICE_PRESIDENT' | 'SECRETARY' | 'STAFF' | 'NONE'
  >(admin.adminRole);

  const { selectedSemesterId } = useSelectedSemester();
  const patchAdminMutation = useUpdateAdmin();
  const handleSave = async (): Promise<void> => {
    try {
      if (!selectedSemesterId) {
        alert('학기를 선택해주세요.');
        return;
      }

      await patchAdminMutation.mutateAsync({
        semesterId: Number(selectedSemesterId),
        memberId: admin.memberId,
        adminRole,
      });

      if (onSave) {
        await onSave();
      }

      DialogUtil.hideAllDialogs();
    } catch (error) {
      console.error('저장 실패:', error);
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
          <DialogTitle>직함 수정하기</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-6 flex w-full flex-col gap-6">
            <div className="flex items-end gap-2">
              <LabeledInput
                label="핸들명"
                placeholder="핸들명 입력하기"
                value={bojHandle}
                onChange={(value) => setBojHandle(value)}
                disabled={true}
              />
              <Button size="md" className="w-[120px]" disabled={true}>
                인증하기
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
            disabled={patchAdminMutation.isPending}
          >
            <Label size="lg">{patchAdminMutation.isPending ? '수정 중...' : '수정하기'}</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
