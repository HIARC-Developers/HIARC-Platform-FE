import { Divider } from '../../divider';
import { Label } from '../../label/label';
import Image from 'next/image';

interface RelatedUrlsSectionProps {
  urlList?: string[];
}

export function RelatedUrlsSection({
  urlList,
}: RelatedUrlsSectionProps): React.ReactElement | null {
  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-start gap-8 pt-6">
        <div className="flex items-center gap-2">
          <Image src="/shared-assets/Link.svg" width={20} height={20} alt="link" />
          <Label className="w-[85px]" size="lg" weight="semibold">
            관련 URL
          </Label>
        </div>
        <div className="flex w-full flex-col gap-2">
          {!urlList || urlList.length === 0 ? (
            <Label size="md" weight="regular" className="text-gray-500">
              -
            </Label>
          ) : (
            urlList.map((url, index) => (
              <a key={index} href={url} className="leading-none">
                <Label size="md" weight="regular" className="cursor-pointer leading-none underline">
                  {url}
                </Label>
              </a>
            ))
          )}
        </div>
      </div>
      <Divider variant="horizontal" size="full" className="mt-6 bg-gray-200" />
    </div>
  );
}
