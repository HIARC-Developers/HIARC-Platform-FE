import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { CreateAnnouncementRequest, CreateAnnouncementForm } from '@hiarc-platform/shared';
import { useSemesterStoreInit, useSemesterStore } from '@/shared/hooks/use-semester-store';
import useCreateStudyAnnouncement from '@/features/study/hooks/study-instructor/mutation/use-create-study-announcement';
import { useStudyOptions } from '@/features/study/hooks/study-instructor/query/use-study-options';
import { useImageUpload } from '../mutation/use-image-upload';
import { DialogUtil } from '@hiarc-platform/ui';

export function useAnnouncementWritePageState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: createAnnouncement } = useCreateStudyAnnouncement();
  const { mutate: uploadImage } = useImageUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get query parameters
  const initialType = searchParams.get('type') as
    | 'GENERAL'
    | 'STUDY'
    | 'RATING'
    | 'ETC'
    | 'EXTERNAL'
    | null;
  const initialStudyId = searchParams.get('studyId');
  const semesterId = searchParams.get('semesterId');
  const isLecture = searchParams.get('isLecture') === 'true';

  // Initialize semester store and get study options
  useSemesterStoreInit();
  const { selectedSemesterId } = useSemesterStore();
  const targetSemesterId = semesterId ? Number(semesterId) : selectedSemesterId;
  const { data: studyOptions = [] } = useStudyOptions(Number(targetSemesterId));

  const handleSubmit = async (data: CreateAnnouncementForm): Promise<void> => {
    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    try {
      const imageKeys: string[] = [];

      // 이미지가 있는 경우 업로드 처리
      if (data.images && data.images.length > 0) {
        DialogUtil.showInfo('이미지를 업로드하고 있습니다...');

        try {
          // studyId 확인 - 필수값이므로 초기값이나 현재 선택된 값 사용
          const targetStudyId = initialStudyId ? Number(initialStudyId) : 1; // 기본값 설정

          // 이미지를 순차적으로 업로드
          for (let i = 0; i < data.images.length; i++) {
            const file = data.images[i];
            console.log(`이미지 업로드 시작 ${i + 1}/${data.images.length}:`, file.name);

            const imageKey = await new Promise<string>((resolve, reject) => {
              uploadImage(
                { studyId: targetStudyId, file },
                {
                  onSuccess: (imageSource) => {
                    console.log(`이미지 업로드 성공 ${i + 1}:`, imageSource.resourceKey);
                    resolve(imageSource.resourceKey ?? '');
                  },
                  onError: (error) => {
                    console.error(`이미지 업로드 실패 ${i + 1}:`, error);
                    reject(error);
                  },
                }
              );
            });

            imageKeys.push(imageKey);
          }

          console.log('모든 이미지 업로드 완료:', imageKeys);
          DialogUtil.hideAllDialogs();
        } catch (error) {
          console.error('이미지 업로드 에러:', error);
          DialogUtil.showError('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
          setIsSubmitting(false);
          return;
        }
      }

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
        imageKeys: imageKeys.length > 0 ? imageKeys : null,
        attachmentUrls: data.attachmentUrls,
      };

      const mutationData = initialStudyId
        ? { studyId: Number(initialStudyId), announcementData: requestData }
        : requestData;

      createAnnouncement(mutationData, {
        onSuccess: () => {
          const successMessage =
            initialType === 'STUDY'
              ? '스터디 공지사항이 성공적으로 등록되었습니다.'
              : '공지사항이 성공적으로 등록되었습니다.';
          const redirectPath =
            initialType === 'STUDY' && initialStudyId
              ? `/study/${initialStudyId}`
              : '/announcement';

          DialogUtil.showSuccess(successMessage, () => {
            router.push(redirectPath);
          });
        },
        onError: (error) => {
          DialogUtil.showServerError(error);
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      });
    } catch (error) {
      DialogUtil.showError('공지사항 등록에 실패했습니다.');
      setIsSubmitting(false);
    }
  };

  const handleGoBack = (): void => {
    router.back();
  };

  return {
    studyOptions,
    initialType: initialType || 'GENERAL',
    initialStudyId: initialStudyId ? Number(initialStudyId) : undefined,
    initialStudyAnnounceType: (isLecture ? '회차별 공지' : '일반') as '일반' | '회차별 공지',
    handleSubmit,
    handleGoBack,
  };
}
