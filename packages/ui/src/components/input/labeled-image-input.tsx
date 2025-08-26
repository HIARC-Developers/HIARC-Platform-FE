'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Label } from '../label/label';
import { cn } from '../../lib/utils';
import { ImageSource } from '@hiarc-platform/shared';

interface LabeledImageInputProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  value?: File[];
  existingImages?: ImageSource[];
  onChange?: (images: File[]) => void;
  onExistingImagesChange?: (images: ImageSource[]) => void;
}

type ImageItem = {
  id: string;
  type: 'existing' | 'new';
  src: string;
  imageSource?: ImageSource;
  file?: File;
  originalIndex: number;
};

export function LabeledImageInput({
  label,
  showLabel = true,
  required = false,
  value = [],
  existingImages = [],
  onChange,
  onExistingImagesChange,
}: LabeledImageInputProps): React.ReactElement {
  const [allImages, setAllImages] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 기존 이미지와 새 이미지를 하나의 배열로 통합
  useEffect(() => {
    const newAllImages: ImageItem[] = [];
    
    // 1. 기존 이미지들 먼저 추가
    existingImages.forEach((imageSource, index) => {
      newAllImages.push({
        id: `existing-${imageSource.resourceKey || index}`,
        type: 'existing',
        src: imageSource.url || '',
        imageSource,
        originalIndex: index
      });
    });
    
    // 2. 새 이미지들 나중에 추가  
    value.forEach((file, index) => {
      newAllImages.push({
        id: `new-${index}-${file.name}`,
        type: 'new',
        src: URL.createObjectURL(file),
        file,
        originalIndex: index
      });
    });
    
    setAllImages(newAllImages);
    
    // 메모리 정리
    return () => {
      newAllImages.forEach(item => {
        if (item.type === 'new' && item.src.startsWith('blob:')) {
          URL.revokeObjectURL(item.src);
        }
      });
    };
  }, [existingImages, value]);

  const totalImageCount = (existingImages?.length || 0) + (value?.length || 0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (!event.target.files) {
      return;
    }
    const selectedFiles = Array.from(event.target.files);
    if (totalImageCount + selectedFiles.length > 5) {
      alert('최대 5장까지 업로드할 수 있습니다.');
      return;
    }

    // 파일 배열 업데이트
    if (onChange) {
      const currentFiles = value || [];
      onChange([...currentFiles, ...selectedFiles]);
    }
  };

  const handleRemoveNewImage = (index: number): void => {
    if (onChange && value) {
      const newFiles = value.filter((_, i) => i !== index);
      onChange(newFiles);
    }
  };

  const handleRemoveExistingImage = (index: number): void => {
    if (onExistingImagesChange && existingImages) {
      const newImages = existingImages.filter((_, i) => i !== index);
      onExistingImagesChange(newImages);
    }
  };

  const handleCameraClick = (): void => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      {showLabel && (
        <div className=" flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'flex aspect-square h-[72px] w-[72px] rounded-lg',
            'cursor-pointer flex-col items-center justify-center',
            'border border-dashed border-gray-200 bg-white',
            'transition-colors duration-200 hover:bg-gray-100'
          )}
          onClick={handleCameraClick}
        >
          <Image src="/shared-assets/Camera.svg" alt="카메라 아이콘" width={24} height={24} />
          <Label className="text-gray-500" size="sm">{`${totalImageCount} / 5`}</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="flex gap-2">
          {allImages.map((item) => (
            <div key={item.id} className="relative aspect-square h-[72px] w-[72px]">
              <Image
                src={item.src}
                alt={`image-${item.originalIndex}`}
                width={72}
                height={72}
                unoptimized
                className="h-full w-full rounded-md object-cover"
              />
              <button
                onClick={() => {
                  if (item.type === 'existing') {
                    handleRemoveExistingImage(item.originalIndex);
                  } else {
                    handleRemoveNewImage(item.originalIndex);
                  }
                }}
                className="hover:bg-red-600 absolute z-10 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white shadow-md"
                style={{ top: '4px', right: '4px' }}
                type="button"
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
