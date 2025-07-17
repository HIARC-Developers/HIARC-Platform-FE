import React from 'react';
import { Button } from '@ui/components/Button';

export default function Home(): React.ReactElement {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 sm:p-20">
      <Button variant="default" size="default">
        intra
      </Button>
    </div>
  );
}
