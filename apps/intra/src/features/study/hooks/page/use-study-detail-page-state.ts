import useApplyToStudy from '@/features/study/hooks/study-common/mutation/use-apply-to-study';
import { DialogUtil } from '@hiarc-platform/ui';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useStudy } from '../study-common/query/use-study';

export function useStudyDetailPageState() {
  const router = useRouter();
  const params = useParams();
  const studyId = Number(params.id);
  const { data: studyData, isLoading, error } = useStudy(studyId);
  const { mutate: applyToStudy } = useApplyToStudy();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEditClick = (): void => {
    router.push(`/study/${studyId}/edit`);
  };

  const handleApplyClick = (): void => {
    DialogUtil.showConfirm('스터디에 신청하시겠습니까?', () => {
      applyToStudy(studyId);
    });
  };

  const handleBackClick = (): void => {
    router.back();
  };

  const handleListClick = (): void => {
    router.push('/study');
  };

  return {
    studyId,
    studyData,
    isLoading,
    error,
    mounted,
    handleEditClick,
    handleApplyClick,
    handleBackClick,
    handleListClick,
  };
}
