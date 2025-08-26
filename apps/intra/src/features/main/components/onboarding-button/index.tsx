'use client';

import { cn, Title } from '@hiarc-platform/ui';
import React from 'react';

interface OnboardingButtonProps {
  className?: string;
  semesterName?: string;
  onClick(): void;
}

export function OnboardingButton({
  className,
  semesterName,
  onClick,
}: OnboardingButtonProps): React.ReactElement {
  return (
    <button
      className={cn(
        'flex w-full items-center justify-center rounded-xl',
        'bg-gradient-to-r from-primary-100 to-primary-200 py-4',
        'text-white',
        'shadow-sm',
        'transition',
        'hover:opacity-90',
        className
      )}
      onClick={onClick}
    >
      <Title className="cursor-pointer text-white md:hidden" size="xs" weight="bold">
        🚀 {semesterName || ''} HI-ARC 참여하러 가기
      </Title>
      <Title className="hidden cursor-pointer text-white md:block" size="sm" weight="bold">
        🚀 {semesterName || ''} HI-ARC 참여하러 가기
      </Title>
    </button>
  );
}
