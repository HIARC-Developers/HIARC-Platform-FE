'use client';

import { useEffect } from 'react';
import { BojGuideButton } from '@/features/auth/components/boj-guide-button/boj-guide-button';
import { useSignupPageState } from '@/features/auth/hooks/page/use-signup-page-state';
import { Grade, AbsenceStatus } from '@/features/auth/types/request/signup-request';
import {
  Button,
  FadeIn,
  Label,
  LabeledCheckboxList,
  LabeledInput,
  LabeledSelectButton,
  LabeledSelector,
  Title,
} from '@hiarc-platform/ui';

interface SelectData {
  value: string;
  label: string;
}

const gradeOptions: SelectData[] = [
  { value: Grade.FRESHMAN, label: '1학년' },
  { value: Grade.SOPHOMORE, label: '2학년' },
  { value: Grade.JUNIOR, label: '3학년' },
  { value: Grade.SENIOR, label: '4학년' },
  { value: Grade.OVER, label: '5학년 이상' },
];

const doubleMajorOptions: SelectData[] = [
  { value: '복수전공 미진행', label: '복수전공 미진행' },
  { value: '복수전공 진행', label: '복수전공 진행' },
];

const absenceStatusOptions: SelectData[] = [
  { value: AbsenceStatus.ENROLLED, label: '재학 중' },
  { value: AbsenceStatus.ON_LEAVE, label: '일반 휴학' },
  { value: AbsenceStatus.MILITARY_LEAVE, label: '군휴학' },
];

const departmentOptions: SelectData[] = [
  { value: '컴퓨터공학과', label: '컴퓨터공학과' },
  { value: '정보컴퓨터공학부', label: '정보컴퓨터공학부' },
  { value: '컴퓨터데이터공학부', label: '컴퓨터데이터공학부' },
  { value: '자율전공학부', label: '자율전공학부' },
  { value: '기계시스템디자인공학과', label: '기계시스템디자인공학과' },
  { value: '산업데이터공학과', label: '산업데이터공학과' },
  { value: '시각디자인전공', label: '시각디자인전공' },
  { value: '전자전기공학부', label: '전자전기공학부' },
  { value: '기타', label: '기타' },
];

const languageOptions: SelectData[] = [
  { value: '없음', label: '없음' },
  { value: 'C/C++', label: 'C/C++' },
  { value: 'Python', label: 'Python' },
  { value: 'Java', label: 'Java' },
  { value: '기타', label: '기타' },
];

const languageLevelOptions: SelectData[] = [
  {
    value: '거의 모른다. (기본 입/출력만 할 줄 안다.)',
    label: '거의 모른다. (기본 입/출력만 할 줄 안다.)',
  },
  {
    value: '조금 알고 있다. (기본 문법만 알고 있다. ex) 조건문, 반복문)',
    label: '조금 알고 있다. (기본 문법만 알고 있다. ex) 조건문, 반복문)',
  },
  {
    value: '잘 알고 있다. (기초 알고리즘을 다룰 수 있다.)',
    label: '잘 알고 있다. (기초 알고리즘을 다룰 수 있다.)',
  },
  {
    value: '매우 잘 알고 있다.',
    label: '매우 잘 알고 있다.',
  },
];

const motivationOptions: SelectData[] = [
  {
    value: '기초 알고리즘 실력 향상',
    label: '기초 알고리즘 실력 향상',
  },
  {
    value: '코딩 테스트 준비',
    label: '코딩 테스트 준비',
  },
  {
    value: '대회 준비',
    label: '대회 준비',
  },
  {
    value: '친목 도모',
    label: '친목 도모',
  },
  {
    value: '기타',
    label: '기타',
  },
];

interface SignupFormProps {
  className?: string;
}

