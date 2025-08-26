'use client';

import React from 'react';
import { motion, MotionProps, Easing } from 'framer-motion';

interface FadeInProps extends Omit<MotionProps, 'initial' | 'animate' | 'transition'> {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
  ease?: Easing;
  className?: string;
}

export function FadeIn({
  children,
  isVisible,
  duration = 0.5,
  ease = 'easeInOut' as const,
  className,
  ...motionProps
}: FadeInProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration, ease }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}