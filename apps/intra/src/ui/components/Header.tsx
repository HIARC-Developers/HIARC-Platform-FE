import HeaderInput from './HeaderInput';
import { Button } from '@ui/components/Button';

export default function Header(): React.ReactElement {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200 px-6 py-4 sm:px-10">
      <div className="mx-auto flex w-5/8 min-w-[600px] items-center justify-between">
        <div className="text-[24px] font-bold">HI - ARC</div>
        <div className="flex items-center gap-4">
          <HeaderInput />
          <Button variant="outline" className="bg-white text-black">
            로그인
          </Button>
        </div>
      </div>
    </header>
  );
}
