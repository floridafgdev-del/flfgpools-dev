import type { Metadata } from 'next';
import { DM_Sans, Inter, Playfair_Display } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import {  setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { locales, defaultLocale } from '@/i18n/routing';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SvgFilters } from '@/components/svg-filters';
import { Chatbot } from '@/components/chatbot';
import { combinedSchema } from '@/lib/schema';
import { BUSINESS_INFO, SEO_CONFIG, SITE_URL } from '@/config/site';
import '../global.css';

export const dynamic = 'force-dynamic';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-about-body',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  // Requests the middleware skips (favicon.ico, any file-like path) still reach
  // this segment, so the locale has to be validated before importing messages.
  if (!locales.includes(params.locale as any)) {
    redirect(`/${defaultLocale}`);
  }

  const messages = (await import(`@/messages/${params.locale}.json`)).default;
  const meta = messages.Meta;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.home.title,
      template: `%s | ${SEO_CONFIG.shortName}`,
    },
    description: meta.home.description,
    applicationName: BUSINESS_INFO.name,
    icons: {
      icon: '/favicon-flfg.png',
      shortcut: '/favicon-flfg.png',
      apple: '/favicon-flfg.png',
    },
    keywords: [...SEO_CONFIG.keywords],
    authors: [{ name: BUSINESS_INFO.legalName }],
    creator: BUSINESS_INFO.legalName,
    publisher: BUSINESS_INFO.name,
    alternates: {
      canonical: `/${params.locale}`,
      languages: {
        'en-US': '/en',
        'es-US': '/es',
        'pt-BR': '/pt',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: SEO_CONFIG.localeMap[params.locale as keyof typeof SEO_CONFIG.localeMap] || params.locale,
      alternateLocale: locales
        .filter((l) => l !== params.locale)
        .map((l) => SEO_CONFIG.localeMap[l as keyof typeof SEO_CONFIG.localeMap] || l),
      url: `${SITE_URL}/${params.locale}`,
      siteName: BUSINESS_INFO.name,
      title: meta.home.title,
      description: meta.home.description,
      images: [
        {
          url: `/${params.locale}/opengraph-image`,
          width: SEO_CONFIG.ogImageWidth,
          height: SEO_CONFIG.ogImageHeight,
          alt: BUSINESS_INFO.name,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.twitter,
      creator: SEO_CONFIG.twitter,
      title: meta.home.title,
      description: meta.home.description,
      images: [`/${params.locale}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    ...(SEO_CONFIG.googleVerification
      ? { verification: { google: SEO_CONFIG.googleVerification } }
      : {}),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(params.locale as any)) {
    redirect(`/${defaultLocale}`);
  }

  setRequestLocale(params.locale);

  const messages = (await import(`@/messages/${params.locale}.json`)).default;

  return (
    <html lang={params.locale} className={`${inter.variable} ${playfair.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(combinedSchema(params.locale)),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <SvgFilters />
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Header />
          <main className="MAIN">{children}</main>
          <Footer />
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}