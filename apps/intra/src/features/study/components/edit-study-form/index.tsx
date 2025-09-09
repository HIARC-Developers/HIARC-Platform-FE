'use client';
import {
  Label,
  LabeledInput,
  LabeledSelectButton,
  DialogUtil,
  Button,
  LabeledSelector,
  LabeledMultiSelect,
  LabeledTimePicker,
  InformaionSection,
  LabeledTextarea,
  LabeledCalanderInput,
} from '@hiarc-platform/ui';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreateStudyRequest } from '@hiarc-platform/shared';
import { useStudyInitialForm } from '../../hooks/study-instructor/query/use-study-initial-form';
import { useUpdateStudy } from '../../hooks/study-instructor/mutation/use-update-study';

interface EditStudyFormProps {
  studyId: number;
}

export function EditStudyForm({ studyId }: EditStudyFormProps): React.ReactElement {
  const router = useRouter();
  const updateStudyMutation = useUpdateStudy();
  const { data: studyData } = useStudyInitialForm(studyId);

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
  const [isOnline, setIsOnline] = useState<string>('');
  const [isPublic, setIsPublic] = useState<string>('');

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

  // 학기 옵션 (임시)
  const semesterOptions = [
    { label: '2024년 1학기', value: '1' },
    { label: '2024년 2학기', value: '2' },
  ];

  // Initialize form data when studyData is loaded
  useEffect(() => {
    if (studyData) {
      setFormData({
        name: studyData.name || '',
        bojHandle: studyData.bojHandle || '',
        isGroupStudy: studyData.isGroupStudy || false,
        semesterId: studyData.semesterId || null,
        startDate: studyData.startDate || null,
        endDate: studyData.endDate || null,
        scheduledDays: studyData.scheduledDays || null,
        startTime: studyData.startTime || null,
        isOnline: studyData.isOnline || null,
        lang: studyData.lang || null,
        introduction: studyData.introduction || null,
        recruitmentStartAt: studyData.recruitmentStartAt || null,
        recruitmentEndAt: studyData.recruitmentEndAt || null,
        precaution: studyData.precaution || null,
      });

      // Set date ranges
      if (studyData.startDate && studyData.endDate) {
        setStudyPeriod([new Date(studyData.startDate), new Date(studyData.endDate)]);
      }
      if (studyData.recruitmentStartAt && studyData.recruitmentEndAt) {
        setCruitPeriod([
          new Date(studyData.recruitmentStartAt),
          new Date(studyData.recruitmentEndAt),
        ]);
      }

      // Set other form values
      if (studyData.scheduledDays) {
        setSelectedDays(studyData.scheduledDays);
      }
      if (studyData.startTime) {
        setSelectedStartTime(studyData.startTime);
      }
      if (studyData.isOnline !== null) {
        setIsOnline(studyData.isOnline ? 'ONLINE' : 'IN_PERSON');
      }
      if (studyData.isPublic !== null) {
        setIsPublic(studyData.isPublic ? 'PUBLIC' : 'PRIVATE');
      }
    }
  }, [studyData]);

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
      isGroupStudy: formData.isGroupStudy,
      semesterId: formData.semesterId,
      startDate: toLocalDateString(studyPeriod[0]),
      endDate: toLocalDateString(studyPeriod[1]),
      scheduledDays: selectedDays.length > 0 ? selectedDays : null,
      startTime: selectedStartTime ? normalizeTimeFormat(selectedStartTime) : null,
      isOnline: isOnline === 'ONLINE' ? true : isOnline === 'IN_PERSON' ? false : null,
      isPublic: isPublic === 'PUBLIC' ? true : isPublic === 'PRIVATE' ? false : null,
      lang: formData.lang,
      introduction: formData.introduction,
      recruitmentStartAt: toLocalDateString(cruitPeriod[0]),
      recruitmentEndAt: toLocalDateString(cruitPeriod[1]),
      precaution: formData.precaution,
    };

    try {
      const updateRequest = {
        description: studyRequest.introduction || undefined,
        startDate: studyRequest.startDate || undefined,
        endDate: studyRequest.endDate || undefined,
        scheduledDays: studyRequest.scheduledDays || undefined,
        startTime: studyRequest.startTime || undefined,
        isOnline: studyRequest.isOnline ?? undefined,
        lang: studyRequest.lang || undefined,
        introduction: studyRequest.introduction || undefined,
        recruitmentStartAt: studyRequest.recruitmentStartAt || undefined,
        recruitmentEndAt: studyRequest.recruitmentEndAt || undefined,
        precaution: studyRequest.precaution || undefined,
        isPublic: studyRequest.isPublic ?? undefined,
      };
      await updateStudyMutation.mutateAsync({ studyId, data: updateRequest });
      DialogUtil.showSuccess('스터디가 성공적으로 수정되었습니다.', () => {
        router.push(`/study/${studyId}`);
      });
    } catch (error) {
      console.error('스터디 수정 실패:', error);
      DialogUtil.showError('스터디 수정에 실패했습니다.');
    }
  };

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
        disabled={true}
      />
      <div className="flex w-1/2 items-end gap-2">
        <LabeledInput
          label="스터디장"
          placeholder="스터디장의 핸들명을 입력해주세요"
          required
          value={formData.bojHandle}
          onChange={(value) => setFormData((prev) => ({ ...prev, bojHandle: value }))}
          disabled={true}
        />
        <Button variant="fill" size="md" className="w-25 px-9 text-md" disabled={true}>
          확인
        </Button>
      </div>
      <div className="flex w-full items-end gap-2">
        <LabeledSelector
          label="진행 학기"
          placeholder="학기를 선택해주세요"
          required
          options={semesterOptions}
          value={formData.semesterId?.toString() || ''}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, semesterId: value ? Number(value) : null }))
          }
          disabled={true}
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

      <div className="flex w-full items-end gap-2">
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

      <div className="flex w-full items-end gap-2">
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
          disabled={updateStudyMutation.isPending}
        >
          {updateStudyMutation.isPending ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </div>
  );
}
