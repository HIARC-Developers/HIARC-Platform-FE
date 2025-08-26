'use client';

import { LabeledSelector } from '../select/labeled-selector';
import { LabeledSelectButton } from '../select/labeled-select-button';
import { LabeledInput } from '../input/labeled-input';
import { LabeledCalanderInput } from '../input/labeled-calander-input';
import { Button } from '../button';
import { CreateAnnouncementRequest, SelectOption } from '@hiarc-platform/shared';

interface SideBarProps {
  formData: CreateAnnouncementRequest;
  onFormDataChange(updates: Partial<CreateAnnouncementRequest>): void;
  applyType: string;
  onApplyTypeChange(value: string): void;
  studyAnnounceType: string;
  onStudyAnnounceTypeChange(value: string): void;
  publicType: string;
  onPublicTypeChange(value: string): void;
  applicationStartDate: Date | null;
  onApplicationStartDateChange(value: Date | null): void;
  applicationEndDate: Date | null;
  onApplicationEndDateChange(value: Date | null): void;
  studyOptions?: SelectOption[];
  disableCategoryChange?: boolean;
  disableStudyTypeChange?: boolean;
  onSubmit(): void;
  isLoading: boolean;
  buttonText?: string;
}

export function SideBar({
  formData,
  onFormDataChange,
  applyType,
  onApplyTypeChange,
  studyAnnounceType,
  onStudyAnnounceTypeChange,
  publicType,
  onPublicTypeChange,
  applicationStartDate,
  onApplicationStartDateChange,
  applicationEndDate,
  onApplicationEndDateChange,
  studyOptions = [],
  disableCategoryChange = false,
  disableStudyTypeChange = false,
  onSubmit,
  isLoading,
  buttonText = '게시하기',
}: SideBarProps): React.ReactElement {
  const publicTypeOptionList = [
    {
      value: '공개',
      label: '공개',
    },
    { value: '비공개', label: '비공개' },
  ];
  const applyTypeOptionList = [
    { value: '신청 유형', label: '신청 유형' },
    { value: '신청 없음', label: '신청 없음' },
  ];
  const studyAnnounceTypeOptionList = [
    { value: '일반', label: '일반' },
    { value: '회차별 공지', label: '회차별 공지' },
  ];

  const categoryOptionList = [
    { value: 'STUDY', label: '스터디' },
    { value: 'RATING', label: '하이팅' },
    { value: 'GENERAL', label: '일반' },
    { value: 'EXTERNAL', label: '외부 공지' },
    { value: 'ETC', label: '기타' },
  ];

  const lectureRoundOptions = Array.from({ length: 30 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `${i + 1}회차`,
  }));

  return (
    <div className="flex w-[389px] flex-col justify-between rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col gap-4">
        {/* 카테고리 선택 */}
        <div className="flex flex-col gap-2">
          <LabeledSelector
            placeholder="카테고리를 선택해주세요."
            required={true}
            options={categoryOptionList}
            label="카테고리"
            value={formData.announcementType}
            disabled={disableCategoryChange}
            onChange={(value: string) =>
              onFormDataChange({
                announcementType: value as 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL',
              })
            }
          />

          {/* STUDY 카테고리일 때 스터디 선택 */}
          {formData.announcementType === 'STUDY' && (
            <LabeledSelector
              placeholder="스터디를 선택해주세요."
              options={studyOptions}
              label="스터디선택"
              showLabel={false}
              value={formData.studyId?.toString() || ''}
              disabled={disableCategoryChange}
              onChange={(value: string) => {
                const studyId = value ? Number(value) : undefined;
                onFormDataChange({ studyId });
              }}
            />
          )}
        </div>

        {/* STUDY 카테고리일 때 */}
        {formData.announcementType === 'STUDY' ? (
          <>
            {/* 스터디 공지 유형 */}
            <LabeledSelectButton
              label="스터디 공지 유형"
              required={true}
              value={studyAnnounceType}
              options={studyAnnounceTypeOptionList}
              disabled={disableStudyTypeChange}
              onChange={onStudyAnnounceTypeChange}
            />

            {/* 회차별 공지를 선택했을 때 회차 선택 */}
            {studyAnnounceType === '회차별 공지' && (
              <LabeledSelector
                placeholder="회차를 선택해주세요."
                options={lectureRoundOptions}
                label="회차 선택"
                required
                value={formData.lectureRound?.toString() || ''}
                onChange={(value: string) => {
                  const lectureRound = value ? Number(value) : undefined;
                  console.log('회차 선택됨:', lectureRound);
                  onFormDataChange({ lectureRound });
                }}
              />
            )}
          </>
        ) : (
          <>
            {/* 다른 카테고리일 때 신청 유형 */}
            <LabeledSelectButton
              label="신청 유형"
              required
              value={applyType}
              options={applyTypeOptionList}
              onChange={onApplyTypeChange}
            />

            {/* 신청 유형을 선택했을 때 (신청 없음이 아닐 때) */}
            {applyType === '신청 유형' && (
              <>
                <LabeledCalanderInput
                  placeholder="신청 시작일을 선택해주세요"
                  label="신청 시작일"
                  required
                  value={applicationStartDate}
                  onChange={(val: Date | null) => {
                    if (!Array.isArray(val)) {
                      onApplicationStartDateChange(val);
                    }
                  }}
                />
                <LabeledCalanderInput
                  placeholder="신청 종료일을 선택해주세요"
                  label="신청 종료일"
                  required={true}
                  value={applicationEndDate}
                  onChange={(val: Date | null) => {
                    if (!Array.isArray(val)) {
                      onApplicationEndDateChange(val);
                    }
                  }}
                />
                <LabeledInput
                  label="신청 URL"
                  required={true}
                  placeholder="신청 URL을 입력해주세요"
                  value={formData.applicationUrl || ''}
                  onChange={(value: string) =>
                    onFormDataChange({ applicationUrl: value || undefined })
                  }
                />
              </>
            )}
          </>
        )}

        {/* 공개 여부 - 항상 맨 아래 표시 */}
        <LabeledSelectButton
          label="공개 여부"
          required
          value={publicType}
          options={publicTypeOptionList}
          onChange={onPublicTypeChange}
        />
      </div>

      <Button className="mt-4 w-full" size="lg" onClick={onSubmit} disabled={isLoading}>
        {isLoading ? (buttonText === '수정하기' ? '수정 중...' : '게시 중...') : buttonText}
      </Button>
    </div>
  );
}
