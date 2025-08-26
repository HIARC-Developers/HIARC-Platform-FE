'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const titleVariants = cva(
  cn(
    'flex items-center gap-2 leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
    'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50'
  ),
  {
    variants: {
      size: {
        xs: 'text-xl',
        sm: 'text-2xl',
        lg: 'text-5xl',
      },
      weight: {
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  }
);

type TitleProps = React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof titleVariants> & {
    selectable?: boolean;
    disableAnimation?: boolean;
  };

function isNumeric(value: React.ReactNode): boolean {
  return typeof value === 'number' || (typeof value === 'string' && /^\d+$/.test(value));
}

function useCountUp(target: number, duration = 1000): number {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let start: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number): void => {
      if (!start) {
        start = timestamp;
      }
      const progress = timestamp - start;
      const progressRatio = Math.min(progress / duration, 1);
      const currentValue = Math.floor(progressRatio * target);
      setValue(currentValue);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return value;
}

function Title({
  className,
  size,
  weight,
  selectable = true,
  disableAnimation = false,
  children,
  ...props
}: TitleProps): React.ReactElement {
  const shouldAnimate = !disableAnimation && isNumeric(children);
  const targetValue = shouldAnimate ? Number(children) : null;
  const animatedValue = useCountUp(targetValue ?? 0);

  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        titleVariants({ size, weight }),
        selectable ? 'select-text' : 'select-none',
        className
      )}
      {...props}
    >
      {shouldAnimate ? animatedValue.toLocaleString() : children}
    </LabelPrimitive.Root>
  );
}

export { Title };
