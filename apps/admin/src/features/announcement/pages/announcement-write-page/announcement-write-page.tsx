'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useCreateAdminAnnouncement } from '@/features/announcement/hooks/use-create-admin-announcement';
import { useImageUpload } from '@/features/announcement/hooks/use-image-upload';
import { CreateAnnouncementForm, CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { useSemesterStoreInit, useSemesterStore } from '@/shared/hooks/use-semester-store';
import { useStudyOptions } from '@/features/study/hooks';
import { AnnouncementDesktopHeader, AnnouncementWrite, DialogUtil } from '@hiarc-platform/ui';

export function AnnouncementWritePage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: createAnnouncement } = useCreateAdminAnnouncement();
  const { mutate: uploadImage } = useImageUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBackClick = (): void => {
    router.back();
  };

  // Get query parameters
  const initialType = searchParams.get('type') as
    | 'GENERAL'
    | 'STUDY'
    | 'RATING'
    | 'ETC'
    | 'EXTERNAL'
    | null;
  const initialStudyId = searchParams.get('studyId');
  const isLecture = searchParams.get('isLecture') === 'true';

  // Initialize semester store and get study options
  useSemesterStoreInit();
  const { selectedSemesterId } = useSemesterStore();
  const { data: studyOptions = [] } = useStudyOptions(Number(selectedSemesterId));

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
          // 이미지를 순차적으로 업로드
          for (let i = 0; i < data.images.length; i++) {
            const file = data.images[i];
            console.log(`이미지 업로드 시작 ${i + 1}/${data.images.length}:`, file.name);

            const imageKey = await new Promise<string>((resolve, reject) => {
              uploadImage(
                { file },
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

      createAnnouncement(requestData, {
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

  return (
    <div>
      <AnnouncementDesktopHeader
        title="공지사항 작성"
        className="pb-6"
        onBackClick={handleBackClick}
      />
      <AnnouncementWrite
        studyOptions={studyOptions}
        initialAnnouncementType={initialType || 'GENERAL'}
        initialStudyId={initialStudyId ? Number(initialStudyId) : undefined}
        initialStudyAnnounceType={(isLecture ? '회차별 공지' : '일반') as '회차별 공지' | '일반'}
        onSubmit={(data) => {
          handleSubmit(data as CreateAnnouncementForm);
        }}
      />
    </div>
  );
}
