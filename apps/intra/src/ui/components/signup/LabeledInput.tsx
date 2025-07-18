import { Input } from '@ui/components/Input';
export default function LabeledInput({
  label,
  placeholder,
  required = false,
}: {
  label: string;
  placeholder: string;
  required: boolean;
}): React.ReactElement {
  return (
    <div>
      <div className="mt-2 mb-2 text-[14px] font-semibold">
        {label}
        {required && <span className="relative -top-[5px] ml-0.5 text-red-500">*</span>}
      </div>
      <Input type="text" placeholder={placeholder} className="h-[44px] w-[390px]" />
    </div>
  );
}
