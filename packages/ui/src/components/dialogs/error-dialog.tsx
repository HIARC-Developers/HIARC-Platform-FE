'use client';

import React from 'react';
import { Label } from '../label/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../dialog/dialog';
import { Button } from '../button';
import { DialogConfig } from '../../store/dialog-store';
import Image from 'next/image';

interface ErrorDialogProps {
  dialog: DialogConfig;
  onConfirm(): void;
  onCancel(): void;
  onClose(): void;
  showBackground?: boolean;
}

export function ErrorDialog({
  dialog,
  onConfirm,
  onClose,
  showBackground,
}: ErrorDialogProps): React.ReactElement {
  const handleConfirm = (): void => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-full sm:max-w-sm"
        showBackground={showBackground ?? dialog.showBackground}
      >
        <div className="flex flex-col items-center py-2 text-center">
          {/* Error Icon */}
          <Image src="/shared-assets/Error.svg" alt="Error Icon" width={32} height={32} />

          {/* Title */}
          <DialogHeader className="mt-6">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {dialog.title}
            </DialogTitle>
          </DialogHeader>

          {/* Content */}
          <DialogDescription className="mt-4">
            {typeof dialog.content === 'string' ? (
              <Label size="lg" weight="medium">
                {dialog.content}
              </Label>
            ) : (
              dialog.content
            )}
          </DialogDescription>

          {/* Button */}
          <div className="mt-6">
            <Button size="sm" onClick={handleConfirm}>
              {dialog.confirmText || '닫기'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
