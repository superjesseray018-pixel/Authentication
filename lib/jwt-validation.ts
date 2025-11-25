import { auth } from '@clerk/nextjs/server'

export interface TokenValidationResult {
  userId: string
  sessionId: string | null
  valid: boolean
  error?: string
}

/**
 * Validates the current session token using Clerk authentication
 * This is used for OAuth 2.1 secured endpoints (Week 6-8)
 * 
 * @returns Token validation result with user and session information
 * @throws Error if authentication token is invalid or missing
 */
export async function validateToken(): Promise<TokenValidationResult> {
  try {
    const authResult = await auth()
    const userId = authResult.userId
    const sessionId = authResult.sessionId

    if (!userId || !sessionId) {
      return {
        userId: '',
        sessionId: null,
        valid: false,
        error: 'Invalid or missing authentication token',
      }
    }

    return {
      userId,
      sessionId,
      valid: true,
    }
  } catch (error) {
    return {
      userId: '',
      sessionId: null,
      valid: false,
      error: error instanceof Error ? error.message : 'Token validation failed',
    }
  }
}

/**
 * Middleware helper to check if request is authenticated
 * Returns the authenticated user ID or null
 */
export async function getAuthenticatedUserId(): Promise<string | null> {
  const authResult = await auth()
  return authResult.userId || null
}

/**
 * Checks if the current session has admin privileges
 * This can be extended with actual role-based checks
 */
export async function isAdmin(): Promise<boolean> {
  const authResult = await auth()
  const userId = authResult.userId
  
  if (!userId) return false
  
  // TODO: Implement actual admin role check when roles are configured in Clerk
  // For now, check against a list of admin user IDs or use Clerk organizations
  const adminUserIds = process.env.ADMIN_USER_IDS?.split(',') || []
  
  return adminUserIds.includes(userId)
}
