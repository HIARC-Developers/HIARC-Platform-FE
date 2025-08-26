import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useStudy } from '../study-common/query/use-study';

export function useStudyEditPageState() {
  const router = useRouter();
  const params = useParams();
  const studyId = typeof params.id === 'string' ? Number(params.id) : undefined;
  const { data: studyData, isLoading, error } = useStudy(studyId || 0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleBackClick = (): void => {
    router.back();
  };

  return {
    studyId,
    studyData,
    isLoading,
    error,
    mounted,
    handleBackClick,
  };
}
