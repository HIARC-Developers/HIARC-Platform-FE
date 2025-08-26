/**
 * 브라우저에서 쿠키를 삭제하는 유틸리티 함수들
 */

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

  console.log(`Cookie deleted: ${name}`);
}

/**
 * access 토큰 쿠키를 삭제합니다
 */
export function deleteAccessCookie(): void {
  // 여러 가능한 도메인으로 시도
  const domains = [
    '.test.hiarc-official.com',
    'test.hiarc-official.com',
    'local.test.hiarc-official.com',
    '.local.test.hiarc-official.com',
  ];

  domains.forEach((domain) => {
    deleteCookie('access', domain, '/');
  });

  // 도메인 없이도 시도
  deleteCookie('access');
}

/**
 * 로그아웃 시 모든 인증 관련 데이터를 삭제합니다
 */
export function clearAllAuthData(): void {
  console.log('[clearAllAuthData] 시작');

  // 쿠키 삭제
  deleteAccessCookie();

  // localStorage에서 auth 데이터 삭제 (약간의 지연 후)
  setTimeout(() => {
    try {
      console.log('[clearAllAuthData] localStorage 삭제 전:', localStorage.getItem('auth-storage'));
      localStorage.removeItem('auth-storage');
      console.log('[clearAllAuthData] localStorage 삭제 후:', localStorage.getItem('auth-storage'));
      console.log('localStorage auth data cleared');
    } catch (error) {
      console.error('Failed to clear localStorage auth data:', error);
    }
  }, 100);

  console.log('[clearAllAuthData] 완료');
}
