import { useState, useCallback } from 'react';
import useSignUp from '@/features/auth/hooks/mutation/use-sign-up';
import useHandleValidation from '@/features/auth/hooks/mutation/use-handle-validation';
import { Grade, AbsenceStatus, SignupRequest } from '@/features/auth/types/request/signup-request';

interface SignupFormData {
  name: string;
  phoneAddress: string;
  studentId: string;
  department: string;
  isDoubleMajor: boolean;
  grade: Grade;
  absenceStatus: AbsenceStatus;
  bojHandle: string;
  selectedDepartments: string[];
  languages: string[];
  languageLevel: string;
  motivations: string[];
  expectedActivity: string;
  languagesAsString: string;
  motivationAsString: string;
}

interface FormErrors {
  name?: string;
  phoneAddress?: string;
  studentId?: string;
  department?: string;
  bojHandle?: string;
  languagesAsString?: string;
  motivationAsString?: string;
}

export function useSignupPageState() {
  const signUpMutation = useSignUp();
  const handleValidationMutation = useHandleValidation();

  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    phoneAddress: '',
    studentId: '',
    department: '',
    isDoubleMajor: false,
    grade: Grade.FRESHMAN,
    absenceStatus: AbsenceStatus.ENROLLED,
    bojHandle: '',
    selectedDepartments: [],
    languages: [],
    languageLevel: '',
    motivations: [],
    expectedActivity: '',
    languagesAsString: '',
    motivationAsString: '',
  });

  const [isCustomDepartment, setIsCustomDepartment] = useState(false);
  const [isHandleValidated, setIsHandleValidated] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (field: keyof FormErrors, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) {
          return '이름을 입력해주세요.';
        }
        if (value.trim().length < 2) {
          return '이름은 2글자 이상 입력해주세요.';
        }
        break;
      case 'phoneAddress':
        if (!value.trim()) {
          return '전화번호를 입력해주세요.';
        }
        if (!/^\d{10,11}$/.test(value.replace(/\D/g, ''))) {
          return '올바른 전화번호 형식을 입력해주세요.';
        }
        break;
      case 'studentId':
        if (!value.trim()) {
          return '학번을 입력해주세요.';
        }
        if (!/^[A-Z]\d{6}$/.test(value)) {
          return '올바른 학번 형식을 입력해주세요. (예: C123456)';
        }
        break;
      case 'department':
        if (!value.trim()) {
          return '학과를 선택해주세요.';
        }
        break;
      case 'bojHandle':
        if (!value.trim()) {
          return 'BOJ 핸들을 입력해주세요.';
        }
        if (value.trim().length < 3) {
          return 'BOJ 핸들은 3글자 이상 입력해주세요.';
        }
        break;
      case 'languagesAsString':
        if (formData.languages.includes('기타') && !value.trim()) {
          return '다른 언어를 입력해주세요.';
        }
        break;
      case 'motivationAsString':
        if (formData.motivations.includes('기타') && !value.trim()) {
          return '다른 동기를 입력해주세요.';
        }
        break;
      default:
        return undefined;
    }
    return undefined;
  };

  const handleInputChange =
    (field: keyof SignupFormData) => (value: string | number | boolean | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      if (field === 'bojHandle') {
        setIsHandleValidated(false);
      }

      if (
        typeof value === 'string' &&
        [
          'name',
          'phoneAddress',
          'studentId',
          'department',
          'bojHandle',
          'languagesAsString',
          'motivationAsString',
        ].includes(field)
      ) {
        const error = validateField(field as keyof FormErrors, value);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    };

  const validateAdditionalFields = useCallback((): void => {
    // languagesAsString 검증
    if (formData.languages.includes('기타')) {
      const languageError = !formData.languagesAsString.trim()
        ? '다른 언어를 입력해주세요.'
        : undefined;
      setErrors((prev) => ({ ...prev, languagesAsString: languageError }));
    } else {
      setErrors((prev) => ({ ...prev, languagesAsString: undefined }));
    }

    // motivationAsString 검증
    if (formData.motivations.includes('기타')) {
      const motivationError = !formData.motivationAsString.trim()
        ? '다른 동기를 입력해주세요.'
        : undefined;
      setErrors((prev) => ({ ...prev, motivationAsString: motivationError }));
    } else {
      setErrors((prev) => ({ ...prev, motivationAsString: undefined }));
    }
  }, [
    formData.languages,
    formData.motivations,
    formData.languagesAsString,
    formData.motivationAsString,
  ]);

  const handleValidateHandle = (): void => {
    if (!formData.bojHandle || formData.bojHandle.length < 3) {
      return;
    }

    handleValidationMutation.mutate(formData.bojHandle, {
      onSuccess: (data) => {
        if (data.isAvailable) {
          setIsHandleValidated(true);
        }
      },
    });
  };

  const handleSubmit = (): void => {
    const hasErrors = Object.values(errors).some((error) => error);

    if (hasErrors) {
      return;
    }

    if (!isHandleValidated) {
      alert('백준 핸들을 먼저 인증해주세요.');
      return;
    }

    // languages에 languagesAsString 추가 및 '없음' 처리
    let finalLanguages = [...formData.languages];
    if (formData.languagesAsString.trim()) {
      finalLanguages.push(formData.languagesAsString.trim());
    }

    // '없음'이 포함되어 있으면 빈 배열로 변환
    if (finalLanguages.includes('없음')) {
      finalLanguages = [];
    }

    // motivations에 motivationAsString 추가
    const finalMotivations = [...formData.motivations];
    if (formData.motivationAsString.trim()) {
      finalMotivations.push(formData.motivationAsString.trim());
    }

    const payload: SignupRequest = {
      name: formData.name,
      phoneAddress: formData.phoneAddress,
      studentId: formData.studentId,
      department: formData.department,
      isDoubleMajor: formData.isDoubleMajor,
      grade: formData.grade,
      absenceStatus: formData.absenceStatus,
      bojHandle: formData.bojHandle,
      languages: finalLanguages,
      motivations: finalMotivations,
      expectedActivity: formData.expectedActivity,
    };

    // languages가 비어있지 않을 때만 languageLevel 추가
    if (finalLanguages.length > 0) {
      (payload as SignupRequest & { languageLevel: string }).languageLevel = formData.languageLevel;
    }

    signUpMutation.mutate(payload);
  };

  const isFormValid =
    formData.name &&
    formData.phoneAddress &&
    formData.studentId &&
    formData.department &&
    formData.grade &&
    formData.absenceStatus &&
    formData.bojHandle &&
    isHandleValidated &&
    (formData.languages.includes('없음') || formData.languageLevel) &&
    (!formData.languages.includes('기타') || formData.languagesAsString.trim()) &&
    formData.motivations.length > 0 &&
    (!formData.motivations.includes('기타') || formData.motivationAsString.trim()) &&
    formData.expectedActivity.trim();

  return {
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
  };
}
