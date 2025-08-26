'use client';

import { useState, useEffect } from 'react';
import { RestrictedFeatureDialog } from './restricted-feature-dialog';

interface RestrictedPageGuardProps {
  children: React.ReactNode;
}

export function RestrictedPageGuard({ children }: RestrictedPageGuardProps) {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setShowDialog(true);
  }, []);

  return (
    <>
      {children}
      <RestrictedFeatureDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
}