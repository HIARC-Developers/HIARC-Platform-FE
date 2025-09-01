'use client';

import { Button, DialogUtil, FadeIn } from '@hiarc-platform/ui';
import { useRouter, usePathname } from 'next/navigation';
import { IconButton } from '@hiarc-platform/ui';
import useLogout from '@/features/auth/hooks/mutation/use-logout';
import useRecruitNotificationRead from '@/features/auth/hooks/mutation/use-recruit-notification-read';
import { authApi } from '@/features/auth/api/auth';
import { MyInfo } from '@/features/auth/types/model/my-info';
import { useState, useRef, useEffect } from 'react';
import { SignupPopup } from './signup-popup';
import { useSignupPopup } from '@/shared/hooks/use-signup-popup';

export function AuthenticatedMobileSection(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const logoutMutation = useLogout();
  const recruitNotificationReadMutation = useRecruitNotificationRead();
  const { isPopupClosed, closePopup, initializeFromStorage } = useSignupPopup();
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMyPage = (): void => {
    router.push('/my');
  };

  const handleLogout = (): void => {
    DialogUtil.showConfirm(
      '정말 로그아웃하시겠습니까?',
      () => {
        logoutMutation.mutate();
      },
      undefined,
      {
        title: '로그아웃',
        confirmText: '로그아웃',
        cancelText: '취소',
      }
    );
  };

  // 컴포넌트 마운트 시 스토리지에서 상태 초기화
  useEffect(() => {
    initializeFromStorage();
  }, [initializeFromStorage]);

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await authApi.GET_ME();
        setMyInfo(userData);

        // approvedNotification이 있고 메인 페이지이며 팝업이 닫히지 않은 경우에만 팝업 표시
        if (userData?.approvedNotification && pathname === '/' && !isPopupClosed) {
          setIsPopupOpen(true);
        }
      } catch (error) {
        console.error('사용자 정보 불러오기 실패:', error);
      }
    };

    fetchUserInfo();
  }, [pathname, isPopupClosed]); // eslint-disable-line react-hooks/exhaustive-deps

  // isPopupClosed가 변경되면 로컬 팝업도 닫기
  useEffect(() => {
    if (isPopupClosed) {
      setIsPopupOpen(false);
    }
  }, [isPopupClosed]);

  // 팝업 외부 클릭시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
        closePopup();
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen, closePopup]);

  return (
    <div className="flex items-center gap-2">
      <IconButton
        size="lg"
        iconSrc="/shared-assets/User.svg"
        aria-label="프로필"
        onClick={handleMyPage}
      />
      {/* 2025.08.24
      출석체크 버튼 임시 비활성화 */}
      {/* <Button
        size="xs"
        className="bg-primary-100"
        onClick={() => {
          DialogUtil.showComponent(<StudyAttendanceDialog />);
        }}
      >
        출석체크
      </Button> */}
      <div className="relative">
        <Button
          ref={buttonRef}
          variant="line_secondary"
          size="xs"
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? '로그아웃 중...' : '로그아웃'}
        </Button>
        {isPopupOpen && myInfo?.approvedNotification && (
          <div
            ref={popupRef}
            className="absolute right-0 top-full z-50 mt-2 w-[280px] rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <FadeIn isVisible={isPopupOpen && myInfo?.approvedNotification !== null}>
              <SignupPopup
                onClose={() => {
                  // 알림 읽음 처리
                  if (myInfo?.approvedNotification?.semesterId) {
                    recruitNotificationReadMutation.mutate(myInfo.approvedNotification.semesterId);
                  }
                  setIsPopupOpen(false);
                  closePopup();
                }}
              />
            </FadeIn>
          </div>
        )}
      </div>
    </div>
  );
}
