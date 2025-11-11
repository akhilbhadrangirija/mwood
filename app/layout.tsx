import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MWood Cleaning Services | Dubai',
  description: 'Reliable cleaning professionals for your home and office in Dubai.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}