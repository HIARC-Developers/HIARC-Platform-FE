import { useUpdateMyIntroduction } from '@/features/member/hooks/mutation/use-update-my-introduction';
import { useMyProfileData } from '@/features/member/hooks/query/use-my-page-data';
import { useAuthStore } from '@/shared/store/auth-store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useMyPageState() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  const {
    data: myPageData,
    isLoading: myPageDataLoading,
    error: myPageDataError,
  } = useMyProfileData();

  const updateMyIntroduction = useUpdateMyIntroduction();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleUpdateIntroduction = async (introduction: string): Promise<void> => {
    await updateMyIntroduction.mutateAsync(introduction);
  };

  const handleBackClick = (): void => {
    router.back();
  };

  const isDataReady = hydrated && user && myPageData && !myPageDataLoading;

  return {
    user,
    hydrated,
    myPageData,
    myPageDataLoading,
    myPageDataError,
    isDataReady,
    handleUpdateIntroduction,
    handleBackClick,
  };
}
