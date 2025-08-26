import { Textarea } from './textarea';
import { Label } from '../label/label';

interface LabeledTextarea extends Omit<React.ComponentProps<'textarea'>, 'onChange'> {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  onChange?(value: string): void;
  error?: string;
}

function LabeledTextarea({
  placeholder,
  label,
  showLabel = true,
  required = false,
  value,
  onChange,
  className,
  error,
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
        className={className}
        {...props}
      />
      {error && (
        <div className="mt-1">
          <Label size="sm" className="text-red">
            {error}
          </Label>
        </div>
      )}
    </div>
  );
}

export { LabeledTextarea };
