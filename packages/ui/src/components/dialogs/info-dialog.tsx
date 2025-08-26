'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../dialog/dialog';
import { Button } from '../button';
import { Label } from '../label/label';
import { DialogConfig } from '../../store/dialog-store';

interface InfoDialogProps {
  dialog: DialogConfig;
  onConfirm(): void;
  onCancel(): void;
  onClose(): void;
  showBackground?: boolean;
}

export function InfoDialog({
  dialog,
  onConfirm,
  onClose,
  showBackground,
}: InfoDialogProps): React.ReactElement {
  const handleConfirm = (): void => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm" showBackground={showBackground ?? dialog.showBackground}>
        <div className="flex flex-col items-center space-y-4 py-2 text-center">
          {/* Info Icon */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <div className="h-8 w-8 text-blue-600">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              {dialog.title}
            </DialogTitle>
          </DialogHeader>

          {/* Content */}
          <DialogDescription className="text-gray-600">
            {typeof dialog.content === 'string' ? (
              <Label size="md" weight="regular">
                {dialog.content}
              </Label>
            ) : (
              dialog.content
            )}
          </DialogDescription>

          {/* Button */}
          <div className="pt-4">
            <Button onClick={handleConfirm} className="min-w-[100px] bg-blue-600 hover:bg-blue-700">
              <Label>{dialog.confirmText || '확인'}</Label>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
