'use client';

import { cn } from '@hiarc-platform/ui';
import { SelectOption } from '@hiarc-platform/shared';
import Image from 'next/image';
import { Label } from '../label/label';

function StyledCheckbox({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick?(): void;
}): React.ReactElement {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onClick}
      className="inline-flex h-4 w-4 cursor-pointer items-center justify-center hover:opacity-80"
    >
      {checked ? (
        <Image src="/shared-assets/CheckboxPrimary.svg" alt="checked" width={16} height={16} />
      ) : (
        <div className="inline-block h-4 w-4 rounded-[2px] border border-gray-300 bg-white" />
      )}
    </div>
  );
}

interface CheckboxListProps {
  items: SelectOption[];
  multiple?: boolean;
  selectedValues?: string[];
  selectedValue?: string | null;
  onSelectionChange?(selectedValues: string[]): void;
  onSingleSelectionChange?(selectedValue: string | null): void;
  className?: string;
}

export function CheckboxList({
  items,
  multiple = false,
  selectedValues = [],
  selectedValue = null,
  onSelectionChange,
  onSingleSelectionChange,
  className,
}: CheckboxListProps): React.ReactElement {
  const handleCheckboxChange = (itemValue: string, checked: boolean): void => {
    if (multiple) {
      const newSelectedValues = checked
        ? [...selectedValues, itemValue]
        : selectedValues.filter((value) => value !== itemValue);
      onSelectionChange?.(newSelectedValues);
    } else {
      onSingleSelectionChange?.(checked ? itemValue : null);
    }
  };

  if (multiple) {
    return (
      <div className={cn('space-y-4', className)}>
        {items.map((item) => (
          <div key={item.value} className="flex items-center space-x-3">
            <StyledCheckbox
              checked={selectedValues.includes(item.value)}
              onClick={() => handleCheckboxChange(item.value, !selectedValues.includes(item.value))}
            />
            <Label
              size="md"
              weight="medium"
              onClick={() => handleCheckboxChange(item.value, !selectedValues.includes(item.value))}
              className="cursor-pointer leading-none"
            >
              {item.label}
            </Label>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item) => (
        <div key={item.value} className="flex items-center space-x-3">
          <StyledCheckbox
            checked={selectedValue === item.value}
            onClick={() => handleCheckboxChange(item.value, selectedValue !== item.value)}
          />
          <Label
            size="md"
            weight="medium"
            onClick={() => handleCheckboxChange(item.value, selectedValue !== item.value)}
            className="cursor-pointer leading-none"
          >
            {item.label}
          </Label>
        </div>
      ))}
    </div>
  );
}
