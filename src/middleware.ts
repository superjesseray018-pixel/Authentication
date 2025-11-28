import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/security(.*)',
  '/testing(.*)',
  '/security-plan(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    try {
      const { userId } = await auth();
      
      if (!userId) {
        // Redirect unauthenticated users to unauthorized page
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    } catch (error) {
      // If Clerk fails (missing keys, etc.), block access anyway
      console.error('Clerk middleware error:', error);
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
