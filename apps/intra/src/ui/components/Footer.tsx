import Image from 'next/image';

export default function Footer(): React.ReactElement {
  return (
    <footer className="w-full border-t border-gray-200 px-6 py-4 sm:px-10">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex gap-2.5 text-center sm:text-left">
          <div className="text-[16px] font-bold">HI-ARC 하이아크</div>
          <div className="text-[12px] text-gray-500">홍익대학교 컴퓨터공학과 알고리즘 학회</div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[12px] text-gray-600">
          <div className="flex items-center gap-1">
            <Image src="/Instagram.svg" alt="Instagram Icon" width={16} height={16} />
            <span>@hi-arc.official</span>
          </div>
          <span>|</span>
          <div className="flex items-center gap-1">
            <Image src="/Mail.svg" alt="Mail Icon" width={16} height={16} />
            <span>hiarc.official@gmail.com</span>
          </div>
          <span>|</span>
          <div className="flex items-center gap-1">
            <Image src="/Message.svg" alt="Message Icon" width={16} height={16} />
            <span>@hi-arc</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
