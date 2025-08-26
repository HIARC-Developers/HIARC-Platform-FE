import { Label } from '@hiarc-platform/ui';

interface CategoryTextProps {
  category: string;
  content: string;
}

export function CategoryText({ category, content }: CategoryTextProps): React.ReactElement {
  return (
    <div className="flex w-full items-center gap-4">
      <Label size="lg" weight="bold" className="w-[85px] text-gray-500">
        {category}
      </Label>
      <Label size="lg" weight="medium">
        {content}
      </Label>
    </div>
  );
}
