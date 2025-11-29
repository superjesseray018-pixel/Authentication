import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/security(.*)',
  '/testing(.*)',
  '/security-plan(.*)',
]);

const ADMIN_EMAIL = 'superjesseray018@gmail.com';

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    try {
      const { userId, sessionClaims } = await auth();
      
      // Check if user is authenticated and is admin
      const userEmail = sessionClaims?.email as string | undefined;
      
      if (!userId || userEmail !== ADMIN_EMAIL) {
        // Block access - redirect to unauthorized page
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    } catch (error) {
      // If Clerk fails or throws error, block access
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
