'use client';

import { useState, useEffect } from 'react';
import { SideBar } from './side-bar';
import { Announcement, SelectOption, CreateAnnouncementForm, ImageSource } from '@hiarc-platform/shared';
import { UrlInput } from './url-input';
import { Button } from '../button';
import { LabeledCalanderInput } from '../input/labeled-calander-input';
import { LabeledInput } from '../input/labeled-input';
import { LabeledTextarea } from '../input/labeled-textarea';
import { DialogUtil } from '../../utils/dialog-util';
import { LabeledImageInput } from '../input/labeled-image-input';

interface DetailInformationSectionProps {
  announcementId?: number;
  announcement?: Announcement;
  initialAnnouncementType?: 'GENERAL' | 'STUDY' | 'RATING' | 'ETC' | 'EXTERNAL';
  initialStudyId?: number;
  initialStudyAnnounceType?: '일반' | '회차별 공지';
  studyOptions?: SelectOption[];
  disableCategoryChange?: boolean;
  disableStudyTypeChange?: boolean;
  onSubmit?(data: CreateAnnouncementForm, isEditMode: boolean, announcementId?: number): void;
}

export default function DetailInformationSection({
  announcementId,
  announcement,
  initialAnnouncementType = 'GENERAL',
  initialStudyId,
  initialStudyAnnounceType = '일반',
  studyOptions = [],
  disableCategoryChange = false,
  disableStudyTypeChange = false,
  onSubmit,
}: DetailInformationSectionProps): React.ReactElement {
  const isEditMode = Boolean(announcementId);

  // CreateAnnouncementRequest 상태
  const [formData, setFormData] = useState<CreateAnnouncementForm>({
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
  });

  // UI 관련 상태
  const [applyType, setApplyType] = useState<string>('신청 없음');
  const [studyAnnounceType, setStudyAnnounceType] = useState<string>(initialStudyAnnounceType);
  const [publicType, setPublicType] = useState<string>('공개');
  const [attachmentUrls, setAttachmentUrls] = useState<string[]>(['']);
  const [scheduleStartAt, setScheduleStartAt] = useState<Date | null>(null);
  const [scheduleEndAt, setScheduleEndAt] = useState<Date | null>(null);
  const [applicationStartDate, setApplicationStartDate] = useState<Date | null>(null);
  const [applicationEndDate, setApplicationEndDate] = useState<Date | null>(null);

  // 공지사항 데이터로 폼 초기화 (수정 모드일 때)
  useEffect(() => {
    if (isEditMode && announcement) {
      setFormData({
        title: announcement.title || '',
        place: announcement.place || undefined,
        scheduleStartAt: announcement.scheduleStartAt
          ? announcement.scheduleStartAt instanceof Date
            ? announcement.scheduleStartAt.toISOString()
            : announcement.scheduleStartAt
          : undefined,
        scheduleEndAt: announcement.scheduleEndAt
          ? announcement.scheduleEndAt instanceof Date
            ? announcement.scheduleEndAt.toISOString()
            : announcement.scheduleEndAt
          : undefined,
        content: announcement.content || '',
        announcementType: announcement.announcementType || 'GENERAL',
        isPublic: announcement.isPublic ?? true,
        attachmentUrls: announcement.attachmentUrls?.filter((url) => url.trim() !== '') || [],
        images: [],
        imageSources: announcement.imageUrls,
        studyId: announcement.studyId,
        lectureRound: announcement.lectureRound,
        applicationUrl: announcement.applicationUrl,
        applicationStartAt: announcement.applicationStartAt
          ? announcement.applicationStartAt instanceof Date
            ? announcement.applicationStartAt.toISOString()
            : announcement.applicationStartAt
          : undefined,
        applicationEndAt: announcement.applicationEndAt
          ? announcement.applicationEndAt instanceof Date
            ? announcement.applicationEndAt.toISOString()
            : announcement.applicationEndAt
          : undefined,
      });

      // UI 상태들 설정
      setAttachmentUrls(announcement.attachmentUrls?.length ? announcement.attachmentUrls : ['']);
      setPublicType(announcement.isPublic ? '공개' : '비공개');

      // 날짜 파싱
      if (announcement.scheduleStartAt) {
        setScheduleStartAt(new Date(announcement.scheduleStartAt));
      }
      if (announcement.scheduleEndAt) {
        setScheduleEndAt(new Date(announcement.scheduleEndAt));
      }
      if (announcement.applicationStartAt) {
        setApplicationStartDate(new Date(announcement.applicationStartAt));
      }
      if (announcement.applicationEndAt) {
        setApplicationEndDate(new Date(announcement.applicationEndAt));
      }

      // 신청 유형 설정
      if (
        announcement.applicationUrl ||
        announcement.applicationStartAt ||
        announcement.applicationEndAt
      ) {
        setApplyType('신청 유형');
      } else {
        setApplyType('신청 없음');
      }

      // 스터디 공지 유형 설정
      if (announcement.lectureRound) {
        setStudyAnnounceType('회차별 공지');
      } else {
        setStudyAnnounceType('일반');
      }
    }
  }, [isEditMode, announcement]);

  // URL 관리 함수
  const addUrl = (): void => {
    setAttachmentUrls([...attachmentUrls, '']);
  };

  const updateUrl = (index: number, value: string): void => {
    const newUrls = [...attachmentUrls];
    newUrls[index] = value;
    setAttachmentUrls(newUrls);
  };

  const removeUrl = (index: number): void => {
    if (attachmentUrls.length > 1) {
      const newUrls = attachmentUrls.filter((_, i) => i !== index);
      setAttachmentUrls(newUrls);
    }
  };

  // 이미지 관리 함수
  const handleImageChange = (images: File[]): void => {
    setFormData((prev) => ({
      ...prev,
      images: [...images] // 배열 복사로 순서 보장
    }));
  };

  const handleExistingImageChange = (images: ImageSource[]): void => {
    setFormData((prev) => ({
      ...prev,
      imageSources: [...images] // 배열 복사로 순서 보장
    }));
  };

  // formData 업데이트 헬퍼 함수
  const updateFormData = (updates: Partial<CreateAnnouncementForm>): void => {
    setFormData((prev) => {
      const newData = { ...prev, ...updates };
      return newData;
    });
  };

  // 날짜를 YYYY-MM-DD 형태로 포맷하는 헬퍼 함수
  const formatDateToString = (date: Date | null): string | undefined => {
    if (!date) return undefined;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 폼 제출 함수
  const handleSubmit = (): void => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.announcementType) {
      DialogUtil.showError('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 신청 유형이 선택된 경우 필수 입력 검증
    if (applyType === '신청 유형') {
      if (!applicationStartDate || !applicationEndDate || !formData.applicationUrl?.trim()) {
        DialogUtil.showError(
          '신청 유형을 선택한 경우 신청 시작일, 신청 종료일, 신청 URL을 모두 입력해주세요.'
        );
        return;
      }
    }

    // 최종 데이터 정리 - 순서를 보장하기 위해 명시적으로 필드 설정
    const requestData: CreateAnnouncementForm = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      place: formData.place?.trim() || undefined,
      scheduleStartAt: scheduleStartAt?.toISOString() || undefined,
      scheduleEndAt: scheduleEndAt?.toISOString() || undefined,
      announcementType: formData.announcementType,
      isPublic: publicType === '공개',
      attachmentUrls: attachmentUrls.filter((url) => url.trim() !== ''),
      images: formData.images || [],
      imageSources: formData.imageSources || [], // 기존 이미지 순서 보장
      studyId: formData.studyId,
      lectureRound: formData.lectureRound,
      applicationUrl: formData.applicationUrl,
      applicationStartAt: formData.applicationStartAt,
      applicationEndAt: formData.applicationEndAt,
    };

    // STUDY 카테고리일 때 추가 필드
    if (formData.announcementType === 'STUDY') {
      if (studyAnnounceType === '회차별 공지') {
        requestData.lectureRound = formData.lectureRound;
      } else {
        requestData.lectureRound = undefined;
      }
    } else {
      // 다른 카테고리에서 신청 관련 필드
      if (applyType === '신청 유형') {
        requestData.applicationUrl = formData.applicationUrl?.trim() || undefined;
        // 신청 날짜는 YYYY-MM-DD 형태로만 전송
        requestData.applicationStartAt = formatDateToString(applicationStartDate);
        requestData.applicationEndAt = formatDateToString(applicationEndDate);
      } else {
        requestData.applicationUrl = undefined;
        requestData.applicationStartAt = undefined;
        requestData.applicationEndAt = undefined;
      }
    }

    // 콜백 호출
    if (onSubmit) {
      onSubmit(requestData, isEditMode, announcementId);
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex w-full flex-col gap-4">
          <LabeledInput
            label="제목"
            placeholder="제목을 입력해주세요"
            required={true}
            value={formData.title}
            onChange={(value) => updateFormData({ title: value })}
          />
          <div className="flex gap-4">
            <LabeledInput
              label="장소"
              placeholder="장소를 입력해주세요"
              value={formData.place || ''}
              onChange={(value) => updateFormData({ place: value || undefined })}
            />
            <LabeledCalanderInput
              placeholder="시작 일시를 선택해주세요"
              label="시작 일시"
              value={scheduleStartAt}
              showTimeSelect={true}
              timeIntervals={30}
              onChange={(val) => {
                if (!Array.isArray(val)) {
                  setScheduleStartAt(val);
                }
              }}
            />
          </div>
          <LabeledTextarea
            label="본문"
            placeholder="내용을 입력해주세요."
            required={true}
            className="aspect-[2/1] text-lg"
            value={formData.content}
            onChange={(value) => updateFormData({ content: value })}
          />
          <LabeledImageInput
            label="이미지"
            value={formData.images || []}
            existingImages={formData.imageSources || []}
            onChange={handleImageChange}
            onExistingImagesChange={handleExistingImageChange}
          />

          <div className="flex flex-col gap-2">
            {attachmentUrls.map((url, index) => (
              <UrlInput
                key={index}
                value={url}
                onChange={(value) => updateUrl(index, value)}
                onRemove={() => removeUrl(index)}
              />
            ))}
          </div>
        </div>

        <SideBar
          formData={formData}
          onFormDataChange={updateFormData}
          applyType={applyType}
          onApplyTypeChange={setApplyType}
          studyAnnounceType={studyAnnounceType}
          onStudyAnnounceTypeChange={setStudyAnnounceType}
          publicType={publicType}
          onPublicTypeChange={setPublicType}
          applicationStartDate={applicationStartDate}
          onApplicationStartDateChange={setApplicationStartDate}
          applicationEndDate={applicationEndDate}
          onApplicationEndDateChange={setApplicationEndDate}
          studyOptions={studyOptions}
          disableCategoryChange={disableCategoryChange}
          disableStudyTypeChange={disableStudyTypeChange}
          onSubmit={handleSubmit}
          isLoading={false}
          buttonText={isEditMode ? '수정하기' : '게시하기'}
        />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Button size="md" className="w-[112px]" variant="fill_secondary" onClick={addUrl}>
          URL 추가
        </Button>
      </div>
    </div>
  );
}
