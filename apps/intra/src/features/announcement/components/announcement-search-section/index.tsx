'use client';

import { Button, cn, DialogUtil, LabeledInput, LabeledSelector } from '@hiarc-platform/ui';
import React, { useState, useEffect } from 'react';
import { AnnouncementSearchDialog } from './announcement-search-dialog';
import { announcementTypeSelectOption, AnnnouncementType } from '@hiarc-platform/shared';
import { AnnouncementQueryParams } from '../../types/request/announcement-query-params';
import { useSemesterStore } from '@/shared/hooks/use-semester-store';

interface AnnouncementSearchSectionProps {
  className?: string;
  onSearch?(params: Omit<AnnouncementQueryParams, 'page' | 'size'>): void;
  initialValues?: Omit<AnnouncementQueryParams, 'page' | 'size'>;
}

export function AnnouncementSearchSection({
  className,
  onSearch,
  initialValues = {},
}: AnnouncementSearchSectionProps): React.ReactElement {
  const { getSemesterOptions } = useSemesterStore();
  const [announcementType, setAnnouncementType] = useState<AnnnouncementType | ''>('');
  const [semesterId, setSemesterId] = useState<string | ''>('');
  const [title, setTitle] = useState<string>('');

  // initialValues가 변경될 때 state 업데이트
  useEffect(() => {
    setAnnouncementType((initialValues.announcementType as AnnnouncementType) || '');
    setSemesterId(initialValues.semesterId ? initialValues.semesterId.toString() : '');
    setTitle(initialValues.title || '');
  }, [initialValues]);
  const handleSearch = (): void => {
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

    onSearch?.(params);
  };

  const handleReset = (): void => {
    setAnnouncementType('');
    setSemesterId('');
    setTitle('');
    onSearch?.({});
  };

  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <AnnouncementSearchDialog
        onSave={async (params) => {
          setAnnouncementType((params.announcementType as AnnnouncementType) || '');
          setSemesterId(params.semesterId ? params.semesterId.toString() : '');
          setTitle(params.title || '');
          onSearch?.(params);
        }}
        onCancel={() => {
        }}
        initialValues={{
          announcementType,
          semesterId,
          title,
        }}
      />
    );
  };

  return (
    <>
      {/* Desktop View */}
      <div
        className={cn(
          'hidden w-full items-end justify-between gap-4 rounded-md border border-gray-100 p-6 md:flex',
          className
        )}
      >
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
        <LabeledInput
          label="제목"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={setTitle}
        />
        <div className="flex w-full items-center gap-2">
          <Button variant="line_secondary" size="md" className="w-[134px]" onClick={handleReset}>
            초기화
          </Button>
          <Button variant="fill" size="md" className="w-[134px]" onClick={handleSearch}>
            검색
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className={cn('md:hidden', className)}>
        <Button variant="line_secondary" size="xs" onClick={handleOpenDialog}>
          상세 검색
        </Button>
      </div>
    </>
  );
}
