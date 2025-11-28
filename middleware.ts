import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/admin(.*)',
  '/security(.*)',
  '/testing(.*)',
  '/security-plan(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Get user info
  const { userId, sessionClaims } = await auth();
  
  // Check if user is admin (superjesseray018@gmail.com)
  if (userId && sessionClaims) {
    const email = sessionClaims.email as string;
    const isAdmin = email === 'superjesseray018@gmail.com';
    
    // Set admin role in session claims (if not already set)
    if (isAdmin && sessionClaims.metadata?.role !== 'admin') {
      sessionClaims.metadata = { ...sessionClaims.metadata, role: 'admin' };
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};