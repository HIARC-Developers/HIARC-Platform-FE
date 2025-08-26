import React from 'react';

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function LoadingDots({
  size = 'md',
  color = 'bg-primary-300',
  className = '',
}: LoadingDotsProps): React.ReactElement {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  const dotClass = `${sizeClasses[size]} ${color} rounded-full animate-bounce-up`;

  return (
    <div className={`flex space-x-1 ${className}`}>
      <div className={`${dotClass} animation-delay-0`}></div>
      <div className={`${dotClass} animation-delay-150`}></div>
      <div className={`${dotClass} animation-delay-300`}></div>
    </div>
  );
}

export { LoadingDots as default };
