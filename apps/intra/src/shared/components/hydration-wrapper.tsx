'use client';

import { LoadingDots } from '@hiarc-platform/ui';
import { useState, useEffect } from 'react';

interface HydrationWrapperProps {
  children: React.ReactNode;
}

export function HydrationWrapper({ children }: HydrationWrapperProps): React.ReactElement {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <LoadingDots size="lg" className="flex min-h-screen items-center justify-center" />;
  }

  return <>{children}</>;
}
