import { create } from 'zustand';
import React from 'react';

export interface DialogConfig {
  id: string;
  title?: string;
  content?: React.ReactNode;
  onConfirm?(): void;
  onCancel?(): void;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'error' | 'success' | 'confirm' | 'custom' | 'component' | 'alert';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hideButtons?: boolean; // 커스텀 다이얼로그에서 기본 버튼 숨기기
  closeOnBackdropClick?: boolean; // 백드롭 클릭시 닫기 여부
  component?: React.ReactNode; // Dialog 구조를 가진 컴포넌트
  showBackground?: boolean; // 백그라운드 표시 여부
}

interface DialogState {
  dialogs: DialogConfig[];
  showDialog(config: Omit<DialogConfig, 'id'>): string;
  hideDialog(id: string): void;
  hideAllDialogs(): void;
}

export const useDialogStore = create<DialogState>((set) => ({
  dialogs: [],

  showDialog: (config) => {
    const id = Math.random().toString(36).substring(7);
    const dialogConfig: DialogConfig = {
      id,
      type: 'info',
      size: 'md',
      confirmText: '확인',
      cancelText: '취소',
      showBackground: true,
      ...config,
    };

    set((state) => ({
      dialogs: [...state.dialogs, dialogConfig],
    }));

    return id;
  },

  hideDialog: (id) => {
    set((state) => ({
      dialogs: state.dialogs.filter((dialog) => dialog.id !== id),
    }));
  },

  hideAllDialogs: () => {
    set({ dialogs: [] });
  },
}));
