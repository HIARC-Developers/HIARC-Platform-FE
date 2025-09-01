'use client';

import {
  Button,
  cn,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  LabeledInput,
  LabeledSelector,
} from '@hiarc-platform/ui';
import React, { useState } from 'react';
import { announcementTypeSelectOption, AnnnouncementType } from '@hiarc-platform/shared';
import { AnnouncementQueryParams } from '../../types/request/announcement-query-params';
import { useSemesterStore } from '@/shared/hooks/use-semester-store';

interface AnnouncementSearchDialogProps {
  onSave?(params: Omit<AnnouncementQueryParams, 'page' | 'size'>): Promise<void>;
  onCancel?(): void;
  showBackground?: boolean;
  initialValues?: {
    announcementType?: AnnnouncementType | '';
    semesterId?: string | '';
    title?: string;
  };
}

export function AnnouncementSearchDialog({
  onSave,
  onCancel,
  showBackground = true,
  initialValues,
}: AnnouncementSearchDialogProps): React.ReactElement {
  const { getSemesterOptions } = useSemesterStore();
  const [announcementType, setAnnouncementType] = useState<AnnnouncementType | ''>(
    initialValues?.announcementType ?? ''
  );
  const [semesterId, setSemesterId] = useState<string | ''>(initialValues?.semesterId ?? '');
  const [title, setTitle] = useState<string>(initialValues?.title ?? '');
  const handleSave = async (): Promise<void> => {
    try {
      const params: Omit<AnnouncementQueryParams, 'page' | 'size'> = {};

      if (announcementType) {
        params.announcementType = announcementType;
      }
      if (semesterId) {
        params.semesterId = Number(semesterId);
      }
      if (title.trim()) {
        params.title = title.trim();
      }

      if (onSave) {
        await onSave(params);
      }
      DialogUtil.hideAllDialogs();
    } catch (error) {
      throw error;
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  const handleReset = (): void => {
    setAnnouncementType('');
    setSemesterId('');
    setTitle('');
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent fullscreen showBackground={showBackground}>
        <DialogHeader>
          <DialogTitle>공지사항 검색</DialogTitle>
        </DialogHeader>
        <div className="pt-6">
          <div className={cn('flex flex-col gap-6')}>
            <LabeledSelector
              placeholder="카테고리를 선택해주세요."
              required={false}
              label={'카테고리'}
              options={announcementTypeSelectOption()}
              value={announcementType}
              onChange={(value: unknown) => {
                setAnnouncementType(value as AnnnouncementType | '');
              }}
            />
            <LabeledSelector
              placeholder="학기를 선택해주세요."
              required={false}
              label="학기"
              options={getSemesterOptions()}
              value={semesterId}
              onChange={setSemesterId}
            />
            <LabeledInput label="제목" value={title} onChange={setTitle} />
            <div className="flex w-full items-center gap-2">
              <Button variant="line_secondary" size="md" className="w-full" onClick={handleReset}>
                초기화
              </Button>
              <Button
                variant="fill"
                size="md"
                className="w-full bg-primary-200"
                onClick={handleSave}
              >
                검색
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
