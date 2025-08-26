import { useRouter, useSearchParams } from 'next/navigation';
import { CreateAnnouncementRequest } from '@hiarc-platform/shared';
import { useSemesterStoreInit, useSemesterStore } from '@/shared/hooks/use-semester-store';
import useCreateStudyAnnouncement from '@/features/study/hooks/study-instructor/mutation/use-create-study-announcement';
import { useStudyOptions } from '@/features/study/hooks/study-instructor/query/use-study-options';

export function useAnnouncementWritePageState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: createAnnouncement } = useCreateStudyAnnouncement();

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

  const handleSubmit = (data: CreateAnnouncementRequest): void => {
    const mutationData = initialStudyId
      ? { studyId: Number(initialStudyId), announcementData: data }
      : data;

    createAnnouncement(mutationData);
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
