import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogUtil,
  Label,
} from '@hiarc-platform/ui';
import React from 'react';

interface GreetingDialogProps {
  title: string;
  message: string;
  showBackground?: boolean;
  onConfirm?(): void;
}

export function GreetingDialog({
  title,
  message,
  showBackground = true,
  onConfirm,
}: GreetingDialogProps): React.ReactElement {
  const handleConfirm = async (): Promise<void> => {
    DialogUtil.hideAllDialogs();
    onConfirm?.();
  };

  const handleCancel = (): void => {
    DialogUtil.hideAllDialogs();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[380px]" showBackground={showBackground}>
        <DialogHeader className="mb-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <Label>
            {message.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < message.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </Label>
        </DialogDescription>
        <Button className="mt-6 w-full" onClick={handleConfirm}>
          <Label size="md">확인</Label>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
