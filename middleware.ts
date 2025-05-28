import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es', 'fr', 'de', 'zh', 'ar', 'ja','ru'];
const defaultLocale = 'en';

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || '';

  const languages = acceptLanguage.split(',')
    .map(lang => {
      const [language, priority] = lang.split(';q=');
      return {
        language: language.trim().split('-')[0], // Get base language code (en-US -> en)
        priority: priority ? parseFloat(priority) : 1.0
      };
    })
    .sort((a, b) => b.priority - a.priority)
    .map(item => item.language);

  // Find the first matching locale
  const matchedLocale = languages.find(lang => locales.includes(lang));
  return matchedLocale || defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if this is an image request - if so, skip the redirect
  if (pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|PNG)$/)) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);

    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal Next.js paths, API routes, and static files
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};