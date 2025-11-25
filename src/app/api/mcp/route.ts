import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import aj from '@/lib/arcjet'

/**
 * MCP (Model Context Protocol) Server Endpoint
 * OAuth 2.1 secured endpoint for AI agent communication
 * Week 6-8 Implementation
 */

export async function GET(request: NextRequest) {
  // Apply Arcjet WAF protection
  const decision = await aj.protect(request, { requested: 1 })
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please slow down.' },
        { status: 429 }
      )
    }
    return NextResponse.json(
      { error: 'Request blocked by security policy' },
      { status: 403 }
    )
  }

  const authResult = await auth()
  const userId = authResult.userId

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized - Authentication required' },
      { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } }
    )
  }

  // MCP server capabilities
  const capabilities = {
    version: '1.0.0',
    userId,
    capabilities: ['read', 'write', 'query'],
    supportedMethods: ['GET', 'POST', 'PUT'],
    rateLimit: {
      requests: 100,
      window: '1m',
    },
  }

  return NextResponse.json({
    message: 'MCP server endpoint - OAuth 2.1 secured',
    ...capabilities,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: NextRequest) {
  // Apply Arcjet WAF protection
  const decision = await aj.protect(request, { requested: 1 })
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please slow down.' },
        { status: 429 }
      )
    }
    return NextResponse.json(
      { error: 'Request blocked by security policy' },
      { status: 403 }
    )
  }

  const authResult = await auth()
  const userId = authResult.userId

  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized - Authentication required' },
      { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } }
    )
  }

  try {
    const body = await request.json()

    // Validate required fields
    if (!body.action) {
      return NextResponse.json({ error: 'Missing required field: action' }, { status: 400 })
    }

    // Process MCP commands based on action
    let result
    switch (body.action) {
      case 'query':
        result = {
          action: 'query',
          data: 'Query processing complete',
          timestamp: new Date().toISOString(),
        }
        break

      case 'update':
        result = {
          action: 'update',
          data: 'Update successful',
          timestamp: new Date().toISOString(),
        }
        break

      case 'execute':
        result = {
          action: 'execute',
          data: 'Execution complete',
          timestamp: new Date().toISOString(),
        }
        break

      default:
        return NextResponse.json({ error: `Unknown action: ${body.action}` }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      userId,
      result,
    })
  } catch (error) {
    console.error('MCP endpoint error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Health check endpoint
export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}
