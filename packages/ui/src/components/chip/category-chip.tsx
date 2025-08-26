'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const categoryChipVariants = cva(
  cn(
    'inline-flex items-center leading-none px-2 py-1 rounded-lg',
    'select-none',
    'text-xs font-normal'
  ),
  {
    variants: {
      category: {
        RATING: 'bg-category-rating/20 text-category-rating',
        STUDY: 'bg-category-study/20 text-category-study',
        ETC: 'bg-category-etc_background/20 text-category-etc',
        GENERAL: 'bg-category-general/20 text-category-general',
        EXTERNAL: 'bg-category-external/20 text-category-external',
        PARTICIPATING: 'bg-category-participating/20 text-category-participating',
        RECRUITING: 'bg-category-recruiting/20 text-category-recruiting',
        ONGOING: 'bg-category-participating/20 text-category-participating',
        FINISHED: 'bg-gray-200 text-primary-300 ',
      },
    },
    defaultVariants: {
      category: 'RATING',
    },
  }
);

const categoryText: Record<
  NonNullable<VariantProps<typeof categoryChipVariants>['category']>,
  string
> = {
  RATING: '하이팅',
  STUDY: '스터디',
  ETC: '기타',
  GENERAL: '학회일정',
  EXTERNAL: '외부',
  PARTICIPATING: '참여중',
  RECRUITING: '모집중',
  ONGOING: '진행중',
  FINISHED: '종료',
};

type CategoryChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof categoryChipVariants>;

function CategoryChip({
  className,
  category = 'RATING',
  children,
  ...props
}: CategoryChipProps): React.ReactElement {
  return (
    <span data-slot="chip" className={cn(categoryChipVariants({ category }), className)} {...props}>
      {children ?? categoryText[category ?? 'RATING']}
    </span>
  );
}

export { CategoryChip };
