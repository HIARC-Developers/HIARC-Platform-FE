'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  Label,
} from '@hiarc-platform/ui';

interface RestrictedFeatureDialogProps {
  isOpen: boolean;
  onClose(): void;
}

export function RestrictedFeatureDialog({
  isOpen,
  onClose,
}: RestrictedFeatureDialogProps): React.ReactElement {
  const router = useRouter();

  const handleConfirm = useCallback((): void => {
    onClose();
    router.push('/');
  }, [onClose, router]);

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (event: KeyboardEvent): void => {
        if (event.key === 'Enter' || event.key === 'Escape') {
          handleConfirm();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleConfirm, isOpen]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>기능 준비 중</AlertDialogTitle>
          <AlertDialogDescription>
            <Label>빠른 시일 내에 업데이트 예정입니다.</Label>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end pt-4">
          <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
