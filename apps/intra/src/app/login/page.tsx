'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopLoginPage, MobileLoginPage } from '@/features/auth/pages/login';

export default function LoginPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopLoginPage />}
      mobileChildren={<MobileLoginPage />}
    />
  );
}
