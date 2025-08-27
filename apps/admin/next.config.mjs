// apps/admin/next.config.mjs
const nextConfig = {
  transpilePackages: ['@hiarc-platform/ui', '@hiarc-platform/util', '@hiarc-platform/shared'],
  
  // Vercel 최적화
  experimental: {
    externalDir: true, // monorepo 지원
  },
  
  // 모듈 해결 강화
  webpack: (config, { isServer }) => {
    // workspace 패키지들을 올바르게 해결
    config.resolve.alias = {
      ...config.resolve.alias,
      '@hiarc-platform/ui': require.resolve('@hiarc-platform/ui'),
      '@hiarc-platform/shared': require.resolve('@hiarc-platform/shared'),
      '@hiarc-platform/util': require.resolve('@hiarc-platform/util'),
    };
    
    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' http://test.hiarc-official.com https://test.hiarc-official.com https://*.hiarc-official.com http://localhost:* https://localhost:*",
              "frame-ancestors 'none'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
