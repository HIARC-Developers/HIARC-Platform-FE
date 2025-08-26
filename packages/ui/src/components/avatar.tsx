'use client';

import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { cn } from '../lib/utils';

interface AvatarProps {
  className?: string;
  imageUrl?: string;
  alt?: string;
}

export function Avatar({ className, imageUrl, alt }: AvatarProps): React.ReactElement {
  const [hasError, setHasError] = useState(false);
  const isFallback = !imageUrl || hasError;
  const imgSrc = isFallback ? '/shared-assets/User.svg' : imageUrl;

  return (
    <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-gray-300">
      <Image
        src={imgSrc}
        alt={alt || 'User Avatar'}
        width={40}
        height={40}
        className={cn(isFallback ? 'h-5 w-5' : 'size-10 object-cover', className)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
