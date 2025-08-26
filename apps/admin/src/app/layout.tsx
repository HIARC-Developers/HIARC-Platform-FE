import type { Metadata } from 'next';
import Header from '@/shared/components/Header';
import Footer from '@/shared/components/Footer';

// 로컬 폰트 import
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';

import { Providers } from '../shared/providers/providers';
import './globals.css';
import { GlobalDialogContainer } from '@hiarc-platform/ui';

export const metadata: Metadata = {
  title: 'HI-ARC ADMIN',
  description: 'HIARC Admin',
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
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <GlobalDialogContainer />
        </Providers>
      </body>
    </html>
  );
}
