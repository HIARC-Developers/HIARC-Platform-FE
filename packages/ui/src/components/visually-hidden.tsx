'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0',
      'clip-rect(0,0,0,0)',
      className
    )}
    style={{
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: '0',
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap',
    }}
    {...props}
  />
));
VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };