import { PageLayout } from '@hiarc-platform/ui';
import { DesktopHomePage, MobileHomePage } from '@/features/main/pages/home';
import { ConditionalOnboardingButton } from '@/features/main/components/conditional-onboarding-button';
import { cookies } from 'next/headers';

export default async function Home(): Promise<React.ReactElement> {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('access');
  const isAuthenticated = Boolean(authCookie?.value);

  return (
    <PageLayout
      desktopChildren={<DesktopHomePage />}
      mobileChildren={<MobileHomePage />}
      stickyBottom={<ConditionalOnboardingButton isAuthenticated={isAuthenticated} />}
    />
  );
}
