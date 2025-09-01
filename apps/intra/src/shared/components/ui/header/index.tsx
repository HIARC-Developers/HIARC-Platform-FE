'use client';

import { useState } from 'react';
import { useAuthStore } from '../../../store/auth-store';
import { MobileHeader } from './mobile-header';
import { DesktopHeader } from './desktop-header';

interface HeaderProps {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: HeaderProps): React.ReactElement {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const { user } = useAuthStore();


  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-5 py-4">
        <MobileHeader
          isAuthenticated={isAuthenticated}
          isMobileSearchOpen={isMobileSearchOpen}
          setIsMobileSearchOpen={setIsMobileSearchOpen}
        />
        <DesktopHeader isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}
