'use client';

import { Label, LabeledInput, LabeledSelectButton, DialogUtil } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import { LabeledSelector } from '@hiarc-platform/ui';
import { LabeledMultiSelect, LabeledTimePicker, InformaionSection } from '@hiarc-platform/ui';
import { LabeledTextarea } from '@hiarc-platform/ui';
import { LabeledCalanderInput } from '@hiarc-platform/ui';
import { useState } from 'react';
import { useCreateStudy } from '@/features/study/hooks';
import { useUpdateStudy } from '@/features/study/hooks/use-update-study';
import { useStudyInitialForm } from '@/features/study/hooks/use-study-initial-form';
import { CreateStudyRequest } from '@hiarc-platform/shared';
import type { UpdateStudyRequest } from '../../api/study';
import { useSemesterStoreInit, useSemesterStore } from '@/shared/hooks/use-semester-store';
import { useEffect } from 'react';
import { useValidateInstructor } from '../../hooks/use-validate-instructor';

interface CreateStudyFormProps {
  studyId?: number;
  isEditMode?: boolean;
}

export function CreateStudyForm({
  studyId,
  isEditMode = false,
}: CreateStudyFormProps = {}): React.ReactElement {
  const createStudyMutation = useCreateStudy();
  const updateStudyMutation = useUpdateStudy();
  const validateInstructorMutation = useValidateInstructor();
  const { data: initialData, isLoading: isLoadingInitialData } = useStudyInitialForm(studyId);

  // Initialize semester store on component mount
  useSemesterStoreInit();
  const { semesterOptions } = useSemesterStore();

  const [formData, setFormData] = useState<CreateStudyRequest>({
    name: '',
    bojHandle: '',
    isGroupStudy: false,
    semesterId: null,
    startDate: null,
    endDate: null,
    scheduledDays: null,
    startTime: null,
    isOnline: null,
    lang: null,
    introduction: null,
    recruitmentStartAt: null,
    recruitmentEndAt: null,
    precaution: null,
  });

  const [studyPeriod, setStudyPeriod] = useState<[Date | null, Date | null]>([null, null]);
  const [cruitPeriod, setCruitPeriod] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [isOnline, setIsOnline] = useState<string>('IN_PERSON');
  const [isPublic, setIsPublic] = useState<string>('PUBLIC');
  const [isGroupStudy, setIsGroupStudy] = useState<string>('AVAILABLE');
  const [isValidatedInstructor, setIsValidatedInstructor] = useState<boolean>(false);

  // Initialize form data when initialData is loaded
  useEffect(() => {
    if (initialData && isEditMode) {
      setFormData({
        name: initialData.name || '',
        bojHandle: initialData.bojHandle || '',
        isGroupStudy: initialData.isGroupStudy || false,
        semesterId: initialData.semesterId || null,
        startDate: initialData.startDate ?? '',
        endDate: initialData.endDate ?? '',
        scheduledDays: initialData.scheduledDays || null,
        startTime: initialData.startTime || null,
        isOnline: initialData.isOnline || null,
        lang: initialData.lang || null,
        introduction: initialData.introduction || null,
        recruitmentStartAt: initialData.recruitmentStartAt || null,
        recruitmentEndAt: initialData.recruitmentEndAt || null,
        precaution: initialData.precaution || null,
        isPublic: initialData.isPublic || null,
      });

      setStudyPeriod([
        initialData.startDate ? new Date(initialData.startDate) : null,
        initialData.endDate ? new Date(initialData.endDate) : null,
      ]);

      setCruitPeriod([
        initialData.recruitmentStartAt ? new Date(initialData.recruitmentStartAt) : null,
        initialData.recruitmentEndAt ? new Date(initialData.recruitmentEndAt) : null,
      ]);

      setSelectedDays(initialData.scheduledDays || []);
      setSelectedStartTime(initialData.startTime || '');
      setIsOnline(initialData.isOnline ? 'ONLINE' : 'IN_PERSON');
      setIsPublic(initialData.isPublic ? 'PUBLIC' : 'PRIVATE');
      setIsGroupStudy(initialData.isGroupStudy ? 'AVAILABLE' : 'UNAVAILABLE');
    }
  }, [initialData, isEditMode]);

  const studyTypeOptionList = [
    { label: '대면', value: 'IN_PERSON' },
    { label: '비대면', value: 'ONLINE' },
  ];

  const dayTypeOptionList = [
    { label: '월', value: 'MONDAY' },
    { label: '화', value: 'TUESDAY' },
    { label: '수', value: 'WEDNESDAY' },
    { label: '목', value: 'THURSDAY' },
    { label: '금', value: 'FRIDAY' },
    { label: '토', value: 'SATURDAY' },
    { label: '일', value: 'SUNDAY' },
  ];

  const publicTypeOptionList = [
    { label: '공개', value: 'PUBLIC' },
    { label: '비공개', value: 'PRIVATE' },
  ];

  const studyGroupOptionList = [
    { label: '있음', value: 'AVAILABLE' },
    { label: '없음', value: 'UNAVAILABLE' },
  ];

  // 시간 형식을 HH:MM:SS로 정규화하는 함수
  const handleValidateInstructor = async (): Promise<void> => {
    if (!formData.bojHandle.trim()) {
      DialogUtil.showError('핸들명을 입력해주세요.');
      return;
    }

    try {
      await validateInstructorMutation.mutateAsync(formData.bojHandle);
      setIsValidatedInstructor(true);
    } catch (error) {
      console.error('스터디장 검증 실패:', error);
    }
  };

  const normalizeTimeFormat = (time: string): string => {
    if (!time) {
      return '';
    }

    // 이미 올바른 형식인지 확인 (HH:MM:SS)
    if (/^\d{2}:\d{2}:\d{2}$/.test(time)) {
      return time;
    }

    // HH:MM 형식인 경우 :00 추가
    if (/^\d{2}:\d{2}$/.test(time)) {
      return `${time}:00`;
    }

    // 잘못된 형식인 경우 :00 제거 후 다시 :00 추가
    const cleanTime = time.replace(/:00$/, '');
    return /^\d{2}:\d{2}$/.test(cleanTime) ? `${cleanTime}:00` : time;
  };

  const handleSubmit = async (): Promise<void> => {
    // 필수 필드 검증 (순서대로)
    const requiredFields = [
      { value: formData.name, name: '스터디명' },
      { value: formData.bojHandle, name: '스터디장' },
      { value: isGroupStudy, name: '스터디조' },
      { value: formData.semesterId, name: '진행 학기' },
      { value: studyPeriod[0] && studyPeriod[1], name: '진행기간' },
      { value: selectedDays.length > 0, name: '고정 요일' },
      { value: selectedStartTime, name: '시작시간' },
      { value: isOnline, name: '진행방식' },
      { value: formData.lang, name: '언어' },
      { value: isPublic, name: '공개 여부' },
      { value: formData.introduction, name: '스터디 한줄 소개' },
      { value: cruitPeriod[0] && cruitPeriod[1], name: '모집기한' },
    ];

    for (const field of requiredFields) {
      if (!field.value) {
        DialogUtil.showError(`${field.name}을(를) 입력해주세요.`);
        return;
      }
    }

    if (!isEditMode && !isValidatedInstructor) {
      DialogUtil.showError('스터디장 검증을 완료해주세요.');
      return;
    }

    // 날짜를 로컬 타임존으로 변환하는 함수
    const toLocalDateString = (date: Date | null): string | null => {
      if (!date) {
        return null;
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}T00:00:00`;
    };

    const studyRequest: CreateStudyRequest = {
      name: formData.name,
      bojHandle: formData.bojHandle,
      isGroupStudy: isGroupStudy === 'AVAILABLE',
      semesterId: formData.semesterId,
      startDate: toLocalDateString(studyPeriod[0]),
      endDate: toLocalDateString(studyPeriod[1]),
      scheduledDays: selectedDays.length > 0 ? selectedDays : null,
      startTime: selectedStartTime ? normalizeTimeFormat(selectedStartTime) : null,
      isOnline: isOnline === 'ONLINE' ? true : isOnline === 'IN_PERSON' ? false : null,
      isPublic: isPublic === 'PUBLIC' ? true : isPublic === 'PRIVATE' ? false : null,
      lang: formData.lang || null,
      introduction: formData.introduction || null,
      recruitmentStartAt: toLocalDateString(cruitPeriod[0]),
      recruitmentEndAt: toLocalDateString(cruitPeriod[1]),
      precaution: formData.precaution || null,
    };

    // null 값 제거
    Object.keys(studyRequest).forEach((key) => {
      if (studyRequest[key as keyof CreateStudyRequest] === null) {
        delete studyRequest[key as keyof CreateStudyRequest];
      }
    });

    try {
      if (isEditMode && studyId) {
        // Edit mode: use update API (title, handle, semesterId는 수정 불가이므로 제외)
        const { name, bojHandle, semesterId, isGroupStudy, ...tempRequest } = studyRequest;

        // null과 undefined 값 제거하여 UpdateStudyRequest 타입에 맞게 변환
        const updateRequest: Record<string, unknown> = {};
        Object.entries(tempRequest).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            updateRequest[key] = value;
          }
        });
        await updateStudyMutation.mutateAsync({
          studyId,
          data: updateRequest as UpdateStudyRequest,
        });
      } else {
        // Create mode
        await createStudyMutation.mutateAsync(studyRequest);
      }
    } catch (error) {
      console.error(isEditMode ? '스터디 수정 실패:' : '스터디 생성 실패:', error);
    }
  };

  if (isLoadingInitialData && isEditMode) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div>데이터를 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex min-h-screen w-full max-w-[1200px] flex-col items-start gap-4">
      <Label size="lg" weight="bold">
        기본정보
      </Label>
      <LabeledInput
        label="스터디명"
        placeholder="제목을 입력해주세요"
        required
        value={formData.name}
        onChange={(value) => setFormData((prev) => ({ ...prev, name: value }))}
        disabled={isEditMode}
      />
      <div className="flex w-full gap-2">
        <div className="flex w-1/2 items-end gap-2">
          <LabeledInput
            label="스터디장"
            placeholder="스터디장의 핸들명을 입력해주세요"
            required
            value={formData.bojHandle}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, bojHandle: value }));
              if (isValidatedInstructor) {
                setIsValidatedInstructor(false);
              }
            }}
            disabled={isEditMode}
          />
          <Button
            variant="fill"
            size="md"
            className="w-[100px]"
            disabled={isEditMode || isValidatedInstructor || validateInstructorMutation.isPending}
            onClick={handleValidateInstructor}
          >
            {validateInstructorMutation.isPending
              ? '검증 중'
              : isValidatedInstructor
                ? '검증 완료'
                : '확인'}
          </Button>
        </div>
        <div className="flex w-1/2 items-end">
          <LabeledSelectButton
            required
            label="스터디조"
            options={studyGroupOptionList}
            value={isGroupStudy}
            onChange={setIsGroupStudy}
            disabled={isEditMode}
          />
        </div>
      </div>
      <div className="flex w-full  items-end gap-2">
        <LabeledSelector
          label="진행 학기"
          placeholder="학기를 선택해주세요"
          required
          options={semesterOptions}
          value={formData.semesterId?.toString() || ''}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, semesterId: value ? Number(value) : null }))
          }
          disabled={isEditMode}
        />
        <LabeledCalanderInput
          required
          label="진행기간"
          rangeMode={true}
          value={studyPeriod}
          placeholder="일시를 선택해주세요"
          onChange={(value) => {
            if (Array.isArray(value)) {
              setStudyPeriod(value);
            }
          }}
        />
      </div>

      <div className="flex w-full items-start gap-2">
        <LabeledMultiSelect
          required
          label="고정 요일"
          options={dayTypeOptionList}
          value={selectedDays}
          onChange={setSelectedDays}
        />
        <LabeledTimePicker
          required
          label="시작시간"
          placeholder="시간을 선택해주세요"
          value={selectedStartTime}
          onChange={setSelectedStartTime}
        />
      </div>

      <div className="flex w-full items-end  gap-2">
        <LabeledSelectButton
          required
          label="진행방식"
          options={studyTypeOptionList}
          value={isOnline}
          onChange={setIsOnline}
        />
        <LabeledInput
          required
          label="언어"
          placeholder="진행 언어를 입력해주세요."
          value={formData.lang || ''}
          onChange={(value) => setFormData((prev) => ({ ...prev, lang: value || null }))}
        />
      </div>

      <div className="flex w-full items-end  gap-2">
        <LabeledSelectButton
          required
          label="공개 여부"
          options={publicTypeOptionList}
          value={isPublic}
          onChange={setIsPublic}
        />
        <LabeledInput
          required
          label="스터디 한줄 소개"
          placeholder="스터디를 한줄 소개해주세요"
          value={formData.introduction || ''}
          onChange={(value) => setFormData((prev) => ({ ...prev, introduction: value || null }))}
        />
      </div>
      <InformaionSection cruitPeriod={cruitPeriod} setCruitPeriod={setCruitPeriod} />
      <div className="mt-2 w-full">
        <LabeledTextarea
          label="스터디 신청시 유의사항"
          placeholder="스터디에 대한 소개가 아닌 물리적인 유의사항 위주로 작성해주세요."
          value={formData.precaution || ''}
          onChange={(value) => setFormData((prev) => ({ ...prev, precaution: value || null }))}
        />
      </div>
      <div className="mt-4 flex w-full justify-center">
        <Button
          className="w-full max-w-[390px]"
          onClick={handleSubmit}
          disabled={createStudyMutation.isPending || updateStudyMutation.isPending}
        >
          {isEditMode
            ? updateStudyMutation.isPending
              ? '수정 중...'
              : '수정하기'
            : createStudyMutation.isPending
              ? '생성 중...'
              : '개설하기'}
        </Button>
      </div>
    </div>
  );
}
