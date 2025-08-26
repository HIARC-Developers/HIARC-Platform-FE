import { cva } from 'class-variance-authority';
import Image from 'next/image';
import React from 'react';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  cn(
    'flex items-center justify-center text-gray-500',
    'hover:bg-gray-100 hover:text-gray-700',
    'focus:outline-none',
    'transition-colors duration-200'
  ),
  {
    variants: {
      size: {
        sm: 'w-6 h-6 rounded-sm',
        md: 'w-8 h-8 rounded-sm',
        lg: 'w-10 h-10 rounded-md',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const iconVariants = cva('', {
  variants: {
    size: {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type IconButtonProps = React.ComponentPropsWithRef<'button'> & {
  // SVG 아이콘 지원
  iconPath?: string;
  iconProps?: React.SVGProps<SVGSVGElement>;
  // 이미지 아이콘 지원
  iconSrc?: string;
  iconAlt?: string;
  size?: 'sm' | 'md' | 'lg';
  iconSize?: 'sm' | 'md' | 'lg';
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { iconPath, iconProps, iconSrc, iconAlt = 'icon', size = 'md', iconSize, className, ...props },
    ref
  ) => {
    const resolvedIconSize = iconSize || size;
    const useImage = iconSrc && (!iconPath || iconSrc);

    const getIconPixelSize = (size: 'sm' | 'md' | 'lg'): number => {
      switch (size) {
        case 'sm':
          return 12;
        case 'md':
          return 16;
        case 'lg':
          return 20;
        default:
          return 16;
      }
    };

    const iconPixelSize = getIconPixelSize(resolvedIconSize);

    return (
      <button
        type="button"
        className={cn(buttonVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        {useImage ? (
          <Image
            src={iconSrc!}
            alt={iconAlt}
            width={iconPixelSize}
            height={iconPixelSize}
            className={cn(iconVariants({ size: resolvedIconSize }))}
          />
        ) : iconPath ? (
          <svg
            className={cn(iconVariants({ size: resolvedIconSize }), iconProps?.className)}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            {...iconProps}
          >
            <path d={iconPath} />
          </svg>
        ) : null}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
export { IconButton };
