import { Input } from '@ui/components/Input';
import Image from 'next/image';

export default function HeaderInput(): React.ReactElement {
  return (
    <div className="relative w-full max-w-sm">
      <Image
        src="/ZoomIn.svg"
        alt="Search icon"
        width={16}
        height={16}
        className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2"
      />
      <Input
        type="text"
        placeholder="Placeholder"
        className="w-60 rounded-md bg-gray-100 px-3 py-2 pl-10 text-sm"
      />
    </div>
  );
}
