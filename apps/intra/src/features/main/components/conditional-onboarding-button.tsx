'use client';

import { SlideFade } from '@hiarc-platform/ui';
import { OnboardingButton } from './onboarding-button';
import { useCurrentSemester } from '@/features/semester/hooks/use-current-semester';
import { useAuthStore } from '@/shared/store/auth-store';
import { useRouter } from 'next/navigation';

interface ConditionalOnboardingButtonProps {
  isAuthenticated: boolean;
}

export function ConditionalOnboardingButton({
  isAuthenticated,
}: ConditionalOnboardingButtonProps): React.ReactElement | null {
  const { data: currentSemesterData } = useCurrentSemester();
  const { user } = useAuthStore();
  const router = useRouter();

  // recruitingSemester가 없으면 온보딩 버튼을 보지 않음
  if (!currentSemesterData?.recruitingSemester) {
    return null;
  }

  // 인증되지 않은 사용자는 온보딩 버튼 표시
  if (!isAuthenticated) {
    const recruitingSemester = currentSemesterData.recruitingSemester;
    const semesterName = `${recruitingSemester.semesterYear}년 ${
      recruitingSemester.semesterType === 'FIRST' ? '1학기' : '2학기'
    }`;

    return (
      <SlideFade className="w-full">
        <OnboardingButton semesterName={semesterName} onClick={() => router.push('/login')} />
      </SlideFade>
    );
  }

  // 인증된 사용자지만 bojHandle이 null 또는 undefined인 경우 온보딩 버튼 표시
  if (isAuthenticated && (!user || !user.bojHandle)) {
    const recruitingSemester = currentSemesterData.recruitingSemester;
    const semesterName = `${recruitingSemester.semesterYear}년 ${
      recruitingSemester.semesterType === 'FIRST' ? '1학기' : '2학기'
    }`;

    return (
      <SlideFade className="w-full">
        <OnboardingButton semesterName={semesterName} onClick={() => router.push('/signup')} />
      </SlideFade>
    );
  }

  return null;
}
