import HeaderInput from './HeaderInput';
import { Button } from '@ui/components/Button';
import Image from 'next/image';

export default function Header(): React.ReactElement {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-200 px-6 py-4 sm:px-10">
      <div className="mx-auto flex w-5/8 min-w-[600px] items-center justify-between">
        <Image src="/Logo.svg" alt="HIARC-LOGO" width={110} height={22} />
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
