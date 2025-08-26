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
import React, { useState, useEffect } from 'react';
import { StudyQueryParams } from '../../types/request/study-query-params';
import { useSemesterStore } from '@/shared/hooks/use-semester-store';

interface StudySearchDialogProps {
  onSave?(params: Omit<StudyQueryParams, 'page' | 'size'>): Promise<void>;
  onCancel?(): void;
  initialValues?: Omit<StudyQueryParams, 'page' | 'size'>;
  showBackground?: boolean;
}

export function StudySearchDialog({
  onSave,
  onCancel,
  initialValues = {},
  showBackground = true,
}: StudySearchDialogProps): React.ReactElement {
  const { semesters } = useSemesterStore();
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Initialize with initial values
  useEffect(() => {
    if (initialValues.studyName) {
      setSearchTitle(initialValues.studyName);
    } else {
      setSearchTitle('');
    }

    if (initialValues.semesterId) {
      setSelectedSemester(initialValues.semesterId.toString());
    } else {
      setSelectedSemester('all');
    }

    if (initialValues.status) {
      setSelectedStatus(initialValues.status);
    } else {
      setSelectedStatus('all');
    }
  }, [initialValues]);

  const handleSave = async (): Promise<void> => {
    try {
      const searchParams: Omit<StudyQueryParams, 'page' | 'size'> = {};

      if (searchTitle.trim()) {
        searchParams.studyName = searchTitle.trim();
      }

      if (selectedSemester && selectedSemester !== 'all') {
        searchParams.semesterId = Number(selectedSemester);
      }

      if (selectedStatus && selectedStatus !== 'all') {
        searchParams.status = selectedStatus as 'active' | 'completed' | 'cancelled';
      }

      if (onSave) {
        await onSave(searchParams);
      }
      DialogUtil.hideAllDialogs();
    } catch (error) {
      console.error('검색 실패:', error);
      throw error;
    }
  };

  const handleCancel = (): void => {
    onCancel?.();
    DialogUtil.hideAllDialogs();
  };

  const handleReset = (): void => {
    setSearchTitle('');
    setSelectedSemester('all');
    setSelectedStatus('all');
  };

  // 학기 옵션 생성
  const semesterOptions = [
    { label: '전체', value: 'all' },
    ...semesters
      .map((semester) => ({
        label: semester.semesterName ?? '',
        value: semester.semesterId?.toString() ?? '',
      }))
      .filter((option) => option.value !== ''),
  ];

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent fullscreen showBackground={showBackground}>
        <DialogHeader>
          <DialogTitle>스터디 검색</DialogTitle>
        </DialogHeader>
        <div className="pt-6">
          <div className={cn('flex flex-col gap-6')}>
            <LabeledSelector
              placeholder="진행 학기를 선택하세요"
              required={false}
              label="진행 학기"
              options={semesterOptions}
              value={selectedSemester}
              onChange={setSelectedSemester}
            />
            <LabeledInput
              label="스터디명"
              value={searchTitle}
              onChange={setSearchTitle}
              placeholder="스터디명을 입력하세요"
            />
            <div className="flex w-full items-center gap-2">
              <Button variant="line_secondary" size="md" className="w-full" onClick={handleReset}>
                초기화
              </Button>
              <Button variant="fill" size="md" className="w-full" onClick={handleSave}>
                검색
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
