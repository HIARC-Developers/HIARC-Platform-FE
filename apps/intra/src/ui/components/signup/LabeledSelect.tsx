import Image from 'next/image';
import { selectOption } from '@/constants/selectOptions';
import { cn } from '@utils/lib/utils';
export default function LabeledSelect({ label }: { label: string }): React.ReactElement {
  return (
    <div className="relative mt-2 w-[390px]">
      <label className="mb-2 block text-sm font-semibold">
        {label}
        <span className="ml-0.5 text-red-500">*</span>
      </label>
      <select
        defaultValue=""
        className={cn(
          'text-muted-foreground h-[44px] appearance-none',
          'border-input w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition outline-none',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
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

      <div className="pointer-events-none absolute top-[48px] right-3 -translate-y-1/2">
        <Image src="/Check.svg" alt="Check Icon" width={30} height={30} />
      </div>
    </div>
  );
}
