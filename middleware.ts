import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/routing';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const blogPath = /^(?:\/(?:en|es|pt))?\/blog(?:\/|$)/;

  if (blogPath.test(pathname)) {
    const url = request.nextUrl.clone();
    const locale = pathname.match(/^\/(en|es|pt)(?:\/|$)/)?.[1] || defaultLocale;
    url.pathname = `/${locale}/__not-found__`;
    return NextResponse.rewrite(url);
  }

  // Keep one canonical host so www and non-www are not indexed as separate sites.
  if (request.nextUrl.hostname === 'www.flfgpools.com') {
    const url = request.nextUrl.clone();
    url.hostname = 'flfgpools.com';
    return NextResponse.redirect(url, 308);
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (hasLocale) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|favicon|robots|sitemap|.*\\..*).*)',
  ],
};
