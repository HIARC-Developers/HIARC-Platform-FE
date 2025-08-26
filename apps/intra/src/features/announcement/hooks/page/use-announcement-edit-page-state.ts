import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { useSemesterStoreInit } from '@/shared/hooks/use-semester-store';
import useAnnouncement from '../query/use-announcement';
import { useUpdateInstructorAnnouncement } from '../mutation/use-update-instructor-announcement';
import { useStudyOptions } from '@/features/study/hooks/study-instructor/query/use-study-options';

export function useAnnouncementEditPageState() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const id = Number(params.id);
  const studyId = Number(searchParams.get('studyId')) || 0;
  const semesterId = Number(searchParams.get('semesterId')) || 0;

  const { data: announcement, isLoading, error } = useAnnouncement(id.toString());
  const { mutate: updateAnnouncement } = useUpdateInstructorAnnouncement();

  // 스터디 옵션을 위한 semester store 초기화
  useSemesterStoreInit();
  const { data: studyOptions } = useStudyOptions(semesterId || announcement?.semesterId);

  const handleSubmit = (
    data: CreateAnnouncementRequest,
    isEditMode: boolean,
    announcementId?: number
  ): void => {
    if (announcementId) {
      updateAnnouncement({
        studyId: studyId || announcement?.studyId || 0,
        announcementId,
        data,
      });
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
