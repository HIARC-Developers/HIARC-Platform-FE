import { IconButton } from '../icon-button';
import { LabeledInput } from '../input/labeled-input';
import { Label } from '../label/label';

interface UrlInputProps {
  value: string;
  onChange(value: string): void;
  onRemove(): void;
  error?: string;
}

export function UrlInput({ value, onChange, onRemove, error }: UrlInputProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center justify-center gap-2">
        <LabeledInput
          label=""
          showLabel={false}
          placeholder="URL을 입력해주세요"
          value={value}
          onChange={(value: string) => onChange(value)}
        />
        <IconButton iconSrc="/shared-assets/DeleteButton.svg" size="lg" onClick={onRemove} />
      </div>
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
