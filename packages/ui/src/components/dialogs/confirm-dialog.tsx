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

interface ConfirmDialogProps {
  dialog: DialogConfig;
  onConfirm(): void;
  onCancel(): void;
  onClose(): void;
  showBackground?: boolean;
}

export function ConfirmDialog({
  dialog,
  onConfirm,
  onCancel,
  onClose,
  showBackground,
}: ConfirmDialogProps): React.ReactElement {
  const handleConfirm = (): void => {
    onConfirm();
    onClose();
  };

  const handleCancel = (): void => {
    onCancel();
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-full sm:max-w-md"
        showBackground={showBackground ?? dialog.showBackground}
      >
        <div className="flex flex-col space-y-4 py-2">
          <DialogHeader className="text-center">
            <DialogTitle>{dialog.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="pt-4">
            {typeof dialog.content === 'string' ? (
              <Label size="lg" weight="regular">
                {dialog.content}
              </Label>
            ) : (
              dialog.content
            )}
          </DialogDescription>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={handleCancel}>
              {dialog.cancelText || '취소'}
            </Button>
            <Button onClick={handleConfirm}>{dialog.confirmText || '확인'}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
