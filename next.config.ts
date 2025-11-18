import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin';

const config: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  output: 'export',
  turbopack: {
    root: __dirname,
  },
}

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(config)