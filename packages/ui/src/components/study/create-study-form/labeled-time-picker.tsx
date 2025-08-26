'use client';
import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Label } from '../../label/label';

interface LabeledTimePickerProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?(time: string): void;
  placeholder?: string;
}

function LabeledTimePicker({
  label,
  showLabel = true,
  required = false,
  className = '',
  value = '',
  onChange,
  placeholder = '시간을 선택해주세요',
}: LabeledTimePickerProps): React.ReactElement {
  const [internalValue, setInternalValue] = useState<string>('');

  // Use external value if provided, otherwise use internal state
  const timeValue = value || internalValue;

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = event.target.value;

    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className={cn('w-full flex-col', className)}>
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative-top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}

      <input
        type="time"
        value={timeValue}
        onChange={handleTimeChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}

export { LabeledTimePicker };