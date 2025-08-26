'use client';

import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface SlideFadeProps extends Omit<MotionProps, 'initial' | 'animate' | 'exit' | 'transition'> {
  children: React.ReactNode;
  className?: string;
}

export function SlideFade({
  children,
  className,
  ...motionProps
}: SlideFadeProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}