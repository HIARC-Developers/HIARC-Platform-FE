import * as React from 'react';
import { cn } from '../../lib/utils';

interface AnchorLabelProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  href: string;
}

const sizeClass = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
};

const weightClass = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

export function AnchorLabel({
  className,
  size = 'md',
  weight = 'regular',
  ...props
}: AnchorLabelProps): React.ReactElement {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(sizeClass[size], weightClass[weight], className)}
      {...props}
    />
  );
}
