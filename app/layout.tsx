import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollAnimations from './components/ScrollAnimations'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MWood Cleaning Services | Dubai',
  description: 'Reliable cleaning professionals for your home and office in Dubai.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ScrollAnimations />
      </body>
    </html>
  )
}