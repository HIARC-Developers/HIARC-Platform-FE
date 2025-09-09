import { useState, useEffect } from 'react';
import { Announcement, CreateAnnouncementForm, ImageSource } from '@hiarc-platform/shared';
import { DialogUtil } from '../utils/dialog-util';

interface UseAnnouncementFormProps {
  announcementId?: number;
  announcement?: Announcement;
  initialAnnouncementType?: 'GENERAL' | 'STUDY' | 'RATING' | 'ETC' | 'EXTERNAL';
  initialStudyId?: number;
  initialStudyAnnounceType?: '일반' | '회차별 공지';
  onSubmit?(data: CreateAnnouncementForm, isEditMode: boolean, announcementId?: number): void;
}

export interface AnnouncementFormData extends CreateAnnouncementForm {
  publicType?: '공개' | '비공개';
  studyAnnounceType?: '일반' | '회차별 공지';
  applyType?: '신청 없음' | '신청 유형';
}

export function useAnnouncementForm({
  announcementId,
  announcement,
  initialAnnouncementType = 'GENERAL',
  initialStudyId,
  initialStudyAnnounceType = '일반',
  onSubmit,
}: UseAnnouncementFormProps) {
  const isEditMode = Boolean(announcementId);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<AnnouncementFormData>({
    title: '',
    place: undefined,
    scheduleStartAt: undefined,
    scheduleEndAt: undefined,
    content: '',
    announcementType: initialAnnouncementType,
    isPublic: true,
    attachmentUrls: [],
    images: [],
    studyId: initialStudyId,
    lectureRound: undefined,
    applicationUrl: undefined,
    applicationStartAt: undefined,
    applicationEndAt: undefined,
    publicType: '공개',
    studyAnnounceType: initialStudyAnnounceType,
    applyType: '신청 없음',
  });

  // 공지사항 데이터로 폼 초기화 (수정 모드일 때)
  useEffect(() => {
    if (isEditMode && announcement) {
      setFormData({
        title: announcement.title || '',
        place: announcement.place || undefined,
        scheduleStartAt: announcement.scheduleStartAt,
        scheduleEndAt: announcement.scheduleEndAt,
        content: announcement.content || '',
        announcementType: announcement.announcementType || 'GENERAL',
        isPublic: announcement.isPublic ?? true,
        attachmentUrls: announcement.attachmentUrls?.filter((url) => url.trim() !== '') || [],
        images: [],
        imageSources: announcement.imageUrls,
        studyId: announcement.studyId,
        lectureRound: announcement.lectureRound,
        applicationUrl: announcement.applicationUrl,
        applicationStartAt: announcement.applicationStartAt,
        applicationEndAt: announcement.applicationEndAt,
        publicType: announcement.isPublic ? '공개' : '비공개',
        studyAnnounceType: announcement.lectureRound ? '회차별 공지' : '일반',
        applyType:
          announcement.applicationUrl ||
          announcement.applicationStartAt ||
          announcement.applicationEndAt
            ? '신청 유형'
            : '신청 없음',
      });
    }
  }, [isEditMode, announcement]);

  // URL 관리 함수
  const addUrl = (): void => {
    setFormData((prev) => ({ ...prev, attachmentUrls: [...(prev.attachmentUrls || []), ''] }));
  };

  const updateUrl = (index: number, value: string): void => {
    const newUrls = [...(formData.attachmentUrls || [])];
    newUrls[index] = value;
    setFormData((prev) => ({ ...prev, attachmentUrls: newUrls }));
  };

  const removeUrl = (index: number): void => {
    const currentUrls = formData.attachmentUrls || [];
    if (currentUrls.length > 1) {
      const newUrls = currentUrls.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, attachmentUrls: newUrls }));
    }
  };

  // 이미지 관리 함수
  const handleImageChange = (images: File[]): void => {
    console.log('새 이미지 변경됨:', images);
    setFormData((prev) => ({
      ...prev,
      images: [...images],
    }));
  };

  const handleExistingImageChange = (images: ImageSource[]): void => {
    console.log('기존 이미지 변경됨:', images);
    setFormData((prev) => ({
      ...prev,
      imageSources: [...images],
    }));
  };

  // formData 업데이트 헬퍼 함수
  const updateFormData = (updates: Partial<AnnouncementFormData>): void => {
    console.log('updateFormData 호출됨:', updates);
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      console.log('업데이트된 formData:', newData);
      return newData;
    });
  };

  // 날짜를 YYYY-MM-DD 형태로 포맷하는 헬퍼 함수
  const formatDateToLocalString = (date: Date | string | undefined): string | undefined => {
    if (!date) {
      return undefined;
    }

    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return undefined;
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 날짜시간을 로컬 시간대 기준 ISO 문자열로 변환하는 헬퍼 함수
  const formatDateTimeToLocalISOString = (date: Date | string | undefined): string | undefined => {
    if (!date) {
      return undefined;
    }

    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj.getTime())) {
      return undefined;
    }

    const timezoneOffset = dateObj.getTimezoneOffset() * 60000;
    const localDate = new Date(dateObj.getTime() - timezoneOffset);
    return localDate.toISOString();
  };

  // 폼 제출 함수
  const handleSubmit = (): void => {
    console.log('폼 제출 시 formData:', formData);
    if (!formData.title.trim() || !formData.content.trim() || !formData.announcementType) {
      DialogUtil.showError('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 신청 유형이 선택된 경우 필수 입력 검증
    if (formData.applyType === '신청 유형') {
      if (
        !formData.applicationStartAt ||
        !formData.applicationEndAt ||
        !formData.applicationUrl?.trim()
      ) {
        DialogUtil.showError(
          '신청 유형을 선택한 경우 신청 시작일, 신청 종료일, 신청 URL을 모두 입력해주세요.'
        );
        return;
      }
    }

    // 회차별 공지가 선택된 경우 회차 입력 검증
    if (formData.announcementType === 'STUDY' && formData.studyAnnounceType === '회차별 공지') {
      if (!formData.lectureRound) {
        DialogUtil.showError('회차별 공지를 선택한 경우 회차를 입력해주세요.');
        return;
      }
    }

    // 최종 데이터 정리
    const requestData: CreateAnnouncementForm = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      place: formData.place?.trim() || undefined,
      scheduleStartAt: formatDateTimeToLocalISOString(formData.scheduleStartAt),
      scheduleEndAt: formatDateTimeToLocalISOString(formData.scheduleEndAt),
      announcementType: formData.announcementType,
      isPublic: formData.publicType === '공개',
      attachmentUrls: (formData.attachmentUrls || []).filter((url) => url.trim() !== ''),
      images: formData.images || [],
      imageSources: formData.imageSources || [],
      studyId: formData.studyId,
      lectureRound: formData.lectureRound,
      applicationUrl: formData.applicationUrl?.trim() || null,
      applicationStartAt: formatDateToLocalString(formData.applicationStartAt || undefined) || null,
      applicationEndAt: formatDateToLocalString(formData.applicationEndAt || undefined) || null,
    };

    // STUDY 카테고리일 때만 회차별 공지 처리
    if (formData.announcementType === 'STUDY') {
      if (formData.studyAnnounceType !== '회차별 공지') {
        requestData.lectureRound = undefined;
      }
    }

    // 콜백 호출
    if (onSubmit) {
      onSubmit(requestData, isEditMode, announcementId);
    }
  };

  return {
    formData,
    isEditMode,
    currentStep,
    setCurrentStep,
    addUrl,
    updateUrl,
    removeUrl,
    handleImageChange,
    handleExistingImageChange,
    updateFormData,
    handleSubmit,
  };
}
