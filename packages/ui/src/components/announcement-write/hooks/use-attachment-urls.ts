import { useState, useCallback } from 'react';

export interface UseAttachmentUrlsReturn {
  urls: string[];
  addUrl: () => void;
  updateUrl: (index: number, value: string) => void;
  removeUrl: (index: number) => void;
  setUrls: (urls: string[]) => void;
  getValidUrls: () => string[];
}

export function useAttachmentUrls(initialUrls: string[] = ['']): UseAttachmentUrlsReturn {
  const [urls, setUrls] = useState<string[]>(initialUrls);

  const addUrl = useCallback(() => {
    setUrls(prev => [...prev, '']);
  }, []);

  const updateUrl = useCallback((index: number, value: string) => {
    setUrls(prev => {
      const newUrls = [...prev];
      newUrls[index] = value;
      return newUrls;
    });
  }, []);

  const removeUrl = useCallback((index: number) => {
    setUrls(prev => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const getValidUrls = useCallback(() => {
    return urls.filter(url => url.trim() !== '');
  }, [urls]);

  return {
    urls,
    addUrl,
    updateUrl,
    removeUrl,
    setUrls,
    getValidUrls,
  };
}