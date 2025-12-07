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
  // Removed 'output: export' to enable server-side features (API routes, server actions)
  // If you need static export, you can conditionally set this based on an env variable
  turbopack: {
    root: __dirname,
  },
}

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(config)