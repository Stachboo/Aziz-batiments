import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['fr', 'ar'],
  defaultLocale: 'fr',
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Set locale cookie for 1 year
  const locale = response.headers.get('x-middleware-request-x-next-intl-locale')
    || request.nextUrl.pathname.split('/')[1]
    || 'fr';

  if (locale === 'fr' || locale === 'ar') {
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
};
