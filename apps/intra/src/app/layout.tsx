import Footer from '@/shared/components/ui/Footer';
import Header from '@/shared/components/ui/header';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

// 로컬 폰트 import
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';

import { Providers } from '../shared/providers/providers';
import './globals.css';
import { GlobalDialogContainer } from '@hiarc-platform/ui';

export const metadata: Metadata = {
  title: 'HI-ARC',
  description: 'HIARC Intra',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('access');
  const isAuthenticated = Boolean(authCookie?.value);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Header isAuthenticated={isAuthenticated} />
          <main className="flex-1">{children}</main>
          <Footer />
          <GlobalDialogContainer />
        </Providers>
      </body>
    </html>
  );
}
