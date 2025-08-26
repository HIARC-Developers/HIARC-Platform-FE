'use client';

import { ImageSource } from '@hiarc-platform/shared';
import { cn } from '../../../lib/utils';
import { Label } from '../../label/label';
import { useState, useEffect } from 'react';

interface AnnouncementContentSectionProps {
  content?: string;
  images?: ImageSource[];
  className?: string;
}

export function AnnouncementContentSection({
  content,
  images,
  className,
}: AnnouncementContentSectionProps): React.ReactElement {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const formatContent = (text?: string) => {
    if (!text) return '';
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const openImageViewer = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };

  // 화면 크기가 변경될 때 이미지 뷰어가 열려있으면 닫기
  useEffect(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(null);
    }
  }, [isMobile]);

  const goToPrevImage = () => {
    if (images && selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNextImage = () => {
    if (images && selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className={cn('min-h-40 w-full self-start', className)}>
      {images && images.length > 0 && (
        <div className="mb-4 flex gap-2 md:gap-7">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-1 cursor-pointer max-w-[calc((100%-8px)/3)] md:max-w-[calc((100%-112px)/5)]"
              onClick={() => openImageViewer(index)}
            >
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={image.url}
                  alt={`공지사항 이미지 ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Viewer Modal */}
      {selectedImageIndex !== null && images && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeImageViewer}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[selectedImageIndex].url}
              alt={`공지사항 이미지 ${selectedImageIndex + 1}`}
              className="object-contain"
              style={isMobile ? {
                minWidth: '150px',
                minHeight: '150px',
                maxWidth: '90vw',
                maxHeight: '70vh',
              } : {
                minWidth: '200px',
                minHeight: '200px',
                maxWidth: '600px',
                maxHeight: '800px',
              }}
            />

            {/* Close button */}
            <button
              onClick={closeImageViewer}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                {selectedImageIndex > 0 && (
                  <button
                    onClick={goToPrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200"
                  >
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}

                {selectedImageIndex < images.length - 1 && (
                  <button
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all duration-200"
                  >
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-black bg-opacity-50 px-3 py-1 text-white">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      <Label size="lg" className="text-gray-900">
        {formatContent(content)}
      </Label>
    </div>
  );
}
