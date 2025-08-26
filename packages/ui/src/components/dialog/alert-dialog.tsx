'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';

import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-md text-sm font-medium transition-all duration-150',
    'hover:-translate-y-[1px] hover:shadow-md hover:opacity-90',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none'
  ),
  {
    variants: {
      variant: {
        fill: cn('bg-primary-300 text-white', 'disabled:bg-gray-100 disabled:text-gray-500'),
        secondary: cn(
          'bg-gray-100 border border-gray-200 text-gray-900',
          'disabled:bg-gray-100 disabled:text-gray-300'
        ),
        line: cn(
          'border border-primary-300 bg-white text-gray-900',
          'disabled:border-gray-200 disabled:text-gray-500'
        ),
        fill_light: cn(
          'bg-primary-100 text-gray-100',
          'disabled:bg-gray-100 disabled:text-gray-300'
        ),
        fill_secondary: cn(
          'bg-gray-200 text-gray-900',
          'disabled:bg-gray-100 disabled:text-gray-300'
        ),
        line_secondary: cn(
          'border border-gray-300 bg-background text-gray-900',
          'disabled:border-gray-100 disabled:text-gray-300'
        ),
        social_login: cn(
          'border border-gray-200 bg-background',
          'disabled:border-gray-200 disabled:text-gray-300'
        ),
        unselected: cn('text-gray-300 border border-gray-200'),
      },
      size: {
        xs: 'h-8 px-4 rounded-sm text-sm font-medium',
        sm: 'h-10 px-4 text-md font-medium',
        md: 'h-11 px-5 text-md font-medium',
        lg: 'h-12 px-7 text-lg font-medium',
        xl: 'h-14 px-8 text-lg font-medium',
      },
    },
    defaultVariants: {
      variant: 'fill',
      size: 'lg',
    },
  }
);

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>): React.ReactElement {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>): React.ReactElement {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>): React.ReactElement {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
}

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    data-slot="alert-dialog-overlay"
    className={cn(
      'data-[state=open]:animate-in',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=open]:fade-in-0',
      'fixed inset-0 z-50  bg-black/40',
      className
    )}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      data-slot="alert-dialog-content"
      className={cn(
        'data-[state=open]:animate-in',
        'data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0',
        'data-[state=open]:fade-in-0',
        'bg-white focus:outline-none focus-visible:outline-none',
        // 모바일(기본): 바텀시트
        'fixed bottom-0 left-0 right-0 top-auto z-50 max-h-[90dvh] w-full overflow-auto rounded-t-xl border p-6 shadow-lg duration-200',
        'data-[state=closed]:slide-out-to-bottom-2',
        'data-[state=open]:slide-in-from-bottom-2',
        // 데스크톱(sm 이상): 중앙 팝업
        'sm:bottom-auto sm:left-[50%] sm:right-auto sm:top-[50%] sm:max-h-[90vh] sm:max-w-[380px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-md sm:p-6',
        'sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95',
        'sm:data-[state=closed]:slide-out-to-bottom-0 sm:data-[state=open]:slide-in-from-bottom-0',
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<'div'>): React.ReactElement {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('font-pretendard text-2xl font-bold', className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-lg', className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>): React.ReactElement {
  return <AlertDialogPrimitive.Action className={cn(buttonVariants(), className)} {...props} />;
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>): React.ReactElement {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(buttonVariants({ variant: 'fill', size: 'xs' }), className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
