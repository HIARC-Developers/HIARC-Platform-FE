'use client';

import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hiarc-platform/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { AuthenticatedUserSection } from './authenticated-user-section';
import { myApi } from '@/features/member/api/member';

interface DesktopHeaderProps {
  isAuthenticated: boolean;
  searchInput: string;
  setSearchInput(value: string): void;
}

export function DesktopHeader({
  isAuthenticated,
  searchInput,
  setSearchInput,
}: DesktopHeaderProps): React.ReactElement {
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isFetching, setIsFetching] = useState(false);

  const handleLogin = (): void => {
    router.push('/login');
  };

  const handleSearch = async (handle: string): Promise<void> => {
    if (!handle.trim()) {
      return;
    }

    setShowError(false);

    setIsFetching(true);

    try {
      const memberId = await myApi.GET_MEMBER_ID_BY_HANDLE(handle);
      if (memberId) {
        router.push(`/member/${memberId}`);
        setSearchInput('');
      } else {
        setShowError(true);
      }
    } catch (error) {
      setShowError(true);
    } finally {
      setIsFetching(false);
    }
  };

  const closeError = (): void => {
    setShowError(false);
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
          type="search"
          variant="search"
          placeholder={isAuthenticated ? 'BOJ 핸들명을 입력하세요' : '로그인 후 검색 가능합니다'}
          className="h-[44px] w-[328px]"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && isAuthenticated) {
              handleSearch(searchInput);
            }
          }}
          disabled={!isAuthenticated || isFetching}
        />
        {isAuthenticated ? (
          <AuthenticatedUserSection />
        ) : (
          <Button variant="secondary" size="sm" onClick={handleLogin}>
            로그인
          </Button>
        )}
      </div>

      <Dialog open={showError} onOpenChange={closeError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>검색 실패</DialogTitle>
            <DialogDescription>해당 BOJ 핸들명을 가진 회원을 찾을 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={closeError}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
