'use client';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useAdminAnnouncement } from '@/features/announcement/hooks/use-admin-announcement';
import { useUpdateAdminAnnouncement } from '@/features/announcement/hooks/use-update-admin-announcement';
import { useImageUpload } from '@/features/announcement/hooks/use-image-upload';
import { CreateAnnouncementRequest, CreateAnnouncementForm } from '@hiarc-platform/shared';
import { useStudyOptions } from '@/features/study/hooks';
import { useSemesterStoreInit } from '@/shared/hooks/use-semester-store';
import {
  AnnouncementWrite,
  BackButton,
  Divider,
  LoadingDots,
  Title,
  Label,
  DialogUtil,
} from '@hiarc-platform/ui';

export function AnnouncementEditPage(): React.ReactElement {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = Number(params.id);
  const studyId = Number(searchParams.get('studyId')) || 0;
  const { data: announcement, isLoading, error } = useAdminAnnouncement(id);
  const { mutate: updateAnnouncement } = useUpdateAdminAnnouncement();
  const { mutate: uploadImage } = useImageUpload();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 스터디 옵션을 위한 semester store 초기화
  useSemesterStoreInit();
  const { data: studyOptions } = useStudyOptions(announcement?.semesterId);

  const handleSubmit = async (
    data: CreateAnnouncementForm,
    isEditMode: boolean,
    announcementId?: number
  ): Promise<void> => {
    if (!announcementId || isSubmitting) {
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
          for (let i = 0; i < data.images.length; i++) {
            const file = data.images[i];
            console.log(`새 이미지 업로드 시작 ${i + 1}/${data.images.length}:`, file.name);

            const imageKey = await new Promise<string>((resolve, reject) => {
              uploadImage(
                { file },
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

      updateAnnouncement(
        { id: announcementId, data: requestData },
        {
          onSuccess: () => {
            const successMessage =
              announcement?.studyId && announcement?.lectureRound
                ? '강의가 성공적으로 수정되었습니다.'
                : '공지사항이 성공적으로 수정되었습니다.';

            DialogUtil.showSuccess(successMessage, () => {
              // 스터디 상세 페이지로 이동
              if (announcement?.studyId) {
                router.push(`/study/${announcement.studyId}`);
              } else {
                router.back();
              }
            });
          },
          onError: (error) => {
            DialogUtil.showServerError(error);
          },
          onSettled: () => {
            setIsSubmitting(false);
          },
        }
      );
    } catch (error) {
      console.error('공지사항 수정 에러:', error);
      DialogUtil.showError('공지사항 수정에 실패했습니다.');
      setIsSubmitting(false);
    }
  };

  const handleBackClick = (): void => {
    const targetStudyId = studyId || announcement?.studyId;
    if (targetStudyId) {
      router.push(`/study/${targetStudyId}`);
    } else {
      router.back();
    }
  };

  // 스터디 정보가 있으면 스터디 강의로 처리
  const isLecture = announcement?.studyId && announcement?.lectureRound;
  const pageTitle = isLecture
    ? `${announcement?.studyName} - ${announcement?.lectureRound}회차 강의 수정`
    : '공지사항 수정';

  // 로딩 중일 때
  if (isLoading) {
    return (
      <>
        {/* Desktop loading */}
        <div className="hidden min-h-[400px] items-center justify-center md:flex">
          <LoadingDots />
        </div>
        {/* Mobile loading */}
        <div className="flex min-h-[400px] items-center justify-center px-4 md:hidden">
          <LoadingDots />
        </div>
      </>
    );
  }

  // 에러가 발생했을 때
  if (error) {
    return (
      <>
        {/* Desktop error */}
        <div className="hidden min-h-[400px] items-center justify-center md:flex">
          <p className="text-red-500">공지사항을 불러오는데 실패했습니다.</p>
        </div>
        {/* Mobile error */}
        <div className="flex min-h-[400px] items-center justify-center px-4 md:hidden">
          <p className="text-red-500 text-center text-sm">공지사항을 불러오는데 실패했습니다.</p>
        </div>
      </>
    );
  }

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <div className="flex w-full flex-col items-center gap-3 pb-6">
          <BackButton onClick={handleBackClick} />
          <div className="flex w-full items-center justify-between">
            <Title size="sm" weight="bold">
              공지사항 작성
            </Title>
          </div>
          <Divider variant="horizontal" size="full" />
        </div>
      </div>
      <AnnouncementWrite
        announcementId={id}
        announcement={announcement}
        studyOptions={studyOptions || []}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
