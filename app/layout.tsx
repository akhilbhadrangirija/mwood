import type { Metadata } from 'next';
import './globals.css';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'MWood Cleaning Services | Dubai',
  description: 'Reliable cleaning professionals for your home and office in Dubai.',
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, type: 'image/x-icon' },
      { url: `${basePath}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${basePath}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }],
  },
  manifest: `${basePath}/site.webmanifest`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href={`${basePath}/mwood_logo.png`} />
        <link rel="apple-touch-icon" href={`${basePath}/mwood_logo.png`} />
        <link rel="manifest" href={`${basePath}/site.webmanifest`} />
      </head>
      <body>{children}</body>
    </html>
  );
}