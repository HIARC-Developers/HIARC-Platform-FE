'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Label } from '../label/label';
import { Input } from './input';

interface LabeledInputProps extends Omit<React.ComponentProps<'input'>, 'onChange'> {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  error?: string;
  isError?: boolean;
  onChange?(value: string): void;
}

function LabeledInput({
  placeholder,
  label,
  showLabel = true,
  required = false,
  error,
  isError = false,
  value,
  onChange,
  ...props
}: LabeledInputProps): React.ReactElement {
  const hasError = isError || Boolean(error);

  return (
    <div className="flex w-full flex-col">
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          'h-11 w-full',
          hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-200'
        )}
        {...props}
      />
      {error && (
        <div className="mt-1">
          <Label size="sm" className="text-red">
            {error}
          </Label>
        </div>
      )}
    </div>
  );
}

export { LabeledInput };
