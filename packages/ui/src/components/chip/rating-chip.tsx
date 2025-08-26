'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

const ratingChipVariants = cva(
  cn(
    'inline-flex items-center leading-none px-2 py-1 rounded-lg',
    'select-none',
    'text-xs font-normal'
  ),
  {
    variants: {
      rating: {
        UNRATED: 'bg-gray-100 text-gray-600',
        BRONZE_5: 'bg-amber-100 text-amber-700',
        BRONZE_4: 'bg-amber-100 text-amber-700',
        BRONZE_3: 'bg-amber-100 text-amber-700',
        BRONZE_2: 'bg-amber-100 text-amber-700',
        BRONZE_1: 'bg-amber-100 text-amber-700',
        SILVER_5: 'bg-gray-200 text-gray-700',
        SILVER_4: 'bg-gray-200 text-gray-700',
        SILVER_3: 'bg-gray-200 text-gray-700',
        SILVER_2: 'bg-gray-200 text-gray-700',
        SILVER_1: 'bg-gray-200 text-gray-700',
        GOLD_5: 'bg-yellow-100 text-yellow-700',
        GOLD_4: 'bg-yellow-100 text-yellow-700',
        GOLD_3: 'bg-yellow-100 text-yellow-700',
        GOLD_2: 'bg-yellow-100 text-yellow-700',
        GOLD_1: 'bg-yellow-100 text-yellow-700',
        PLATINUM_5: 'bg-cyan-100 text-cyan-700',
        PLATINUM_4: 'bg-cyan-100 text-cyan-700',
        PLATINUM_3: 'bg-cyan-100 text-cyan-700',
        PLATINUM_2: 'bg-cyan-100 text-cyan-700',
        PLATINUM_1: 'bg-cyan-100 text-cyan-700',
        DIAMOND_5: 'bg-blue-100 text-blue-700',
        DIAMOND_4: 'bg-blue-100 text-blue-700',
        DIAMOND_3: 'bg-blue-100 text-blue-700',
        DIAMOND_2: 'bg-blue-100 text-blue-700',
        DIAMOND_1: 'bg-blue-100 text-blue-700',
        RUBY_5: 'bg-red-100 text-red-700',
        RUBY_4: 'bg-red-100 text-red-700',
        RUBY_3: 'bg-red-100 text-red-700',
        RUBY_2: 'bg-red-100 text-red-700',
        RUBY_1: 'bg-red-100 text-red-700',
        DIV_1: 'bg-category-rating/20 text-category-rating',
        DIV_2: 'bg-category-rating/20 text-category-rating',
        DIV_3: 'bg-category-rating/20 text-category-rating',
      },
    },
    defaultVariants: {
      rating: 'UNRATED',
    },
  }
);

const ratingText: Record<NonNullable<VariantProps<typeof ratingChipVariants>['rating']>, string> = {
  DIV_1: 'Div1',
  DIV_2: 'Div2',
  DIV_3: 'Div3',
  UNRATED: 'Unrated',
  BRONZE_5: 'Bronze 5',
  BRONZE_4: 'Bronze 4',
  BRONZE_3: 'Bronze 3',
  BRONZE_2: 'Bronze 2',
  BRONZE_1: 'Bronze 1',
  SILVER_5: 'Silver 5',
  SILVER_4: 'Silver 4',
  SILVER_3: 'Silver 3',
  SILVER_2: 'Silver 2',
  SILVER_1: 'Silver 1',
  GOLD_5: 'Gold 5',
  GOLD_4: 'Gold 4',
  GOLD_3: 'Gold 3',
  GOLD_2: 'Gold 2',
  GOLD_1: 'Gold 1',
  PLATINUM_5: 'Platinum 5',
  PLATINUM_4: 'Platinum 4',
  PLATINUM_3: 'Platinum 3',
  PLATINUM_2: 'Platinum 2',
  PLATINUM_1: 'Platinum 1',
  DIAMOND_5: 'Diamond 5',
  DIAMOND_4: 'Diamond 4',
  DIAMOND_3: 'Diamond 3',
  DIAMOND_2: 'Diamond 2',
  DIAMOND_1: 'Diamond 1',
  RUBY_5: 'Ruby 5',
  RUBY_4: 'Ruby 4',
  RUBY_3: 'Ruby 3',
  RUBY_2: 'Ruby 2',
  RUBY_1: 'Ruby 1',
};

type RatingChipProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof ratingChipVariants>;

function RatingChip({
  className,
  rating = 'UNRATED',
  children,
  ...props
}: RatingChipProps): React.ReactElement {
  return (
    <span data-slot="chip" className={cn(ratingChipVariants({ rating }), className)} {...props}>
      {children ?? ratingText[rating ?? 'UNRATED']}
    </span>
  );
}

export { RatingChip };
export type { RatingChipProps };
