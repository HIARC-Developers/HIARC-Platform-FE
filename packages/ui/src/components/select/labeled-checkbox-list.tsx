'use client';

import { SelectOption } from '@hiarc-platform/shared';
import { Label } from '../label/label';
import { CheckboxList } from './checkbox-list';

interface CheckboxListProps {
  label?: string;
  subtitle?: string;
  required?: boolean;
  items: SelectOption[];
  multiple?: boolean;
  selectedValues?: string[];
  selectedValue?: string | null;
  onSelectionChange?(selectedValues: string[]): void;
  onSingleSelectionChange?(selectedValue: string | null): void;
  className?: string;
}

export function LabeledCheckboxList({
  label,
  subtitle,
  items,
  multiple = false,
  selectedValues = [],
  selectedValue = null,
  onSelectionChange,
  onSingleSelectionChange,
  required = false,
  className,
}: CheckboxListProps): React.ReactElement {
  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      {label && (
        <div className="flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative-top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      {subtitle && (
        <Label size="sm" weight="medium" className="text-gray-500">
          {subtitle}
        </Label>
      )}
      <CheckboxList
        className="mt-3"
        items={items}
        multiple={multiple}
        selectedValues={selectedValues}
        selectedValue={selectedValue}
        onSelectionChange={onSelectionChange}
        onSingleSelectionChange={onSingleSelectionChange}
      />
    </div>
  );
}
