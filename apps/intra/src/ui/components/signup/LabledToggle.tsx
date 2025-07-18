// LabeledToggle.tsx
import { useState } from 'react';
import Choice from './Choice';
import { selectOption } from '@/constants/selectOptions';

interface LabeledToggleProps {
  label: string;
}

export function LabeledToggle({ label }: LabeledToggleProps): React.ReactElement {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (value: string): void => {
    setSelected(value);
  };

  return (
    <div className="mt-2 text-[14px] font-semibold">
      <div className="mb-2">
        {label}
        <span className="relative -top-[5px] ml-0.5 text-red-500">*</span>
      </div>
      <div className="flex w-[390px] justify-between">
        {selectOption[label]?.map((option) => (
          <Choice
            key={option.value}
            width={selectOption[label].length === 0 ? 0 : 97 / selectOption[label].length}
            label={option.label}
            isSelected={selected === option.value}
            onClick={() => handleClick(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
