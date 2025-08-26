'use client';

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog/dialog';
import { Button } from '../button';
import { DialogConfig } from '../../store/dialog-store';

interface SuccessDialogProps {
  dialog: DialogConfig;
  onConfirm(): void;
  onCancel(): void;
  onClose(): void;
  showBackground?: boolean;
}

export function SuccessDialog({
  dialog,
  onConfirm,
  onClose,
  showBackground,
}: SuccessDialogProps): React.ReactElement {
  const handleConfirm = (): void => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-full"
        showBackground={showBackground ?? dialog.showBackground}
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
              <div className="h-8 w-8 text-green-600">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <DialogHeader>
            <DialogTitle className="pt-6 text-lg font-medium text-gray-900">
              {dialog.title}
            </DialogTitle>
          </DialogHeader>

          {/* Button */}
          <div className="pt-6">
            <Button
              size="sm"
              onClick={handleConfirm}
              className="min-w-[57px] bg-green-600 hover:bg-green-700"
            >
              {dialog.confirmText || '확인'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
