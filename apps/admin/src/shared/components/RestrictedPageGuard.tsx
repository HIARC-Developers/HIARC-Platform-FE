'use client';

import React, { useState, useEffect } from 'react';
import { RestrictedFeatureDialog } from './RestrictedFeatureDiaog';

interface RestrictedPageGuardProps {
  children: React.ReactNode;
}

export function RestrictedPageGuard({ children }: RestrictedPageGuardProps): React.ReactElement {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setShowDialog(true);
  }, []);

  return (
    <>
      {children}
      <RestrictedFeatureDialog isOpen={showDialog} onClose={() => setShowDialog(false)} />
    </>
  );
}
