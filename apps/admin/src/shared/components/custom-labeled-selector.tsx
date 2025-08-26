'use client';

import { SelectOption } from '@hiarc-platform/shared';
import { cn } from '@hiarc-platform/ui';
import { Label } from '@hiarc-platform/ui';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@hiarc-platform/ui';

interface CustomLabeledSelectorProps {
  placeholder: string;
  label: string;
  showLabel?: boolean;
  required?: boolean;
  options: SelectOption[];
  value?: string;
  onChange?(value: string): void;
  className?: string;
  triggerClassName?: string;
  disabled?: boolean;
  showAddButton?: boolean;
  addButtonLabel?: string;
  onAddClick?(): void;
}

function CustomLabeledSelector({
  placeholder,
  label,
  showLabel = true,
  required = false,
  options,
  value,
  onChange,
  className = '',
  triggerClassName = '',
  disabled = false,
  showAddButton = false,
  addButtonLabel = '추가',
  onAddClick,
}: CustomLabeledSelectorProps): React.ReactElement {
  const handleValueChange = (selectedValue: string): void => {
    if (selectedValue === '__ADD_NEW__') {
      onAddClick?.();
      return;
    }
    onChange?.(selectedValue);
  };

  return (
    <div className={cn('flex w-full flex-col', className)}>
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <Select value={value} onValueChange={handleValueChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            'w-full border border-gray-200 data-[placeholder]:text-gray-500',
            triggerClassName
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.length > 0 ? (
              options.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))
            ) : (
              <div className="flex h-10 items-center justify-center">
                <Label className="text-gray-700">선택 가능한 항목이 없습니다.</Label>
              </div>
            )}
            {showAddButton && onAddClick && (
              <SelectItem value="__ADD_NEW__" className="font-medium text-primary-100">
                + {addButtonLabel}
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export { CustomLabeledSelector };
