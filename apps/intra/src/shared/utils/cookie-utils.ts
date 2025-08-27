/**
 * 브라우저에서 쿠키를 관리하는 유틸리티 함수들
 */

/**
 * 쿠키를 읽습니다
 * @param name 쿠키 이름
 * @returns 쿠키 값 또는 null
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue || null;
  }
  return null;
}

/**
 * access 토큰이 있는지 확인합니다
 * @returns 토큰이 있으면 true, 없으면 false
 */
export function hasAccessToken(): boolean {
  const token = getCookie('access');
  return token !== null && token.trim() !== '';
}

/**
 * 쿠키를 삭제합니다
 * @param name 쿠키 이름
 * @param domain 쿠키 도메인 (옵션)
 * @param path 쿠키 경로 (기본값: '/')
 */
export function deleteCookie(name: string, domain?: string, path: string = '/'): void {
  // 쿠키를 삭제하려면 expires를 과거 날짜로 설정
  let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;

  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  document.cookie = cookieString;

  if (process.env.NODE_ENV !== 'production') {
    console.log(`Cookie deleted: ${name}`);
  }
}

/**
 * access 토큰 쿠키를 삭제합니다
 */
export function deleteAccessCookie(): void {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.log('[deleteAccessCookie] 쿠키 삭제 시작');
    console.log('[deleteAccessCookie] 현재 도메인:', window.location.hostname);
    console.log('[deleteAccessCookie] 현재 URL:', window.location.href);
    console.log('[deleteAccessCookie] 현재 쿠키 내용:', document.cookie);
    
    const allCookies = document.cookie.split('; ');
    console.log('[deleteAccessCookie] 모든 쿠키 목록:', allCookies);
    
    const currentAccessCookie = allCookies.find((cookie) => {
      const cookieName = cookie.split('=')[0].trim();
      return cookieName === 'access';
    });
    
    if (currentAccessCookie) {
      console.log('[deleteAccessCookie] 삭제할 access 쿠키 값:', currentAccessCookie);
      const cookieValue = currentAccessCookie.split('=')[1];
      console.log('[deleteAccessCookie] 쿠키 값 길이:', cookieValue ? cookieValue.length : 0);
    } else {
      console.log('[deleteAccessCookie] access 쿠키를 찾을 수 없음');
      console.log(
        '[deleteAccessCookie] 사용 가능한 쿠키 이름들:',
        allCookies.map((c) => c.split('=')[0].trim())
      );
    }
  }

  // 여러 가능한 도메인으로 시도
  const domains = [
    '.hiarc-official.com',
    'hiarc-official.com',
    '.test.hiarc-official.com',
    'test.hiarc-official.com',
    'local.test.hiarc-official.com',
    '.local.test.hiarc-official.com',
  ];

  // 여러 경로로도 시도
  const paths = ['/', '/auth', ''];

  domains.forEach((domain) => {
    paths.forEach((path) => {
      deleteCookie('access', domain, path);
      // SameSite, Secure 속성 포함하여 더 정확하게 삭제 시도
      const cookieString = `access=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain}; SameSite=Lax`;
      document.cookie = cookieString;
      if (!isProduction) {
        console.log(`쿠키 삭제 시도: domain=${domain}, path=${path}`);
      }
    });
  });

  // 도메인 없이도 여러 경로로 시도
  paths.forEach((path) => {
    deleteCookie('access', undefined, path);
  });

  if (!isProduction) {
    console.log('[deleteAccessCookie] 삭제 후 쿠키 내용:', document.cookie);
    console.log('[deleteAccessCookie] 쿠키 삭제 완료');
  }
}

/**
 * 로그아웃 시 모든 인증 관련 데이터를 삭제합니다
 */
export function clearAllAuthData(): void {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    console.log('[clearAllAuthData] 시작');
  }

  // 쿠키 삭제
  deleteAccessCookie();

  // localStorage에서 auth 데이터 삭제 (약간의 지연 후)
  setTimeout(() => {
    try {
      if (!isProduction) {
        console.log('[clearAllAuthData] localStorage 삭제 전:', localStorage.getItem('auth-storage'));
      }
      localStorage.removeItem('auth-storage');
      if (!isProduction) {
        console.log('[clearAllAuthData] localStorage 삭제 후:', localStorage.getItem('auth-storage'));
        console.log('localStorage auth data cleared');
      }
    } catch (error) {
      if (!isProduction) {
        console.error('Failed to clear localStorage auth data:', error);
      }
    }
  }, 100);

  if (!isProduction) {
    console.log('[clearAllAuthData] 완료');
  }
}