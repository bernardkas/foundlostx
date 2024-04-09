import { authMiddleware, withClerkMiddleware } from '@clerk/nextjs';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export default authMiddleware({
  publicRoutes: req => !req.url.includes('/foundlost'),
  // publicRoutes: ['/', '/posts', ''],
  ignoredRoutes: ['/sign-in', '/api/webhook'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
