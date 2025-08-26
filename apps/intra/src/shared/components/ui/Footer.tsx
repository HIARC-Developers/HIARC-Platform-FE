import { Divider, Label } from '@hiarc-platform/ui';
import Image from 'next/image';
import { AnchorLabel } from '@hiarc-platform/ui';
interface FooterProps {
  id?: string;
}

export default function Footer({ id }: FooterProps): React.ReactElement {
  return (
    <footer className="w-full border-t border-gray-200 px-5 py-4" id={id}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2 sm:text-left">
          <Label size="lg" weight="bold">
            HI-ARC 하이아크
          </Label>
          <Label size="sm" className="text-gray-700">
            홍익대학교 컴퓨터공학과 알고리즘 학회
          </Label>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 text-gray-600 md:flex-row">
          <div className="flex items-center gap-2">
            <Image src="/shared-assets/Instagram.svg" alt="Instagram Icon" width={16} height={16} />
            <AnchorLabel href="https://www.instagram.com/hiarc.official/">
              @hi-arc.official
            </AnchorLabel>
          </div>
          <Divider variant="vertical" size="8px" className="hidden md:inline-block" />
          <div className="flex items-center gap-2">
            <Image src="/shared-assets/Mail.svg" alt="Mail Icon" width={16} height={16} />
            <Label>hiarc.official@gmail.com</Label>
          </div>
          <Divider variant="vertical" size="8px" className="hidden md:inline-block" />
          <div className="flex items-center gap-2">
            <Image src="/shared-assets/Message.svg" alt="Message Icon" width={16} height={16} />
            <AnchorLabel href="https://pf.kakao.com/_SArxlxb">@hi-arc</AnchorLabel>
          </div>
        </div>
      </div>
    </footer>
  );
}
