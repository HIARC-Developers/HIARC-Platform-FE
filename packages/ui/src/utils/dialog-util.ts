import React from 'react';
import { useDialogStore, DialogConfig } from '../store/dialog-store';

export class DialogUtil {
  private static getStore(): ReturnType<typeof useDialogStore.getState> {
    return useDialogStore.getState();
  }

  /**
   * 기본 다이얼로그를 표시합니다
   */
  static showDialog(config: Omit<DialogConfig, 'id'>): string {
    return this.getStore().showDialog(config);
  }

  /**
   * 정보 다이얼로그를 표시합니다
   */
  static showInfo(
    content: React.ReactNode,
    title?: string,
    onConfirm?: () => void,
    options?: { showBackground?: boolean }
  ): string {
    return this.showDialog({
      type: 'info',
      title: title || '정보',
      content,
      onConfirm,
      showBackground: options?.showBackground,
    });
  }

  /**
   * 성공 다이얼로그를 표시합니다
   */
  static showSuccess(
    title?: string,
    onConfirm?: () => void,
    options?: { showBackground?: boolean }
  ): string {
    return this.showDialog({
      type: 'success',
      title: title || '성공',
      onConfirm,
      showBackground: options?.showBackground,
    });
  }

  /**
   * 경고 다이얼로그를 표시합니다
   */
  static showWarning(
    title?: string,
    onConfirm?: () => void,
    options?: { showBackground?: boolean }
  ): string {
    return this.showDialog({
      type: 'warning',
      title: title || '경고',
      onConfirm,
      showBackground: options?.showBackground,
    });
  }

  /**
   * 에러 다이얼로그를 표시합니다 (AlertDialog로 표시)
   */
  static showError(
    title?: string,
    onConfirm?: () => void,
    options?: { showBackground?: boolean }
  ): string {
    return this.showDialog({
      type: 'alert',
      title: title || '오류',
      onConfirm,
      showBackground: options?.showBackground,
    });
  }

