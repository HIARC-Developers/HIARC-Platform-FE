import { NextResponse } from 'next/server';

/**
 * 보안 헤더 설정 미들웨어
 * - X-Frame-Options: DENY
 * - Content-Security-Policy: default-src 'self'
 * - Cache-Control: public, max-age=3600
 *
 * @param res NextResponse
 */
export function headersMiddleware(res: NextResponse): void {
  // const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    connect-src 'self' https://test.hiarc-official.com https://*.hiarc-official.com https://accounts.google.com https://oauth2.googleapis.com https://*.amazonaws.com https://*.s3.ap-northeast-2.amazonaws.com http://localhost:* https://localhost:*;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`;
  res.headers.set('X-Frame-Options', 'DENY');
  // res.headers.set('x-nonce', nonce);
  res.headers.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());
  // 이 부분은 1시간이 적합한지 논의 필요
  res.headers.set('Cache-Control', 'public, max-age=3600');
}
