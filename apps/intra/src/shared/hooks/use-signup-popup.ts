'use client';

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const POPUP_STORAGE_KEY = 'signup-popup-closed';

interface SignupPopupStore {
  isPopupClosed: boolean;
  closePopup: () => void;
  resetPopupState: () => void;
  initializeFromStorage: () => void;
}

export const useSignupPopup = create<SignupPopupStore>()(
  subscribeWithSelector((set, get) => ({
    isPopupClosed: false,
    
    closePopup: () => {
      set({ isPopupClosed: true });
      sessionStorage.setItem(POPUP_STORAGE_KEY, 'true');
      // 브라우저 이벤트를 통해 다른 컴포넌트에도 상태 변경 알림
      window.dispatchEvent(new CustomEvent('signup-popup-closed'));
    },
    
    resetPopupState: () => {
      set({ isPopupClosed: false });
      sessionStorage.removeItem(POPUP_STORAGE_KEY);
    },
    
    initializeFromStorage: () => {
      const stored = sessionStorage.getItem(POPUP_STORAGE_KEY);
      if (stored === 'true') {
        set({ isPopupClosed: true });
      }
      
      // storage 이벤트 리스너 추가
      const handleStorageChange = () => {
        const currentStored = sessionStorage.getItem(POPUP_STORAGE_KEY);
        set({ isPopupClosed: currentStored === 'true' });
      };
      
      // custom 이벤트 리스너 추가
      const handleCustomEvent = () => {
        const currentStored = sessionStorage.getItem(POPUP_STORAGE_KEY);
        set({ isPopupClosed: currentStored === 'true' });
      };
      
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('signup-popup-closed', handleCustomEvent);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('signup-popup-closed', handleCustomEvent);
      };
    },
  }))
);