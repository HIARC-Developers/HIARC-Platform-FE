import { useState, useCallback, useEffect } from 'react';
import { CreateAnnouncementRequest, Announcement } from '@hiarc-platform/shared';
import { 
  AnnouncementFormData, 
  ApplyType, 
  StudyAnnounceType, 
  PublicType,
  validateForm,
  validateField
} from '../validation';

export interface UseAnnouncementFormReturn {
  // Form Data
  formData: Partial<AnnouncementFormData>;
  updateFormData: (updates: Partial<AnnouncementFormData>) => void;
  
  // UI State
  applyType: ApplyType;
  studyAnnounceType: StudyAnnounceType;
  publicType: PublicType;
  
  // Date States
  scheduleStartAt: Date | null;
  scheduleEndAt: Date | null;
  applicationStartDate: Date | null;
  applicationEndDate: Date | null;
  
  // Setters
  setApplyType: (type: ApplyType) => void;
  setStudyAnnounceType: (type: StudyAnnounceType) => void;
  setPublicType: (type: PublicType) => void;
  setScheduleStartAt: (date: Date | null) => void;
  setScheduleEndAt: (date: Date | null) => void;
  setApplicationStartDate: (date: Date | null) => void;
  setApplicationEndDate: (date: Date | null) => void;
  
  // Validation
  errors: Record<string, string>;
  isValid: boolean;
  validateField: (field: keyof AnnouncementFormData, value: unknown) => void;
  
  // Helpers
  initializeFromAnnouncement: (announcement: Announcement) => void;
  createSubmissionData: (attachmentUrls: string[]) => CreateAnnouncementRequest;
}

interface UseAnnouncementFormProps {
  initialAnnouncementType?: 'GENERAL' | 'STUDY' | 'RATING' | 'ETC' | 'EXTERNAL';
  initialStudyId?: number;
  initialStudyAnnounceType?: StudyAnnounceType;
}

export function useAnnouncementForm({
  initialAnnouncementType = 'GENERAL',
  initialStudyId,
  initialStudyAnnounceType = '일반',
}: UseAnnouncementFormProps = {}): UseAnnouncementFormReturn {
  
  // Form Data State
  const [formData, setFormData] = useState<any>({
    title: '',
    content: '',
    announcementType: initialAnnouncementType,
    isPublic: true,
    studyId: initialStudyId,
  });

  // UI States
  const [applyType, setApplyType] = useState<ApplyType>('신청 없음');
  const [studyAnnounceType, setStudyAnnounceType] = useState<StudyAnnounceType>(initialStudyAnnounceType);
  const [publicType, setPublicType] = useState<PublicType>('공개');
  
  // Date States
  const [scheduleStartAt, setScheduleStartAt] = useState<Date | null>(null);
  const [scheduleEndAt, setScheduleEndAt] = useState<Date | null>(null);
  const [applicationStartDate, setApplicationStartDate] = useState<Date | null>(null);
  const [applicationEndDate, setApplicationEndDate] = useState<Date | null>(null);
  
  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  // Update form data
  const updateFormData = useCallback((updates: any) => {
    setFormData((prev: any) => {
      const newData = { ...prev, ...updates };
      
      // Validate updated data
      const validation = validateForm(newData);
      setErrors(validation.errors);
      setIsValid(validation.isValid);
      
      return newData;
    });
  }, []);

  // Validate single field
  const validateSingleField = useCallback((field: string, value: unknown) => {
    const validation = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: validation.error || ''
    }));
  }, []);

  // Sync publicType with formData
  useEffect(() => {
    updateFormData({ isPublic: publicType === '공개' });
  }, [publicType, updateFormData]);

  // Sync dates with formData
  useEffect(() => {
    const updates: any = {};
    
    if (scheduleStartAt) {
      updates.scheduleStartAt = scheduleStartAt.toISOString();
    }
    if (scheduleEndAt) {
      updates.scheduleEndAt = scheduleEndAt.toISOString();
    }
    if (applicationStartDate) {
      updates.applicationStartAt = applicationStartDate.toISOString();
    }
    if (applicationEndDate) {
      updates.applicationEndAt = applicationEndDate.toISOString();
    }
    
    if (Object.keys(updates).length > 0) {
      updateFormData(updates);
    }
  }, [scheduleStartAt, scheduleEndAt, applicationStartDate, applicationEndDate, updateFormData]);

  // Initialize from existing announcement (for edit mode)
  const initializeFromAnnouncement = useCallback((announcement: any) => {
    setFormData({
      title: announcement.title || '',
      place: announcement.place || undefined,
      content: announcement.content || '',
      announcementType: announcement.announcementType || 'GENERAL',
      isPublic: announcement.isPublic ?? true,
      studyId: announcement.studyId,
      lectureRound: announcement.lectureRound,
      applicationUrl: announcement.applicationUrl,
    });

    // Set UI states
    setPublicType(announcement.isPublic ? '공개' : '비공개');
    
    // Set dates
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

    // Set apply type
    if (announcement.applicationUrl || announcement.applicationStartAt || announcement.applicationEndAt) {
      setApplyType('신청 유형');
    }

    // Set study announce type
    if (announcement.lectureRound) {
      setStudyAnnounceType('회차별 공지');
    }
  }, []);

  // Create submission data
  const createSubmissionData = useCallback((attachmentUrls: string[]): CreateAnnouncementRequest => {
    const baseData: CreateAnnouncementRequest = {
      title: formData.title?.trim() || '',
      content: formData.content?.trim() || '',
      place: formData.place?.trim() || undefined,
      scheduleStartAt: scheduleStartAt?.toISOString() || undefined,
      scheduleEndAt: scheduleEndAt?.toISOString() || undefined,
      announcementType: (formData.announcementType || 'GENERAL') as 'STUDY' | 'RATING' | 'GENERAL' | 'ETC' | 'EXTERNAL' | 'LECTURE',
      isPublic: publicType === '공개',
      attachmentUrls: attachmentUrls.filter(url => url.trim() !== ''),
      studyId: formData.studyId,
    };

    // Add conditional fields based on announcement type
    if (formData.announcementType === 'STUDY') {
      if (studyAnnounceType === '회차별 공지') {
        baseData.lectureRound = formData.lectureRound;
      }
    } else {
      // For non-study announcements, add application fields
      if (applyType === '신청 유형') {
        baseData.applicationUrl = formData.applicationUrl?.trim() || undefined;
        baseData.applicationStartAt = applicationStartDate?.toISOString() || undefined;
        baseData.applicationEndAt = applicationEndDate?.toISOString() || undefined;
      }
    }

    return baseData;
  }, [
    formData,
    scheduleStartAt,
    scheduleEndAt,
    applicationStartDate,
    applicationEndDate,
    publicType,
    applyType,
    studyAnnounceType,
  ]);

  return {
    formData,
    updateFormData,
    applyType,
    studyAnnounceType,
    publicType,
    scheduleStartAt,
    scheduleEndAt,
    applicationStartDate,
    applicationEndDate,
    setApplyType,
    setStudyAnnounceType,
    setPublicType,
    setScheduleStartAt,
    setScheduleEndAt,
    setApplicationStartDate,
    setApplicationEndDate,
    errors,
    isValid,
    validateField: validateSingleField as (field: string | number, value: unknown) => void,
    initializeFromAnnouncement,
    createSubmissionData,
  };
}