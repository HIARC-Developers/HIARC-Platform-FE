import React, { useRef } from 'react';
import { cn } from '../../lib/utils';

interface NumberInputProps {
  length: number;
  value: string;
  onChange(value: string): void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  length,
  value,
  onChange,
  disabled = false,
  autoFocus = false,
  className,
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (idx: number, event: React.ChangeEvent<HTMLInputElement>): void => {
    const val = event.target.value.replace(/[^0-9]/g, '');
    const newValue = value.split('');

    if (val) {
      newValue[idx] = val[val.length - 1];
      onChange(newValue.join('').slice(0, length));
      if (idx < length - 1) {
        inputsRef.current[idx + 1]?.focus();
      }
    } else {
      newValue[idx] = '';
      onChange(newValue.join('').slice(0, length));
    }
  };

  const handleKeyDown = (idx: number, event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Backspace') {
      const newValue = value.split('');
      if (value[idx]) {
        newValue[idx] = '';
        onChange(newValue.join('').slice(0, length));
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        newValue[idx - 1] = '';
        onChange(newValue.join('').slice(0, length));
      }
      event.preventDefault();
    }
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputsRef.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[idx] || ''}
          onChange={(event) => handleChange(idx, event)}
          onKeyDown={(event) => handleKeyDown(idx, event)}
          disabled={disabled}
          autoFocus={idx === 0 && autoFocus}
          className={cn(
            'h-14 w-12',
            'rounded-lg border border-gray-200 bg-white',
            'text-center font-pretendard text-2xl font-bold outline-none transition-colors',
            'focus:border-primary-300'
          )}
        />
      ))}
    </div>
  );
};
