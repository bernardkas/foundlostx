import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: req => !req.url.includes('/foundlost'),
  ignoredRoutes: ['/api/webhook', '/sign-in'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
