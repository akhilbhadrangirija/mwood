import createMiddleware from 'next-intl/middleware';
import { i18n } from './i18n.config';

export default createMiddleware(i18n);

export const config = {
  // Match only internationalized pathnames
  // Exclude API routes, static files, and other non-page routes
  matcher: ['/', '/(ar|en)/:path*']
};

