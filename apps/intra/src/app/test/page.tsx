'use client';
import LabeledInput from '@/ui/components/signup/LabeledInput';
import LabeledSelect from '@/ui/components/signup/LabeledSelect';
export default function Test(): React.ReactElement {
  return (
    <div className="flex w-[390px] flex-col">
      <div className="mb-2 text-center text-[32px] font-bold">회원가입</div>
      <LabeledInput label="이름" placeholder="이름을 입력해주세요" required={true} />
      <LabeledInput label="전화번호" placeholder="-없이 숫자만 입력해주세요" required={true} />
      <LabeledInput label="학번" placeholder="학번을 입력해주세요" required={true} />
      <LabeledSelect label="학과" />
      <LabeledSelect label="학년" />
    </div>
  );
}
