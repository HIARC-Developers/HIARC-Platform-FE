import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'rounded-md transition-all duration-150',
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
        whitebg: cn('border border-gray-200 bg-white'),
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

function Button({
  className,
  variant,
  size,
  asChild = false,
  onClick,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }): React.ReactElement {
  const Comp = asChild ? Slot : 'button';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={handleClick}
      type={props.type || 'button'}
      {...props}
    />
  );
}

export { Button };
