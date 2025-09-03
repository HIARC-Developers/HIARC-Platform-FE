import { Label, Button, Title, IconButton } from '@hiarc-platform/ui';
import Image from 'next/image';

interface SignupPopupProps {
  onClose(): void;
}

export function SignupPopup({ onClose }: SignupPopupProps): React.ReactElement {
  const handleKakaoClick = (): void => {
    window.open('https://open.kakao.com/o/gIlbZBOh', '_blank');
  };

  const handleDiscordClick = (): void => {
    window.open('https://discord.gg/hjzVcH3p', '_blank');
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <Title size="xs" weight="bold" className="text-gray-900">
          HI-ARC 신규 회원 안내
        </Title>
        <IconButton iconSrc="/shared-assets/Close.svg" onClick={onClose} />
      </div>
      <Label size="lg" weight="regular" className="mt-2 text-gray-700">
        HI-ARC 학회 가입을 환영합니다! 🎉
        <br />
        원활한 소통을 위해 아래 채널에 꼭 참여해 주세요.
      </Label>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex flex-col">
          <Label size="lg">카카오톡 오픈 채팅방</Label>
          <Label size="sm" className="mt-1 text-gray-500">
            * 비밀번호: hiarc
          </Label>
        </div>
        <Button variant="secondary" size="xs" onClick={handleKakaoClick}>
          바로가기
          <Image src="/shared-assets/Open.svg" alt="Arrow" width={16} height={16} />
        </Button>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex flex-col">
          <Label size="lg">디스코드</Label>
        </div>
        <Button variant="secondary" size="xs" onClick={handleDiscordClick}>
          바로가기
          <Image src="/shared-assets/Open.svg" alt="Arrow" width={16} height={16} />
        </Button>
      </div>
    </div>
  );
}
