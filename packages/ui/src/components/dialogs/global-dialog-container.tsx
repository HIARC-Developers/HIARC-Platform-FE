'use client';

import React from 'react';
import { useDialogStore, DialogConfig } from '../../store/dialog-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../dialog/dialog';
import { Button } from '../button';
import { Label } from '../label/label';
import { ErrorDialog, SuccessDialog, WarningDialog, ConfirmDialog, InfoDialog, AlertDialogComponent } from './';

const getDialogSize = (size: DialogConfig['size']): string => {
  switch (size) {
    case 'sm':
      return '!w-[400px] !max-w-[400px]';
    case 'lg':
      return '!w-[700px] !max-w-[700px]';
    case 'xl':
      return '!w-[900px] !max-w-[900px]';
    default:
      return '!w-[500px] !max-w-[500px]';
  }
};

function DialogItem({ dialog }: { dialog: DialogConfig }): React.ReactElement {
  const { hideDialog } = useDialogStore();

  const handleConfirm = (): void => {
    dialog.onConfirm?.();
  };

  const handleCancel = (): void => {
    dialog.onCancel?.();
  };

  const handleClose = (): void => {
    hideDialog(dialog.id);
  };

  // If it's a component type, render the component directly with background option
  if (dialog.type === 'component') {
    if (React.isValidElement(dialog.component)) {
      const extraProps =
        'showBackground' in dialog.component.props ? { showBackground: dialog.showBackground } : {};
      return React.cloneElement(dialog.component, extraProps);
    }
    return <>{dialog.component}</>;
  }

  // If it's a custom dialog or has hideButtons, use the original generic dialog
  if (dialog.type === 'custom' || dialog.hideButtons) {
    const showCancelButton = dialog.type === 'confirm' || dialog.onCancel;

    return (
      <Dialog open={true} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent
          className={getDialogSize(dialog.size)}
          showBackground={dialog.showBackground}
        >
          <DialogHeader>
            <DialogTitle>{dialog.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-4">
            {typeof dialog.content === 'string' ? (
              <div className="text-gray-700">{dialog.content}</div>
            ) : (
              dialog.content
            )}
          </DialogDescription>
          {!dialog.hideButtons && (
            <div className="mt-6 flex justify-end gap-2">
              {showCancelButton && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleCancel();
                    handleClose();
                  }}
                >
                  <Label>{dialog.cancelText}</Label>
                </Button>
              )}
              <Button
                onClick={() => {
                  handleConfirm();
                  handleClose();
                }}
              >
                <Label>{dialog.confirmText}</Label>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  // Use specific dialog components based on type
  switch (dialog.type) {
    case 'alert':
      return (
        <AlertDialogComponent
          dialog={dialog}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
          showBackground={dialog.showBackground}
        />
      );
    case 'error':
      return (
        <ErrorDialog
          dialog={dialog}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
          showBackground={dialog.showBackground}
        />
      );
    case 'success':
      return (
        <SuccessDialog
          dialog={dialog}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
          showBackground={dialog.showBackground}
        />
      );
    case 'warning':
      return (
        <WarningDialog
          dialog={dialog}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
          showBackground={dialog.showBackground}
        />
      );
    case 'confirm':
      return (
        <ConfirmDialog
          dialog={dialog}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
          showBackground={dialog.showBackground}
        />
      );
    case 'info':
    default:
      return (
        <InfoDialog
          dialog={dialog}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          onClose={handleClose}
          showBackground={dialog.showBackground}
        />
      );
  }
}

export function GlobalDialogContainer(): React.ReactElement {
  const { dialogs } = useDialogStore();

  return (
    <>
      {dialogs.map((dialog) => (
        <DialogItem key={dialog.id} dialog={dialog} />
      ))}
    </>
  );
}
