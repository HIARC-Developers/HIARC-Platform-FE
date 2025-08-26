'use client';

import { PageLayout } from '@hiarc-platform/ui';
import { DesktopOAuthCallbackPage, MobileOAuthCallbackPage } from '@/features/auth/pages/oauth-callback';

export default function OAuthCallbackPage(): React.ReactElement {
  return (
    <PageLayout
      desktopChildren={<DesktopOAuthCallbackPage />}
      mobileChildren={<MobileOAuthCallbackPage />}
    />
  );
}
