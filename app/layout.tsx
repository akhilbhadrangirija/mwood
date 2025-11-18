import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mwooduae.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MWood Cleaning Services | Dubai',
    template: '%s | MWood Cleaning Services',
  },
  description: 'Reliable cleaning professionals for your home and office in Dubai. Professional carpet cleaning, sofa cleaning, and curtain cleaning services.',
  keywords: ['cleaning services', 'Dubai', 'commercial cleaning', 'carpet cleaning', 'sofa cleaning', 'curtain cleaning', 'MWood'],
  authors: [{ name: 'MWood Cleaning Services' }],
  creator: 'MWood Cleaning Services',
  publisher: 'MWood Cleaning Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/mwood_logo.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/mwood_logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'MWood Cleaning Services',
    title: 'MWood Cleaning Services | Dubai',
    description: 'Reliable cleaning professionals for your home and office in Dubai.',
    images: [
      {
        url: `${siteUrl}/mwood_logo.png`,
        width: 1200,
        height: 630,
        alt: 'MWood Cleaning Services Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MWood Cleaning Services | Dubai',
    description: 'Reliable cleaning professionals for your home and office in Dubai.',
    images: [`${siteUrl}/mwood_logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}