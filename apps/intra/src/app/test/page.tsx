'use client';
import LabeledInput from '@/ui/components/signup/LabeledInput';
import LabeledSelect from '@/ui/components/signup/LabeledSelect';
import { LabeledToggle } from '@/ui/components/signup/LabledToggle';
import BojHandleInput from '@/ui/components/signup/BojHandleInput';
import { Button } from '@ui/components/Button';
export default function Test(): React.ReactElement {
  return (
    <div className="flex w-[390px] flex-col">
      <div className="mb-2 text-center text-[32px] font-bold">회원가입</div>
      <LabeledInput label="이름" placeholder="이름을 입력해주세요" required={true} />
      <LabeledInput label="전화번호" placeholder="-없이 숫자만 입력해주세요" required={true} />
      <LabeledInput label="학번" placeholder="학번을 입력해주세요" required={true} />
      <LabeledSelect label="학과" />
      <LabeledToggle label="복수전공 여부" />
      <LabeledSelect label="학년" />
      <LabeledToggle label="재학여부" />
      <BojHandleInput />
      {/*나중에 바꿀거지만 일단 ui 심어놓기위해 ㅎㅎ*/}
      <Button className="mt-5 border bg-[#000947] text-white">회원가입</Button>
    </div>
  );
}
