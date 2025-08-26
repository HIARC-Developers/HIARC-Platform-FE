'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const labelVariants = cva(
  cn(
    'items-center gap-2 leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
    'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50'
  ),
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-md',
        lg: 'text-lg',
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      size: 'md',
      weight: 'regular',
    },
  }
);

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants> & {
    selectable?: boolean;
  };

function Label({
  className,
  size,
  weight,
  selectable = true,
  ...props
}: LabelProps): React.ReactElement {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        labelVariants({ size, weight }),
        selectable ? 'select-text' : 'select-none',
        className
      )}
      {...props}
    />
  );
}

export { Label };
