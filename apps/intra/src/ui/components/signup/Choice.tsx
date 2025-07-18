interface ChoiceProps {
  label: string;
  className?: string;
  onClick?(): void;
  isSelected?: boolean;
  width: number;
}

export default function Choice({
  label,
  className = '',
  width,
  onClick,
  isSelected = false,
}: ChoiceProps): React.ReactElement {
  return (
    <button
      style={{ width: `${width}%` }}
      onClick={onClick}
      className={`h-[44px] rounded-md border px-4 py-2 text-sm font-medium ${
        isSelected
          ? 'border-ring ring-ring/50 text-primary font-semibold ring-[3px]'
          : 'border-gray-300 bg-white text-gray-400'
      } ${className}`}
    >
      {label}
    </button>
  );
}
