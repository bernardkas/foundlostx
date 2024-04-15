import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['((?!^/foundlost).*)'],
  ignoredRoutes: ['/api/webhook'],
});

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };
