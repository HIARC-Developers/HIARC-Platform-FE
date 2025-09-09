'use client';

import { Button, cn, DialogUtil, Label, LabeledInput, LabeledSelector } from '@hiarc-platform/ui';
import React, { useState, useEffect } from 'react';
import { StudySearchDialog } from './study-search-dialog';
import { StudyQueryParams } from '../../types/request/study-query-params';
import { useSemesterStore } from '@/shared/hooks/use-semester-store';

interface StudySearchSectionProps {
  className?: string;
  onSearchChange?(params: Omit<StudyQueryParams, 'page' | 'size'>): void;
  initialValues?: Omit<StudyQueryParams, 'page' | 'size'>;
}

export function StudySearchSection({
  className,
  onSearchChange,
  initialValues = {},
}: StudySearchSectionProps): React.ReactElement {
  const { semesters } = useSemesterStore();
  const [searchTitle, setSearchTitle] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');

  // Initialize with initial values
  useEffect(() => {
    if (initialValues.studyName) {
      setSearchTitle(initialValues.studyName);
    }
    if (initialValues.semesterId) {
      setSelectedSemester(initialValues.semesterId.toString());
    }
  }, [initialValues]);

  const handleSearch = (): void => {
    const searchParams: Omit<StudyQueryParams, 'page' | 'size'> = {};

    if (searchTitle.trim()) {
      searchParams.studyName = searchTitle.trim();
    }

    if (selectedSemester && selectedSemester !== 'all') {
      searchParams.semesterId = Number(selectedSemester);
    }
    // 'all'인 경우 semesterId를 아예 보내지 않음

    onSearchChange?.(searchParams);
  };

  const handleReset = (): void => {
    setSearchTitle('');
    setSelectedSemester('all');
    onSearchChange?.({});
  };

  const handleOpenDialog = (): void => {
    DialogUtil.showComponent(
      <StudySearchDialog
        onSave={async (params: Omit<StudyQueryParams, 'page' | 'size'>) => {
          // 다이얼로그에서 받은 값으로 state 업데이트
          if (params.studyName) {
            setSearchTitle(params.studyName);
          } else {
            setSearchTitle('');
          }

          if (params.semesterId) {
            setSelectedSemester(params.semesterId.toString());
          } else {
            setSelectedSemester('all');
          }

          onSearchChange?.(params);
        }}
        onCancel={() => {
          console.log('Study search cancelled');
        }}
        initialValues={{
          studyName: searchTitle,
          semesterId: selectedSemester !== 'all' ? Number(selectedSemester) : undefined,
        }}
      />
    );
  };

  // 학기 옵션 생성
  const semesterOptions = [
    { label: '전체', value: 'all' },
    ...semesters.map((semester) => ({
      label: semester.semesterName,
      value: semester.semesterId?.toString() ?? '',
    })),
  ];

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
          placeholder="진행 학기를 선택하세요"
          required={false}
          label="진행 학기"
          options={semesterOptions}
          value={selectedSemester}
          onChange={(value: string) => {
            setSelectedSemester(value);
          }}
        />
        <LabeledInput
          label="스터디명"
          value={searchTitle}
          onChange={(value) => setSearchTitle(value)}
          placeholder="스터디명을 입력하세요"
        />
        <div className="flex items-center gap-2">
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
        <Button
          variant="line_secondary"
          size="xs"
          className="rounded-md"
          onClick={handleOpenDialog}
        >
          <Label weight="medium">상세 검색</Label>
        </Button>
      </div>
    </>
  );
}
