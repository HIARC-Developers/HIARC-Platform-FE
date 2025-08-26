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
import { useRouter } from 'next/navigation';
import { CreateStudyRequest } from '@hiarc-platform/shared';
import { useSemesterStoreInit, useSemesterStore } from '@/shared/hooks/use-semester-store';
import { useEffect } from 'react';

interface CreateStudyFormProps {
  studyId?: number;
  isEditMode?: boolean;
}

export function CreateStudyForm({
  studyId,
  isEditMode = false,
}: CreateStudyFormProps = {}): React.ReactElement {
  const router = useRouter();
  const createStudyMutation = useCreateStudy();
  const updateStudyMutation = useUpdateStudy();
  const { data: initialData, isLoading: isLoadingInitialData } = useStudyInitialForm(studyId);

  // Initialize semester store on component mount
  useSemesterStoreInit();
  const { semesterOptions } = useSemesterStore();

  const [formData, setFormData] = useState<CreateStudyRequest>({
    name: '',
    bojHandle: '',
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
  const [isOnline, setIsOnline] = useState<string>('');
  const [isPublic, setIsPublic] = useState<string>('');

  // Initialize form data when initialData is loaded
  useEffect(() => {
    if (initialData && isEditMode) {
      setFormData({
        name: initialData.name || '',
        bojHandle: initialData.bojHandle || '',
        semesterId: initialData.semesterId || null,
        startDate: initialData.startDate || null,
        endDate: initialData.endDate || null,
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

  // 시간 형식을 HH:MM:SS로 정규화하는 함수
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
    if (!formData.name || !formData.bojHandle || !formData.semesterId) {
      DialogUtil.showError('필수 항목을 모두 입력해주세요.');
      return;
    }

    const studyRequest: CreateStudyRequest = {
      name: formData.name,
      bojHandle: formData.bojHandle,
      semesterId: formData.semesterId,
      startDate: studyPeriod[0]?.toISOString().split('T')[0] || null,
      endDate: studyPeriod[1]?.toISOString().split('T')[0] || null,
      scheduledDays: selectedDays.length > 0 ? selectedDays : null,
      startTime: selectedStartTime ? normalizeTimeFormat(selectedStartTime) : null,
      isOnline: isOnline === 'ONLINE' ? true : isOnline === 'IN_PERSON' ? false : null,
      isPublic: isPublic === 'PUBLIC' ? true : isPublic === 'PRIVATE' ? false : null,
      lang: formData.lang,
      introduction: formData.introduction,
      recruitmentStartAt: cruitPeriod[0]?.toISOString().split('T')[0] || null,
      recruitmentEndAt: cruitPeriod[1]?.toISOString().split('T')[0] || null,
      precaution: formData.precaution,
    };

    try {
      if (isEditMode && studyId) {
        // Edit mode: use update API
        const updateRequest = {
          // title, handle, semesterId는 수정 불가이므로 제외
          description: studyRequest.introduction || undefined,
          startDate: studyRequest.startDate || undefined,
          endDate: studyRequest.endDate || undefined,
          scheduledDays: studyRequest.scheduledDays || undefined,
          startTime: studyRequest.startTime || undefined,
          isOnline: studyRequest.isOnline || undefined,
          lang: studyRequest.lang || undefined,
          introduction: studyRequest.introduction || undefined,
          recruitmentStartAt: studyRequest.recruitmentStartAt || undefined,
          recruitmentEndAt: studyRequest.recruitmentEndAt || undefined,
          precaution: studyRequest.precaution || undefined,
          isPublic: studyRequest.isPublic || undefined,
        };
        await updateStudyMutation.mutateAsync({ studyId, data: updateRequest });
        DialogUtil.showSuccess('스터디가 성공적으로 수정되었습니다.', () => {
          router.push(`/study/${studyId}`);
        });
      } else {
        // Create mode
        await createStudyMutation.mutateAsync(studyRequest);
        DialogUtil.showSuccess('스터디가 성공적으로 생성되었습니다.', () => {
          router.push('/study');
        });
      }
    } catch (error) {
      console.error(isEditMode ? '스터디 수정 실패:' : '스터디 생성 실패:', error);
      DialogUtil.showError(
        isEditMode ? '스터디 수정에 실패했습니다.' : '스터디 생성에 실패했습니다.'
      );
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
      <div className="flex w-1/2 items-end gap-2">
        <LabeledInput
          label="스터디장"
          placeholder="스터디장의 핸들명을 입력해주세요"
          required
          value={formData.bojHandle}
          onChange={(value) => setFormData((prev) => ({ ...prev, bojHandle: value }))}
          disabled={isEditMode}
        />
        <Button variant="fill" size="md" className="w-25 px-9 text-md" disabled={isEditMode}>
          확인
        </Button>
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
          label="고정 요일"
          options={dayTypeOptionList}
          value={selectedDays}
          onChange={setSelectedDays}
        />
        <LabeledTimePicker
          label="시작시간"
          placeholder="시간을 선택해주세요"
          value={selectedStartTime}
          onChange={setSelectedStartTime}
        />
      </div>

      <div className="flex w-full items-end  gap-2">
        <LabeledSelectButton
          label="진행방식"
          options={studyTypeOptionList}
          value={isOnline}
          onChange={setIsOnline}
        />
        <LabeledInput
          label="언어"
          placeholder="진행 언어를 입력해주세요."
          value={formData.lang || ''}
          onChange={(value) => setFormData((prev) => ({ ...prev, lang: value || null }))}
        />
      </div>

      <div className="flex w-full items-end  gap-2">
        <LabeledSelectButton
          label="공개 여부"
          options={publicTypeOptionList}
          value={isPublic}
          onChange={setIsPublic}
        />
        <LabeledInput
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
