'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const studyStatusChipVariants = cva(
  cn(
    'inline-flex items-center leading-none px-2 py-1 rounded-lg',
    'select-none',
    'text-xs font-normal'
  ),
  {
    variants: {
      status: {
        PREPARING: 'bg-category-rating/20 text-category-rating',
        PRE_OPEN: 'bg-category-study/20 text-category-study',
        RECRUITING: 'bg-red/20 text-red',
        IN_PROGRESS: 'bg-primary-100/20 text-primary-100',
        CLOSED: 'bg-gray-200 text-primary-300',
        ENROLLED: 'bg-primary-100/20 text-primary-100',
      },
    },
    defaultVariants: {
      status: 'PREPARING',
    },
  }
);

const statusText: Record<
  NonNullable<VariantProps<typeof studyStatusChipVariants>['status']>,
  string
> = {
  PREPARING: '준비중',
  PRE_OPEN: '오픈예정',
  RECRUITING: '모집중',
  IN_PROGRESS: '진행중',
  CLOSED: '종료',
  ENROLLED: '참여중',
};

type StudyStatusChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof studyStatusChipVariants>;

function StudyStatusChip({
  className,
  status = 'PREPARING',
  children,
  ...props
}: StudyStatusChipProps): React.ReactElement {
  return (
    <span
      data-slot="chip"
      className={cn(studyStatusChipVariants({ status }), className)}
      {...props}
    >
      {children ?? statusText[status ?? 'PREPARING']}
    </span>
  );
}

export { StudyStatusChip };
