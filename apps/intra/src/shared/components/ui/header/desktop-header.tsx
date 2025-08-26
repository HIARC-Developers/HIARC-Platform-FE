'use client';

import { Button, Input, Label } from '@hiarc-platform/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AuthenticatedUserSection } from './authenticated-user-section';

interface DesktopHeaderProps {
  isAuthenticated: boolean;
}

export function DesktopHeader({ isAuthenticated }: DesktopHeaderProps): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogin = (): void => {
    router.push('/login');
  };

  const isActive = (path: string): boolean => pathname.startsWith(`/${path}`);

  return (
    <div className="hidden w-full items-center justify-between md:flex">
      <div className="flex items-center gap-8">
        <Link href="/" className="rounded-lg p-2 transition-colors hover:bg-gray-100">
          <Image
            src="/shared-assets/Logo.svg"
            alt="HiarcLogo"
            width={120}
            height={30}
            draggable={false}
            className="select-none"
          />
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/announcement"
            className={`text-sm transition-colors ${
              isActive('announcement')
                ? 'font-semibold text-gray-900'
                : 'font-medium text-gray-200 hover:text-gray-700'
            }`}
          >
            <Label size="lg" weight="bold" className="cursor-pointer">
              공지사항
            </Label>
          </Link>
          <Link
            href="/study"
            className={`text-sm transition-colors ${
              isActive('study')
                ? 'font-semibold text-gray-900'
                : 'font-medium text-gray-200 hover:text-gray-700'
            }`}
          >
            <Label size="lg" weight="bold" className="cursor-pointer">
              스터디
            </Label>
          </Link>
          <a
            href="https://rating.hiarc-official.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-200 transition-colors hover:text-gray-700"
          >
            <Label size="lg" weight="bold" className="cursor-pointer">
              하이팅
            </Label>
          </a>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Input
          disabled
          type="search"
          variant="search"
          placeholder="모집 종료 후 검색 기능이 제공될 예정입니다."
          className="h-[44px] w-[328px]"
        />
        {isAuthenticated ? (
          <AuthenticatedUserSection />
        ) : (
          <Button variant="secondary" size="sm" onClick={handleLogin}>
            로그인
          </Button>
        )}
      </div>
    </div>
  );
}
