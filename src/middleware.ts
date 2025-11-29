import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isProtectedRoute = createRouteMatcher([
  '/security(.*)',
  '/testing(.*)',
  '/security-plan(.*)',
  '/monitor(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    try {
      const { userId } = await auth();
      
      // If no authenticated user, redirect to unauthorized
      if (!userId) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
      
      // User is authenticated, allow access
      return NextResponse.next();
    } catch (error) {
      // If Clerk fails, block access
      console.error('Clerk middleware error:', error);
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }
  
  // Allow all other routes
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
