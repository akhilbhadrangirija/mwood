import type { NextConfig } from 'next'

const config: NextConfig = {
  // Add this 'images' configuration
  images: {
    // Static export + GitHub Pages: disable the image optimizer
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
  // When deploying to a project site like https://<user>.github.io/mwood-website
  // set basePath to the repository name so asset URLs resolve correctly.
  // If you later use a custom domain at the root, remove this.
  basePath: '/mwood-website',
  output: 'export',
  // Silence workspace root warning by explicitly setting the root for Turbopack
  turbopack: {
    root: __dirname,
  },
}

export default config