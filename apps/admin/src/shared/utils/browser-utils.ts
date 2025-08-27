/**
 * 인앱 브라우저 감지 및 외부 브라우저 리다이렉트 유틸리티
 */

export const BrowserUtils = {
  /**
   * 현재 브라우저가 인앱 브라우저인지 감지합니다
   */
  isInAppBrowser(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return false;
    }
    
    const userAgent = navigator.userAgent || navigator.vendor;
    
    // iOS 인앱 브라우저들
    const iosInAppBrowsers = [
      'FBAN',      // Facebook
      'FBAV',      // Facebook
      'Instagram', // Instagram
      'Line',      // Line
      'KakaoTalk', // KakaoTalk
      'KAKAOTALK', // KakaoTalk
      'wv',        // WebView
    ];

    // Android 인앱 브라우저들
    const androidInAppBrowsers = [
      'wv',        // WebView
      'Version/.*Chrome/.*Mobile.*Safari', // Android WebView
      'FB_IAB',    // Facebook In-App Browser
      'FBAN',      // Facebook
      'FBAV',      // Facebook
      'Instagram', // Instagram
      'Line',      // Line
      'KakaoTalk', // KakaoTalk
    ];

    // iOS 인앱 브라우저 검사
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return iosInAppBrowsers.some(browser => userAgent.includes(browser));
    }

    // Android 인앱 브라우저 검사
    if (/Android/i.test(userAgent)) {
      return androidInAppBrowsers.some(browser => new RegExp(browser).test(userAgent));
    }

    return false;
  },

  /**
   * 현재 URL을 외부 브라우저로 열도록 안내합니다
   */
  openInExternalBrowser(url?: string): void {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return;
    }
    
    const targetUrl = url || window.location.href;
    
    if (this.isInAppBrowser()) {
      // 인앱 브라우저에서는 사용자에게 외부 브라우저 사용을 안내
      const message = '구글 로그인은 외부 브라우저에서만 가능합니다.\n\n' +
                     '우측 상단의 메뉴(⋯)를 눌러 "브라우저에서 열기" 또는 "외부 브라우저에서 열기"를 선택해주세요.';
      
      alert(message);
      
      // iOS Safari로 열기 시도 (iOS에서만 작동)
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `x-web-search://?${targetUrl}`;
      }
      
      return;
    }

    // 일반 브라우저에서는 그대로 진행
    if (url && url !== window.location.href) {
      window.location.href = url;
    }
  },

  /**
   * 구글 로그인 전 인앱 브라우저 체크
   */
  checkBeforeGoogleLogin(): boolean {
    if (this.isInAppBrowser()) {
      this.showInAppBrowserWarning();
      return false;
    }
    return true;
  },

  /**
   * 인앱 브라우저 경고 메시지 표시
   */
  showInAppBrowserWarning(): void {
    if (typeof window === 'undefined') {
      return;
    }
    
    const message = '🚫 구글 로그인 제한 안내\n\n' +
                   '현재 앱 내 브라우저에서는 Google 정책에 의해 로그인이 제한됩니다.\n\n' +
                   '✅ 해결 방법:\n' +
                   '1. 우측 상단 메뉴(⋯) 클릭\n' +
                   '2. "브라우저에서 열기" 선택\n' +
                   '3. Chrome, Safari 등에서 로그인\n\n' +
                   '불편을 드려 죄송합니다.';
    
    alert(message);
  },

  /**
   * 사용자 에이전트 정보를 콘솔에 출력 (디버깅용) - Debug logs removed
   */
  logUserAgent(): void {
    // Debug logs removed
  }
};