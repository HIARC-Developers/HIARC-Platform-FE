'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  LabeledInput,
  Label,
  Button,
  LabeledCalanderInput,
} from '@hiarc-platform/ui';
import React from 'react';
import { AwardRecordForm } from './award-record-form';
import { useCreateAdminAward } from '../../hooks/use-create-award';
import { CreateAwardRequest } from '../../types/request/create-award-request';
import Image from 'next/image';

interface AddAwardDialogProps {
  onSave?(): Promise<void>;
  onCancel?(): void;
  showBackground?: boolean;
}

export function AddAwardDialog({
  onSave,
  onCancel,
  showBackground = true,
}: AddAwardDialogProps): React.ReactElement {
  const [time, setTime] = React.useState<Date | null>(null);
  const [awardForms, setAwardForms] = React.useState<number[]>([0]);
  const [organization, setOrganization] = React.useState<string>('');
  const [awardName, setAwardName] = React.useState<string>('');
  const [awardData, setAwardData] = React.useState<
    Map<number, { handle: string; awardDetail: string }>
  >(new Map());

  const createAwardMutation = useCreateAdminAward();

  function handleAddForm(): void {
    setAwardForms((prev) => [...prev, prev.length]);
  }

  function handleDeleteForm(id: number): void {
    setAwardForms((prev) => prev.filter((formId) => formId !== id));
    setAwardData((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  }

  function handleAwardDataChange(id: number, data: { handle: string; awardDetail: string }): void {
    setAwardData((prev) => new Map(prev.set(id, data)));
  }

  const handleSave = async (): Promise<void> => {
    try {
      // Validation
      if (!organization.trim()) {
        DialogUtil.showError('주최 단체명을 입력해주세요.');
        return;
      }
      if (!awardName.trim()) {
        DialogUtil.showError('대회명을 입력해주세요.');
        return;
      }
      if (!time) {
        DialogUtil.showError('일시를 선택해주세요.');
        return;
      }

      // Prepare winners data - include participants with '참여' as awardDetail
      const winners = Array.from(awardData.values()).filter(
        (winner) => winner.handle.trim() && winner.awardDetail.trim() // Both handle and awardDetail should exist
      );

      if (winners.length === 0) {
        DialogUtil.showError('최소 한 명의 참여자 정보를 입력해주세요.');
        return;
      }

      const requestData: CreateAwardRequest = {
        organization: organization.trim(),
        awardName: awardName.trim(),
        awardDate: time.toISOString().split('T')[0], // YYYY-MM-DD format
        winners,
      };

      await createAwardMutation.mutateAsync(requestData);

      DialogUtil.showSuccess('대회 정보가 성공적으로 추가되었습니다.');

      if (onSave) {
        await onSave();
      }
      DialogUtil.hideAllDialogs();
    } catch (error) {
      console.error('저장 실패:', error);
      DialogUtil.showError('대회 정보 추가에 실패했습니다.');
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent
        onOpenAutoFocus={(ev) => ev.preventDefault()}
        className="fixed left-1/2 top-1/2  !w-[540px] !max-w-[540px] -translate-x-1/2 -translate-y-1/2 overflow-visible bg-white"
        showBackground={showBackground}
      >
        <DialogHeader>
          <DialogTitle className="w-full">대회 추가하기</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-6 flex h-[500px] w-[482px] flex-col gap-6 overflow-y-auto px-1 py-1">
          <LabeledInput
            label="주최 단체명"
            placeholder="예) 현대모비스,카카오,홍익대학교"
            value={organization}
            onChange={setOrganization}
          />
          <LabeledInput
            label="대회명"
            placeholder="예) 코드 페스티벌, 알고리즘 경진대회"
            value={awardName}
            onChange={setAwardName}
          />
          <LabeledCalanderInput
            label="일시"
            value={time}
            placeholder="일시를 선택해주세요"
            onChange={(val) => {
              if (!Array.isArray(val)) {
                setTime(val);
              }
            }}
          />
          {awardForms.map((id) => (
            <AwardRecordForm
              key={id}
              id={id}
              onDelete={() => handleDeleteForm(id)}
              onDataChange={(data) => handleAwardDataChange(id, data)}
            />
          ))}
          <button
            className="flex items-center justify-center rounded-md border-gray-300 bg-white p-2 transition-colors duration-200 hover:bg-gray-50"
            onClick={handleAddForm}
          >
            <Image src="/shared-assets/PlusButton.svg" alt="add" width={24} height={24} />
          </button>
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button variant="secondary" className="w-full" size="lg" onClick={handleCancel}>
            <Label size="lg">취소</Label>
          </Button>
          <Button
            className="w-full"
            size="lg"
            onClick={handleSave}
            disabled={createAwardMutation.isPending}
          >
            <Label size="lg">{createAwardMutation.isPending ? '추가 중...' : '추가하기'}</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
