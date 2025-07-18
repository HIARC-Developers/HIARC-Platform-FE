import { Input } from '@ui/components/Input';
import { Button } from '@ui/components/Button';
export default function BojHandleInput(): React.ReactElement {
  return (
    <div>
      <div className="mt-2 mb-2 text-[14px] font-semibold">
        <span>BOJ</span>
        <span className="relative -top-[5px] ml-0.5 text-red-500">*</span>
      </div>
      <div className="flex justify-between">
        <Input type="text" placeholder="백준 핸들을 입력해주세요" className="h-[44px] w-[282px]" />
        <Button variant="outline" className="w-[100px] bg-[#000947] text-white">
          로그인
        </Button>
      </div>
    </div>
  );
}
