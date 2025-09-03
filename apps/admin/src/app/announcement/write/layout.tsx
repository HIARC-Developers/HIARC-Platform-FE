'use client';

import { useRouter } from 'next/navigation';
import { BackButton, Divider, Title } from '@hiarc-platform/ui';

export default function AnnouncementWriteLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      {/* 데스크톱용 추가 헤더 (기존 Header 아래에 표시) */}

      {/* 메인 컨텐츠 */}
      <div>{children}</div>
    </>
  );
}
