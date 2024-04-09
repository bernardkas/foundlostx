import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: req => !req.url.includes('/foundlost'),
  // publicRoutes: ['/', '/posts', ''],
  ignoredRoutes: ['/sign-in', '/api/webhook'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
