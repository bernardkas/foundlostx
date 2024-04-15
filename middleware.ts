import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['((?!^/admin).*)'],
  ignoredRoutes: ['/api/webhook'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
