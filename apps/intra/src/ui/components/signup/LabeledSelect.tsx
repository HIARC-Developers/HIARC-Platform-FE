import Image from 'next/image';
import { selectOption } from '@/constants/selectOptions';
import { cn } from '@utils/lib/utils';
import { useState } from 'react';
import { Input } from '@ui/components/Input';
export default function LabeledSelect({ label }: { label: string }): React.ReactElement {
  const [selected, setSelected] = useState('');
  const isPlaceholder = selected === '';
  return (
    <div className="relative mt-2 w-[390px]">
      <label className="mb-2 block text-sm font-semibold">
        {label}
        <span className="ml-0.5 text-red-500">*</span>
      </label>
      <select
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        className={cn(
          'text-muted-foreground h-[44px] appearance-none',
          'border-input w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition outline-none',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          isPlaceholder ? 'text-gray-400' : 'text-black'
        )}
      >
        <option value="" disabled hidden>
          {label}을 선택해주세요
        </option>
        {selectOption[label]?.map((each) => (
          <option key={each.value} value={each.value}>
            {each.label}
          </option>
        ))}
      </select>
      {selected === '기타' && (
        <Input className="mt-2 h-[44px]" placeholder="기타 학과명을 입력해주세요." />
      )}

      <div className="pointer-events-none absolute top-[48px] right-3 -translate-y-1/2">
        <Image src="/Check.svg" alt="Check Icon" width={30} height={30} />
      </div>
    </div>
  );
}
