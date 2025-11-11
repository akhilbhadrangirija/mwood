import { NextIntlClientProvider } from 'next-intl';
import { i18n } from '@/i18n.config';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['300','400','500','700'], display: 'swap' });

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }>; }) {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  // Provide only the provider; root layout supplies html/body
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className={locale === 'en' ? roboto.className : undefined}>
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
