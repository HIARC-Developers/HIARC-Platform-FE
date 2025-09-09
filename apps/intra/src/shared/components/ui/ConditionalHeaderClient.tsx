'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { MobileHeader as UIMobileHeader, MenuItem } from '@hiarc-platform/ui';
import { MobileHeader } from './header/mobile-header';
import { DesktopHeader } from './header/desktop-header';

interface ConditionalHeaderClientProps {
  isAuthenticated: boolean;
}

export function ConditionalHeaderClient({
  isAuthenticated,
}: ConditionalHeaderClientProps): React.ReactElement {
  const [searchInput, setSearchInput] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const isAnnouncementList = pathname === '/announcement';
  const isAnnouncementWrite = pathname.startsWith('/announcement/write');
  const isAnnouncementEdit = pathname.includes('/announcement/') && pathname.includes('/edit');
  const isAnnouncementDetail =
    pathname.includes('/announcement/') &&
    !pathname.includes('/edit') &&
    !pathname.includes('/write') &&
    pathname !== '/announcement';

  const isStudy = pathname.includes('/study');

  const handleBackClick = (): void => {
    router.back();
  };

  const handleHomeClick = (): void => {
    router.push('/');
  };

  // 모바일 메뉴 아이템들
  const menuItems: MenuItem[] = [
    {
      label: '공지사항',
      path: '/announcement',
    },
    {
      label: '스터디',
      path: '/study',
    },
    {
      label: '내 정보',
      path: '/profile',
    },
  ];

  // 모바일에서 공지사항 관련 페이지인 경우 MobileHeader 사용
  if (
    isAnnouncementList ||
    isAnnouncementWrite ||
    isAnnouncementEdit ||
    isAnnouncementDetail ||
    isStudy
  ) {
    const getTitle = (): string => {
      if (isAnnouncementList) {
        return '공지사항';
      }
      if (isAnnouncementWrite) {
        return '공지사항 작성';
      }
      if (isAnnouncementEdit) {
        return '공지사항 수정';
      }
      if (isAnnouncementDetail) {
        return '공지사항';
      }
      if (isStudy) {
        return '스터디';
      }
      return '공지사항';
    };

    const title = getTitle();

    return (
      <>
        {/* 모바일 전용 헤더 - 플로팅 */}
        <div className="fixed left-0 right-0 top-0 z-50 block md:hidden">
          <UIMobileHeader
            title={title}
            onBackClick={handleBackClick}
            onHomeClick={handleHomeClick}
            menuItems={isAnnouncementList ? menuItems : undefined}
          />
        </div>

        {/* 데스크톱에서는 기존 헤더 사용 */}
        <div className="hidden md:block">
          <header className="flex w-full items-center justify-between border-b border-gray-200">
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-4">
              <MobileHeader
                isAuthenticated={isAuthenticated}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
              <DesktopHeader
                isAuthenticated={isAuthenticated}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>
          </header>
        </div>
      </>
    );
  }

  // 다른 페이지에서는 기존 헤더 사용
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-4">
        <MobileHeader
          isAuthenticated={isAuthenticated}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <DesktopHeader
          isAuthenticated={isAuthenticated}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>
    </header>
  );
}