  /**
   * 확인 다이얼로그를 표시합니다
   */
  static showConfirm(
    content: React.ReactNode,
    onConfirm?: () => void,
    onCancel?: () => void,
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
      showBackground?: boolean;
    }
  ): string {
    return this.showDialog({
      type: 'confirm',
      title: options?.title || '확인',
      content,
      onConfirm,
      onCancel,
      confirmText: options?.confirmText || '확인',
      cancelText: options?.cancelText || '취소',
      showBackground: options?.showBackground,
    });
  }

  /**
   * 특정 다이얼로그를 닫습니다
   */
  static hideDialog(id: string): void {
    this.getStore().hideDialog(id);
  }

  /**
   * 모든 다이얼로그를 닫습니다
   */
  static hideAllDialogs(): void {
    this.getStore().hideAllDialogs();
  }

  /**
   * Promise 기반의 확인 다이얼로그
   */
  static confirm(
    content: React.ReactNode,
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
    }
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.showConfirm(
        content,
        () => resolve(true),
        () => resolve(false),
        options
      );
    });
  }

  /**
   * Promise 기반의 정보 다이얼로그
   */
  static info(content: React.ReactNode, title?: string): Promise<void> {
    return new Promise((resolve) => {
      this.showInfo(content, title, () => resolve());
    });
  }

  /**
   * 커스텀 다이얼로그를 표시합니다
   */
  static showCustom(
    content: React.ReactNode,
    options?: {
      title?: string;
      size?: 'sm' | 'md' | 'lg' | 'xl';
      hideButtons?: boolean;
      closeOnBackdropClick?: boolean;
      onConfirm?(): void;
      onCancel?(): void;
      confirmText?: string;
      cancelText?: string;
    }
  ): string {
    return this.showDialog({
      type: 'custom',
      title: options?.title,
      content,
      size: options?.size || 'md',
      hideButtons: options?.hideButtons,
      closeOnBackdropClick: options?.closeOnBackdropClick,
      onConfirm: options?.onConfirm,
      onCancel: options?.onCancel,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
    });
  }

  /**
   * Promise 기반의 커스텀 다이얼로그
   */
  static custom(
    content: React.ReactNode,
    options?: {
      title?: string;
      size?: 'sm' | 'md' | 'lg' | 'xl';
      hideButtons?: boolean;
      closeOnBackdropClick?: boolean;
      confirmText?: string;
      cancelText?: string;
    }
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.showCustom(content, {
        ...options,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }

  /**
   * 완전 커스터마이징된 다이얼로그를 표시합니다 (모든 옵션을 직접 제어)
   */
  static showFullCustom(config: Omit<DialogConfig, 'id'>): string {
    return this.showDialog(config);
  }

  /**
   * AlertDialog로 정보를 표시합니다
   */
  static showAlertInfo(content: React.ReactNode, title?: string, onConfirm?: () => void): string {
    return this.showDialog({
      type: 'alert',
      title: title || '정보',
      content,
      onConfirm,
    });
  }

  /**
   * AlertDialog로 경고를 표시합니다
   */
  static showAlertWarning(
    content: React.ReactNode,
    title?: string,
    onConfirm?: () => void
  ): string {
    return this.showDialog({
      type: 'alert',
      title: title || '경고',
      content,
      onConfirm,
    });
  }

  /**
   * AlertDialog로 성공 메시지를 표시합니다
   */
  static showAlertSuccess(
    content: React.ReactNode,
    title?: string,
    onConfirm?: () => void
  ): string {
    return this.showDialog({
      type: 'alert',
      title: title || '성공',
      content,
      onConfirm,
    });
  }

  /**
   * AlertDialog로 확인 다이얼로그를 표시합니다
   */
  static showAlertConfirm(
    content: React.ReactNode,
    onConfirm?: () => void,
    onCancel?: () => void,
    options?: {
      title?: string;
      confirmText?: string;
      cancelText?: string;
    }
  ): string {
    return this.showDialog({
      type: 'alert',
      title: options?.title || '확인',
      content,
      onConfirm,
      onCancel,
      confirmText: options?.confirmText || '확인',
      cancelText: options?.cancelText || '취소',
    });
  }

  /**
   * Dialog 구조를 가진 컴포넌트를 다이얼로그로 표시합니다
   */
  static showComponent(
    component: React.ReactNode,
    options?: {
      closeOnBackdropClick?: boolean;
      showBackground?: boolean;
    }
  ): string {
    return this.showDialog({
      type: 'component',
      component: component,
      hideButtons: true,
      closeOnBackdropClick: options?.closeOnBackdropClick ?? true,
      showBackground: options?.showBackground ?? true,
    });
  }

  /**
   * 서버 에러를 처리하고 에러 다이얼로그를 표시합니다
   * 백엔드에서 보낸 에러 메시지를 우선적으로 표시하며, 없을 경우 기본 메시지를 사용합니다
   * @param error - 처리할 에러 (AxiosError 또는 일반 Error)
   * @param defaultMessage - 백엔드 메시지가 없을 때 사용할 기본 메시지
   * @param onConfirm - 확인 버튼 클릭 시 실행할 콜백
   */
  static showServerError(
    error: unknown,
    defaultMessage = '오류가 발생했습니다.',
    onConfirm?: () => void
  ): string {
    // AxiosError 타입 정의
    interface AxiosError {
      response?: {
        status?: number;
        data?: {
          message?: string;
        };
      };
      message?: string;
    }

    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const backendMessage = axiosError.response?.data?.message;
    
    // 401 에러는 API 인터셉터에서 처리되므로 여기서 무시
    if (status === 401) {
      return ''; // 빈 ID 반환하여 다이얼로그 표시하지 않음
    }
    
    const errorMessage = backendMessage || (error as Error)?.message || defaultMessage;

    return this.showDialog({
      type: 'alert',
      title: errorMessage || '오류',
      onConfirm,
    });
  }
}
