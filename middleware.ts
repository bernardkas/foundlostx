import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: req =>
    !req.url.includes('/foundlost') || req.url === '/sign-in',
  ignoredRoutes: ['/api/webhook'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
