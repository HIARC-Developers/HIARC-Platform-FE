'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
} from '../dialog/alert-dialog';
import { DialogConfig } from '../../store/dialog-store';
import { Button } from '../button';
import Image from 'next/image';
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog';

interface AlertDialogComponentProps {
  dialog: DialogConfig;
  onConfirm(): void;
  onCancel(): void;
  onClose(): void;
  showBackground?: boolean;
}

export function AlertDialogComponent({
  dialog,
  onConfirm,
  onCancel,
  onClose,
}: AlertDialogComponentProps): React.ReactElement {
  const showCancelButton = dialog.onCancel !== undefined;

  const handleAction = (): void => {
    onConfirm();
    onClose();
  };

  const handleCancel = (): void => {
    onCancel();
    onClose();
  };

  return (
    <AlertDialog open={true} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-full sm:max-w-sm">
        <div className="flex flex-col items-center py-2 text-center">
          {/* Error Icon */}
          <Image src="/shared-assets/Error.svg" alt="Error Icon" width={32} height={32} />
          <AlertDialogTitle className="mt-6 text-lg font-semibold text-gray-900">
            {dialog.title}
          </AlertDialogTitle>
          {/* Buttons */}
          <div className="mt-6 flex gap-2">
            {showCancelButton && (
              <AlertDialogCancel asChild>
                <Button variant="secondary" size="sm" onClick={handleCancel}>
                  {dialog.cancelText || '취소'}
                </Button>
              </AlertDialogCancel>
            )}
            <AlertDialogAction asChild>
              <Button size="sm" className="min-w-[57px]" onClick={handleAction}>
                {dialog.confirmText || '닫기'}
              </Button>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
