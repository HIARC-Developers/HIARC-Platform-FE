'use client';
import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../../button';
import { Label } from '../../label/label';
import { SelectOption } from '@hiarc-platform/shared';

interface LabeledMultiSelectProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  options: SelectOption[];
  className?: string;
  value?: string[];
  onChange?(values: string[]): void;
}

function LabeledMultiSelect({
  label,
  showLabel = true,
  required = false,
  options,
  className = '',
  value = [],
  onChange,
}: LabeledMultiSelectProps): React.ReactElement {
  const [internalSelected, setInternalSelected] = useState<string[]>([]);

  // Use external value if provided, otherwise use internal state
  const selected = value.length > 0 ? value : internalSelected;

  const toggleOption = (optionValue: string): void => {
    const newSelected = selected.includes(optionValue)
      ? selected.filter((val) => val !== optionValue)
      : [...selected, optionValue];

    if (onChange) {
      onChange(newSelected);
    } else {
      setInternalSelected(newSelected);
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

      <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
        {options.map((option) => (
          <Button
            key={option.value}
            variant={selected.includes(option.value) ? 'line' : 'unselected'}
            onClick={() => toggleOption(option.value)}
            size="md"
            className="w-full"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { LabeledMultiSelect };