'use client';
import { SelectOption } from '@hiarc-platform/shared';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { Label } from '../label/label';

interface LabeledSelectButtonProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
  onChange?(value: string): void;
  className?: string;
}

function LabeledSelectButton({
  label,
  showLabel = true,
  required = false,
  options,
  value,
  disabled = false,
  onChange,
  className = '',
}: LabeledSelectButtonProps): React.ReactElement {
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

      <div
        className="grid w-full gap-2"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      >
        {options.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'line' : 'unselected'}
            disabled={disabled}
            onClick={() => !disabled && onChange?.(option.value)}
            className={cn(
              'h-11 w-full',
              'text-md',
              disabled && value !== option.value && 'cursor-not-allowed opacity-50',
              disabled && value === option.value && 'cursor-not-allowed opacity-75'
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export { LabeledSelectButton };
