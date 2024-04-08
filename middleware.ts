import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: req => !req.url.includes('/foundlost'),
  ignoredRoutes: ['/((?!api|trpc))(_next.*|.+.[w]+$)', '/sign-in'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
