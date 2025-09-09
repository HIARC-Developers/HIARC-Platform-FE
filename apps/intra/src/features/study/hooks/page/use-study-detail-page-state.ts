import useApplyToStudy from '@/features/study/hooks/study-common/mutation/use-apply-to-study';
import { DialogUtil } from '@hiarc-platform/ui';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useStudy } from '../study-common/query/use-study';
import React from 'react';

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
    DialogUtil.showConfirm(
      '기초/초급 스터디는 동일 시간에 진행되어 중복 신청이 불가합니다.',
      () => applyToStudy(studyId),
      undefined,
      { title: '유의사항' }
    );
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
