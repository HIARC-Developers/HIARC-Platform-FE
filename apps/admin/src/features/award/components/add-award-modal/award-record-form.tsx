'use client';
import { Button, LabeledInput, LabeledSelectButton } from '@hiarc-platform/ui';
import { useState } from 'react';

interface AwardRecordFormProps {
  id: number;
  onDelete(): void;
  onDataChange?(data: { handle: string; awardDetail: string }): void;
}

export function AwardRecordForm({
  onDelete,
  onDataChange,
}: AwardRecordFormProps): React.ReactElement {
  const [oauth, setOauth] = useState<boolean>(false);
  const [recordType, setRecordType] = useState<string>('');
  const [handle, setHandle] = useState<string>('');
  const [awardDetail, setAwardDetail] = useState<string>('');

  // Notify parent component when data changes
  const handleDataChange = (newHandle: string, newAwardDetail: string): void => {
    setHandle(newHandle);
    setAwardDetail(newAwardDetail);
    if (onDataChange) {
      // For participation type, send '참여'; for award type, send the actual detail
      const finalAwardDetail = recordType === 'participation' ? '참여' : newAwardDetail;
      onDataChange({ handle: newHandle, awardDetail: finalAwardDetail });
    }
  };

  const recordTypeOptions = [
    { label: '참여', value: 'participation' },
    { label: '수상', value: 'award' },
  ];

  return (
    <div className="flex w-full gap-3">
      <div className="flex w-full flex-col gap-2">
        <div className="flex w-full items-end gap-2">
          <LabeledInput
            label="핸들명"
            placeholder="핸들명 입력하기"
            disabled={oauth}
            value={handle}
            onChange={(value) => handleDataChange(value, awardDetail)}
          />
          {oauth ? (
            <LabeledSelectButton
              label="기록 유형"
              options={recordTypeOptions}
              value={recordType}
              onChange={(value) => {
                setRecordType(value);
                // When record type changes, update parent with current data
                const finalAwardDetail = value === 'participation' ? '참여' : awardDetail;
                if (onDataChange) {
                  onDataChange({ handle, awardDetail: finalAwardDetail });
                }
              }}
            />
          ) : (
            <Button
              size="md"
              className="w-[118px]"
              onClick={() => {
                setOauth(!oauth);
              }}
            >
              인증하기
            </Button>
          )}
        </div>
        {recordType === 'award' && (
          <LabeledInput
            label="수상내역"
            placeholder="예: 본선 진출, 3위, 장려상, 특별상 등"
            value={awardDetail}
            onChange={(value) => handleDataChange(handle, value)}
          />
        )}
      </div>
      {oauth && (
        <div
          className="flex w-[20px] cursor-pointer items-center justify-center rounded-md bg-gray-300"
          onClick={onDelete}
          role="button"
          tabIndex={0}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              onDelete();
            }
          }}
        >
          <div className="h-px w-[10px] rounded-md bg-white"></div>
        </div>
      )}
    </div>
  );
}
