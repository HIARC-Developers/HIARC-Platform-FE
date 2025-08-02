'use client';
import { useState } from 'react';
import { cn } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import { Label } from '@hiarc-platform/ui';
interface LabeledMultiSelectProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  options: string[];
  className?: string;
}

function LabeledMultiSelect({
  label,
  showLabel = true,
  required = false,
  options,
  className = '',
}: LabeledMultiSelectProps): React.ReactElement {
  const [selected, setSelected] = useState<string[]>([]);
  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  return (
    <div className={cn('flex-w-full w-full flex-col', className)}>
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative-top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}

      <div className="flex gap-2">
        {options.map((option) => (
          <Button
            key={option}
            variant={selected.includes(option) ? 'line' : 'unselected'}
            onClick={() => toggleOption(option)}
            className="h-11 w-full"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { LabeledMultiSelect };
