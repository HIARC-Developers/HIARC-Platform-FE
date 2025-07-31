import { Textarea } from './textarea';
import { Label } from '../label/label';

interface LabeledTextarea extends Omit<React.ComponentProps<'textarea'>, 'onChange'> {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  onChange?(value: string): void;
}

function LabeledTextarea({
  placeholder,
  label,
  showLabel = true,
  required = false,
  value,
  onChange,
  className,
  ...props
}: LabeledTextarea): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-2 flex items-center">
        <Label weight="medium" size="md">
          {label}
        </Label>
        {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
      </div>
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className="h-11 w-full border-gray-200"
        {...props}
      />
    </div>
  );
}

export { LabeledTextarea };
