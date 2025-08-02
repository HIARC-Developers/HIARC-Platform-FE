import React, { useState } from 'react';
import Image from 'next/image';
import { Label } from '@hiarc-platform/ui';

export default function LabeledImageInput({
  label,
  showLabel = true,
  required = false,
}: {
  label: string;
  showLabel?: boolean;
  required?: boolean;
}): React.ReactElement {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files) {
      return;
    }
    const selectedFiles = Array.from(event.target.files);
    if (images.length > 4) {
      alert('최대 5장까지 업로드할 수 있습니다.');
      return;
    }
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...selectedFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemove = (index: number): void => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2">
      {showLabel && (
        <div className=" flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative-top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <div className="flex items-center gap-2">
        <label className="flex h-[72px] w-[72px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-white hover:bg-gray-100">
          <Image src="/Camera.svg" alt="카메라 아이콘" width={24} height={24} />
          <span className=" text-sm text-gray-500">{`${images.length} / 5`}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        <div className="flex gap-2">
          {previews.map((src, index) => (
            <div key={index} className="relative h-[72px] w-[72px]">
              <Image
                src={src}
                alt={`preview-${index}`}
                width={72}
                height={72}
                unoptimized
                className="h-full w-full rounded-md object-cover"
              />
              <button
                onClick={() => handleRemove(index)}
                className="absolute right-1.5 top-1.5 h-4 w-4 rounded-md bg-black text-xs text-white"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
