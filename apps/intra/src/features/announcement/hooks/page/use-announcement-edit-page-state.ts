import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CreateAnnouncementRequest, CreateAnnouncementForm } from '@hiarc-platform/shared';
import { useSemesterStoreInit } from '@/shared/hooks/use-semester-store';
import useAnnouncement from '../query/use-announcement';
import { useUpdateInstructorAnnouncement } from '../mutation/use-update-instructor-announcement';
import { useStudyOptions } from '@/features/study/hooks/study-instructor/query/use-study-options';
import { useImageUpload } from '../mutation/use-image-upload';
import { DialogUtil } from '@hiarc-platform/ui';

export function useAnnouncementEditPageState() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = Number(params.id);
  const studyId = Number(searchParams.get('studyId')) || 0;
  const semesterId = Number(searchParams.get('semesterId')) || 0;

  const { data: announcement, isLoading, error } = useAnnouncement(id.toString());
  const { mutate: updateAnnouncement } = useUpdateInstructorAnnouncement();
  const { mutate: uploadImage } = useImageUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 스터디 옵션을 위한 semester store 초기화
  useSemesterStoreInit();
  const { data: studyOptions } = useStudyOptions(semesterId || announcement?.semesterId);

  const handleSubmit = async (
    data: CreateAnnouncementForm,
    isEditMode: boolean,
    announcementId?: number
  ): Promise<void> => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      // 1. 먼저 기존 이미지 키들을 수집 (업로드하지 않음)
      const existingImageKeys: string[] = [];
      if (data.imageSources && data.imageSources.length > 0) {
        data.imageSources.forEach((imageSource) => {
          if (imageSource.resourceKey) {
            existingImageKeys.push(imageSource.resourceKey);
          }
        });
      }
      console.log('기존 이미지 키들 (업로드 안함):', existingImageKeys);

      // 2. 새로 추가한 이미지들만 업로드
      const newImageKeys: string[] = [];
      if (data.images && data.images.length > 0) {
        DialogUtil.showInfo('새 이미지를 업로드하고 있습니다...');

        try {
          // studyId 확인
          const targetStudyId = studyId || announcement?.studyId || 1;

          // 이미지를 순차적으로 업로드
          for (let i = 0; i < data.images.length; i++) {
            const file = data.images[i];
            console.log(`새 이미지 업로드 시작 ${i + 1}/${data.images.length}:`, file.name);

            const imageKey = await new Promise<string>((resolve, reject) => {
              uploadImage(
                { studyId: targetStudyId, file },
                {
                  onSuccess: (imageSource) => {
                    console.log(`새 이미지 업로드 성공 ${i + 1}:`, imageSource.resourceKey);
                    resolve(imageSource.resourceKey ?? '');
                  },
                  onError: (error) => {
                    console.error(`새 이미지 업로드 실패 ${i + 1}:`, error);
                    reject(error);
                  },
                }
              );
            });

            newImageKeys.push(imageKey);
          }

          console.log('새 이미지 업로드 완료:', newImageKeys);
          DialogUtil.hideAllDialogs();
        } catch (error) {
          console.error('새 이미지 업로드 에러:', error);
          DialogUtil.showError('새 이미지 업로드에 실패했습니다. 다시 시도해주세요.');
          setIsSubmitting(false);
          return;
        }
      }

      // 3. 최종 이미지 키 배열 생성: 기존 키들 + 새 키들 (순서 보장)
      const finalImageKeys: string[] = [
        ...existingImageKeys, // 기존 이미지 키들이 앞에
        ...newImageKeys, // 새 이미지 키들이 뒤에
      ];
      console.log('최종 이미지 키 배열:', finalImageKeys);

      // CreateAnnouncementRequest로 변환
      const requestData: CreateAnnouncementRequest = {
        title: data.title,
        place: data.place,
        scheduleStartAt: data.scheduleStartAt,
        scheduleEndAt: data.scheduleEndAt,
        content: data.content,
        announcementType: data.announcementType,
        applicationUrl: data.applicationUrl,
        applicationStartAt: data.applicationStartAt,
        applicationEndAt: data.applicationEndAt,
        isPublic: data.isPublic,
        studyId: data.studyId,
        lectureRound: data.lectureRound,
        imageKeys: finalImageKeys.length > 0 ? finalImageKeys : null,
        attachmentUrls: data.attachmentUrls,
      };

      if (announcementId) {
        updateAnnouncement(
          {
            studyId: studyId || announcement?.studyId || 0,
            announcementId,
            data: requestData,
          },
          {
            onSettled: () => {
              setIsSubmitting(false);
            },
          }
        );
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      DialogUtil.showError('공지사항 수정에 실패했습니다.');
      setIsSubmitting(false);
    }
  };

  const handleGoBack = (): void => {
    const targetStudyId = studyId || announcement?.studyId;
    if (targetStudyId) {
      router.push(`/study/${targetStudyId}`);
    } else {
      router.back();
    }
  };

  // 페이지 정보 계산
  const isLecture = (studyId || announcement?.studyId) && announcement?.lectureRound;
  const pageTitle = isLecture
    ? `${announcement?.studyName} - ${announcement?.lectureRound}회차 강의 수정`
    : '공지사항 수정';

  return {
    id,
    studyId: studyId || announcement?.studyId || 0,
    announcement,
    studyOptions: studyOptions || [],
    isLoading,
    error,
    isLecture,
    pageTitle,
    handleSubmit,
    handleGoBack,
  };
}
