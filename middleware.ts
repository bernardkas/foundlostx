import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['((?!^/foundlost).*)'],
  ignoredRoutes: ['/api/webhook', '/foundlost'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
