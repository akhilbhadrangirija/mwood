import { NextIntlClientProvider } from 'next-intl';
import { i18n } from '@/i18n.config';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ 
  subsets: ['latin'], 
  weight: ['300','400','500','700'], 
  display: 'optional',
  preload: true,
  variable: '--font-roboto'
});

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  
  // Get the site URL from environment variable or use a default
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mwooduae.com';
  const ogImage = `${siteUrl}/mwood_logo.png`;
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: ['cleaning services', 'Dubai', 'commercial cleaning', 'carpet cleaning', 'sofa cleaning', 'curtain cleaning', 'MWood'],
    authors: [{ name: 'MWood Cleaning Services' }],
    creator: 'MWood Cleaning Services',
    publisher: 'MWood Cleaning Services',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: '/',
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_AE' : 'en_US',
      url: `${siteUrl}/${locale}`,
      title: t('title'),
      description: t('description'),
      siteName: 'MWood Cleaning Services',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'MWood Cleaning Services Logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [ogImage],
      creator: '@mwooduae',
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
    verification: {
      // Add your verification codes here when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  // Provide only the provider; root layout supplies html/body
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className={locale === 'en' ? `${roboto.className} ${roboto.variable}` : undefined}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
