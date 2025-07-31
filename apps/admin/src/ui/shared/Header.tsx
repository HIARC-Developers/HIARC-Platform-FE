'use client';
import { Input } from '@hiarc-platform/ui';
import { Button } from '@hiarc-platform/ui';
import Image from 'next/image';
import { LabeledSelector } from '@hiarc-platform/ui';
import { selectOption } from 'constants/selectOption';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
export default function Header(): React.ReactElement {
  const [selectedSemester, setSelectedSemester] = useState(selectOption['학기'][0].value);

  const pathname = usePathname();
  const tabItems = [
    { label: '학회원관리', value: 'manage' },
    { label: '공지사항', value: 'notice' },
    { label: '스터디', value: 'study/information' },
    { label: '대회', value: 'competition' },
    { label: '운영진', value: 'admin' },
  ];

  return (
    <header className="w-full  items-center justify-between border-b border-gray-200   sm:px-10">
      <div className="mx-auto  flex w-full min-w-[600px] max-w-[1200px] items-center gap-6 ">
        <Image src="/Logo.svg" alt="HiarcLogo" width={120} height={30} />

        <LabeledSelector
          required={false}
          label=""
          placeholder=""
          options={selectOption['학기']}
          value={selectedSemester}
          onChange={setSelectedSemester}
          className="mb-2 ml-4 w-[142px] border-gray-900 font-normal"
        />

        <nav className="flex gap-8 overflow-x-auto whitespace-nowrap">
          {tabItems.map(({ label, value }) => {
            const isActive = pathname.includes(`/${value}`);
            return (
              <Link
                key={value}
                href={`/${value}`}
                className={`text-lg ${isActive ? 'font-bold text-black' : 'text-gray-200'}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className=" ml-auto flex items-center gap-4">
          <Input
            type="search"
            variant="search"
            placeholder="Placeholder"
            className="w-55 h-[44px]"
          />
          <Image src="/User.svg" alt="user" width={36} height={36} />

          <Button variant="fill_light" size="sm">
            출석체크
          </Button>
        </div>
      </div>
    </header>
  );
}
