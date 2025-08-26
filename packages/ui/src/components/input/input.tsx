import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  cn(
    'flex h-9 w-full min-w-0 px-3 py-1',
    'shadow-xs border-input rounded-md border bg-transparent text-base outline-none transition-[color,box-shadow] md:text-md',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-md file:font-medium',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none',
    'placeholder-gray-500 placeholder:text-md placeholder:font-normal'
  ),
  {
    variants: {
      variant: {
        search: cn('rounded-md h-11 bg-gray-100 px-3 py-2 pl-10 text-md font-pretendard'),
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Input({
  className,
  variant,
  type,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>): React.ReactElement {
  return (
    <div className="relative w-full">
      {type === 'search' && (
        /* eslint-disable @next/next/no-img-element */
        /*img태그 성능이슈 있음 */
        <img
          src="/shared-assets/ZoomIn.svg"
          alt="Search Icon"
          width={16}
          height={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60"
        />
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(inputVariants({ variant, className }))}
        {...props}
      />
    </div>
  );
}

export { Input };
