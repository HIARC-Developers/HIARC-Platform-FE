import React from 'react';
import { cn } from '../lib/utils';

interface DividerProps {
  variant?: 'horizontal' | 'vertical';
  size?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  variant = 'horizontal',
  size = '8px',
  className,
}) => {
  const isHorizontal = variant === 'horizontal';

  const sizeClass = (() => {
    if (size === 'full') {
      return isHorizontal ? 'h-px w-full' : 'h-full w-px';
    }

    return isHorizontal ? `w-[${size}] h-px` : `h-[${size}] w-px`;
  })();

  return <div className={cn('bg-gray-500', sizeClass, className)} />;
};