export function SignupForm({ className }: SignupFormProps): React.ReactElement {
  const {
    formData,
    errors,
    isCustomDepartment,
    setIsCustomDepartment,
    isHandleValidated,
    signUpMutation,
    handleValidationMutation,
    isFormValid,
    handleInputChange,
    handleValidateHandle,
    handleSubmit,
    validateAdditionalFields,
  } = useSignupPageState();

  // 기타 필드 표시 상태 변경 시 즉시 검증
  useEffect(() => {
    if (formData.languages.includes('기타') || formData.motivations.includes('기타')) {
      validateAdditionalFields();
    }
  }, [formData.languages, formData.motivations, validateAdditionalFields]);

  const handleLanguageChange = (values: string[]): void => {
    // '없음'이 포함되어 있고 다른 값도 있다면
    if (values.includes('없음') && values.length > 1) {
      // 새로 추가된 값이 '없음'이라면 '없음'만 남기기
      const prevLanguages = formData.languages;
      const newlyAdded = values.find((value) => !prevLanguages.includes(value));

      if (newlyAdded === '없음') {
        handleInputChange('languages')(['없음']);
        handleInputChange('languagesAsString')('');
        handleInputChange('languageLevel')('');
      } else {
        // 다른 값이 새로 추가되었다면 '없음' 제거
        const filteredValues = values.filter((value) => value !== '없음');
        handleInputChange('languages')(filteredValues);
      }
    } else if (values.includes('없음')) {
      // '없음'만 선택된 경우
      handleInputChange('languages')(['없음']);
      handleInputChange('languagesAsString')('');
      handleInputChange('languageLevel')('');
    } else {
      // '없음'이 없는 경우
      handleInputChange('languages')(values);

      // '기타'가 해제되었으면 languagesAsString 초기화
      if (!values.includes('기타') && formData.languages.includes('기타')) {
        handleInputChange('languagesAsString')('');
      }
    }

    // 언어 변경 후 추가 필드 검증
    setTimeout(() => validateAdditionalFields(), 0);
  };

  return (
    <div className={`flex w-full flex-col gap-4 ${className || ''}`}>
      <Title size="sm" weight="bold" className="justify-center text-gray-900">
        가입하기
      </Title>
      <Label size="md" weight="bold" className="mt-4">
        기본 정보
      </Label>
      <LabeledInput
        label="이름"
        required={true}
        placeholder="이름을 입력해주세요"
        value={formData.name}
        onChange={(value: string) => handleInputChange('name')(value)}
        error={errors.name}
      />
      <LabeledInput
        label="전화번호"
        required={true}
        placeholder="010-0000-0000"
        value={formData.phoneAddress}
        onChange={(value: string) => {
          const numbersOnly = value.replace(/\D/g, '');
          let formatted = numbersOnly;

          if (numbersOnly.length > 3 && numbersOnly.length <= 7) {
            formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
          } else if (numbersOnly.length > 7) {
            formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
          }

          handleInputChange('phoneAddress')(formatted);
        }}
        error={errors.phoneAddress}
      />
      <LabeledInput
        label="학번"
        required={true}
        placeholder="학번을 입력해주세요"
        value={formData.studentId}
        onChange={(value: string) => handleInputChange('studentId')(value)}
        error={errors.studentId}
      />
      <LabeledSelector
        label="학과"
        placeholder="학과을 입력해주세요"
        required={true}
        options={departmentOptions}
        value={isCustomDepartment ? '기타' : formData.department}
        onChange={(value: string) => {
          if (value === '기타') {
            setIsCustomDepartment(true);
            handleInputChange('department')('');
          } else {
            setIsCustomDepartment(false);
            handleInputChange('department')(value);
          }
        }}
      />
      {isCustomDepartment && (
        <LabeledInput
          label="학과명"
          required={true}
          placeholder="학과명을 입력해주세요"
          value={formData.department}
          onChange={(value: string) => handleInputChange('department')(value)}
          error={errors.department}
        />
      )}
      <LabeledSelectButton
        label="복수전공 여부"
        required={true}
        options={doubleMajorOptions}
        value={formData.isDoubleMajor ? '복수전공 진행' : '복수전공 미진행'}
        onChange={(value: string) => handleInputChange('isDoubleMajor')(value === '복수전공 진행')}
      />
      <LabeledSelector
        required={true}
        label="학년"
        placeholder="학년을 입력해주세요"
        options={gradeOptions}
        value={formData.grade}
        onChange={(value: string) => handleInputChange('grade')(value as Grade)}
      />
      <LabeledSelectButton
        label="재학여부"
        required={true}
        options={absenceStatusOptions}
        value={formData.absenceStatus}
        onChange={(value: string) => {
          handleInputChange('absenceStatus')(value as AbsenceStatus);
        }}
      />
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full">
          <Label size="md" weight="medium">
            백준 핸들
          </Label>
          <span className="relative -top-[2px] ml-0.5 text-red">*</span>
        </div>
        <div className="flex w-full items-start gap-2">
          <LabeledInput
            label=""
            placeholder="백준 핸들을 입력해주세요"
            value={formData.bojHandle}
            onChange={(value) => handleInputChange('bojHandle')(value)}
            error={errors.bojHandle}
          />
          <Button
            variant="fill"
            size="md"
            onClick={handleValidateHandle}
            disabled={
              !formData.bojHandle ||
              formData.bojHandle.length < 3 ||
              handleValidationMutation.isPending ||
              isHandleValidated
            }
            className="mt-2"
          >
            {handleValidationMutation.isPending
              ? '확인중...'
              : isHandleValidated
                ? '인증완료'
                : '인증하기'}
          </Button>
        </div>
        <BojGuideButton />
      </div>

      <div className="flex flex-col gap-4 py-4">
        <Label size="md" weight="bold">
          추가 정보
        </Label>
        <LabeledCheckboxList
          label="Q1. 지금까지 사용해 본 프로그래밍 언어는 무엇인가요?"
          subtitle="* 중복 선택 가능합니다."
          items={languageOptions}
          multiple={true}
          required={true}
          selectedValues={formData.languages}
          onSelectionChange={handleLanguageChange}
        />

        {formData.languages.includes('기타') && (
          <FadeIn
            isVisible={formData.languages.includes('기타')}
          >
            <LabeledInput
              label=""
              showLabel={false}
              placeholder="다른 언어를 입력해주세요"
              value={formData.languagesAsString}
              onChange={(value: string) => handleInputChange('languagesAsString')(value)}
              error={formData.languagesAsString.trim() ? undefined : '다른 언어를 입력해주세요'}
            />
          </FadeIn>
        )}

        {!formData.languages.includes('없음') && formData.languages.length > 0 && (
          <FadeIn isVisible={!formData.languages.includes('없음') && formData.languages.length > 0}>
            <LabeledCheckboxList
              label="Q1-1. 1번에서 선택한 언어의 실력은 어느 정도인가요?"
              subtitle="* 선택한 언어 중 가장 높은 실력으로 선택해주세요."
              items={languageLevelOptions}
              multiple={false}
              required={true}
              selectedValue={formData.languageLevel}
              onSingleSelectionChange={(value) => handleInputChange('languageLevel')(value || '')}
            />
          </FadeIn>
        )}

        <LabeledCheckboxList
          label="Q2. 하이아크에 지원하게 된 동기는 무엇인가요?"
          subtitle="* 중복 선택 가능합니다."
          required={true}
          items={motivationOptions}
          multiple={true}
          selectedValues={formData.motivations}
          onSelectionChange={(values) => {
            handleInputChange('motivations')(values);

            // '기타'가 해제되었으면 motivationAsString 초기화
            if (!values.includes('기타') && formData.motivations.includes('기타')) {
              handleInputChange('motivationAsString')('');
            }

            // '기타'가 새로 선택되었고 motivationAsString이 비어있으면 즉시 에러 표시
            if (
              values.includes('기타') &&
              !formData.motivations.includes('기타') &&
              !formData.motivationAsString.trim()
            ) {
              handleInputChange('motivationAsString')('');
              setTimeout(() => validateAdditionalFields(), 10);
            } else {
              // 동기 변경 후 추가 필드 검증
              setTimeout(() => validateAdditionalFields(), 0);
            }
          }}
        />

        {formData.motivations.includes('기타') && (
          <FadeIn isVisible={formData.motivations.includes('기타')}>
            <LabeledInput
              label=""
              showLabel={false}
              placeholder="다른 동기를 입력해주세요"
              value={formData.motivationAsString}
              onChange={(value: string) => handleInputChange('motivationAsString')(value)}
              error={formData.motivationAsString.trim() ? undefined : '다른 동기를 입력해주세요'}
            />
          </FadeIn>
        )}

        <LabeledInput
          label="Q3. 하이아크에 바라는 활동을 적어주시기 바랍니다."
          required={true}
          placeholder="자유롭게 작성해주세요."
          value={formData.expectedActivity}
          onChange={(value: string) => handleInputChange('expectedActivity')(value)}
        />
      </div>

      <Button
        variant="fill"
        size="lg"
        className="w-full"
        type="submit"
        onClick={handleSubmit}
        disabled={!isFormValid || signUpMutation.isPending}
      >
        {signUpMutation.isPending ? '가입 중...' : '회원가입'}
      </Button>
    </div>
  );
}
