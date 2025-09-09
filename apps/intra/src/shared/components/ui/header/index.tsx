'use client';

import { useState } from 'react';
import { ServerCookieUtil } from '@/shared/utils/server-cookie-util';
import { MobileHeader } from './mobile-header';
import { DesktopHeader } from './desktop-header';

export default function Header(): React.ReactElement {
  const { isAuthenticated } = ServerCookieUtil.checkAuth();
  const [searchInput, setSearchInput] = useState('');

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
