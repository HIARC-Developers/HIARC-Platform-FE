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
} from '@hiarc-platform/ui';
import React from 'react';

import { UpdateAwardRequest } from '@/features/award/types/request/update-award-request';
import { Award } from '@hiarc-platform/shared';
import useUpdateAward from '@/features/award/hooks/mutation/use-update-award';

interface EditCompetitionDialogProps {
  award: Award;
  onSave?(): void;
  onCancel?(): void;
  showBackground?: boolean;
}

export function EditCompetitionDialog({
  award,
  onSave,
  onCancel,
  showBackground = true,
}: EditCompetitionDialogProps): React.ReactElement {
  const [formData, setFormData] = React.useState({
    organization: award.organization || '',
    awardName: award.awardName || '',
    awardDate: award.awardDate || '',
    awardDetail: award.awardDetail || '',
  });

  const updateAwardMutation = useUpdateAward();

  const handleSave = async (): Promise<void> => {
    try {
      const updateData: UpdateAwardRequest = {
        organization: formData.organization,
        awardName: formData.awardName,
        awardDate: formData.awardDate.toString(),
        awardDetail: formData.awardDetail,
      };

      console.log('💾 [EDIT AWARD] 수정 시작:', updateData);

      await updateAwardMutation.mutateAsync({
        awardId: award.awardId ?? 0,
        awardData: updateData,
      });

      DialogUtil.hideAllDialogs();
      onSave?.();
    } catch (error) {
      console.error('💥 [EDIT AWARD] 수정 실패:', error);
      throw error;
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="!w-[540px] !max-w-[540px]" showBackground={showBackground}>
        <DialogHeader>
          <DialogTitle>참여한 대회 수정하기</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-6 flex w-full flex-col gap-4">
            <ol className="list-disc pl-5 text-gray-700">
              <li>허위 정보로 판단될 경우, 운영진에 의해 삭제될 수 있습니다.</li>
              <li>
                운영진도 대회 기록을 추가할 수 있으며, 운영진이 추가한 대회 이력은 삭제/수정할 수
                없습니다.
              </li>
            </ol>
            <LabeledInput
              label="주최단체명"
              placeholder="예) 현대모비스, 카카오, 홍익대학교"
              value={formData.organization}
              onChange={(value) => setFormData((prev) => ({ ...prev, organization: value }))}
            />
            <LabeledInput
              label="대회명"
              placeholder="예) 알고리즘 대회"
              value={formData.awardName}
              onChange={(value) => setFormData((prev) => ({ ...prev, awardName: value }))}
            />
            <LabeledInput
              label="일시"
              placeholder="예) 2024-03-15"
              value={formData.awardDate.toString()}
              onChange={(value) => setFormData((prev) => ({ ...prev, awardDate: value }))}
            />
            <LabeledInput
              label="수상 내역"
              placeholder="예) 본선 진출, 3위, 장려상, 특별상 등"
              value={formData.awardDetail}
              onChange={(value) => setFormData((prev) => ({ ...prev, awardDetail: value }))}
            />
          </div>
        </DialogDescription>
        <div className="mt-6 flex w-full gap-2">
          <Button
            variant="secondary"
            className="w-full"
            size="lg"
            onClick={handleCancel}
            disabled={updateAwardMutation.isPending}
          >
            <Label size="lg">취소</Label>
          </Button>
          <Button
            className="w-full"
            size="lg"
            onClick={handleSave}
            disabled={updateAwardMutation.isPending}
          >
            <Label size="lg">{updateAwardMutation.isPending ? '수정 중...' : '수정하기'}</Label>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
