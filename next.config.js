/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['zh', 'en'],
    defaultLocale: 'zh',
    localeDetection: false,
  },
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/zh/:path*',
        destination: '/:path*',
      },
    ];
  },
}

module.exports = nextConfig

