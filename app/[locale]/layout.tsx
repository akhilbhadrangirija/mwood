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
  // Validate locale - if not a valid locale, use default
  const validLocale = i18n.locales.includes(locale as any) ? locale : i18n.defaultLocale;
  const t = await getTranslations({ locale: validLocale, namespace: 'Meta' });
  
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
      locale: validLocale === 'ar' ? 'ar_AE' : 'en_US',
      url: `${siteUrl}/${validLocale}`,
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
  
  // Validate locale - if not a valid locale, use default
  const validLocale = i18n.locales.includes(locale as any) ? locale : i18n.defaultLocale;
  
  let messages;
  try {
    messages = (await import(`@/messages/${validLocale}.json`)).default;
  } catch (error) {
    // Fallback to default locale if import fails
    console.error(`Failed to load messages for locale ${validLocale}:`, error);
    messages = (await import(`@/messages/${i18n.defaultLocale}.json`)).default;
  }
  
  // Provide only the provider; root layout supplies html/body
  return (
    <NextIntlClientProvider locale={validLocale} messages={messages}>
      <div dir={validLocale === 'ar' ? 'rtl' : 'ltr'} className={validLocale === 'en' ? `${roboto.className} ${roboto.variable}` : undefined}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
