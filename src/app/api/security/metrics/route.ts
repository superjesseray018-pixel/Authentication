import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/**
 * Security Metrics API Endpoint
 * Week 9 Implementation - Real-time security monitoring data
 */

// In-memory storage for demo purposes
// In production, this would come from a database or monitoring service
let securityMetrics = {
  totalRequests: 1247,
  blockedRequests: 23,
  activeUsers: 145,
  securityAlerts: 3,
  lastScan: new Date().toISOString(),
  requestHistory: [] as Array<{ timestamp: string; status: number; blocked: boolean }>,
}

export async function GET() {
  const authResult = await auth()
  const userId = authResult.userId

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Calculate additional metrics
  const last24Hours = Date.now() - 24 * 60 * 60 * 1000
  const recentBlocked = securityMetrics.requestHistory.filter(
    (req) => new Date(req.timestamp).getTime() > last24Hours && req.blocked
  ).length

  const metrics = {
    ...securityMetrics,
    recentBlocked24h: recentBlocked,
    successRate: Math.round(
      ((securityMetrics.totalRequests - securityMetrics.blockedRequests) / securityMetrics.totalRequests) * 100
    ),
    uptime: '99.9%',
    avgResponseTime: '234ms',
  }

  return NextResponse.json(metrics)
}

export async function POST(request: Request) {
  const authResult = await auth()
  const userId = authResult.userId

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Record new request in history
    if (body.type === 'record_request') {
      securityMetrics.requestHistory.push({
        timestamp: new Date().toISOString(),
        status: body.status || 200,
        blocked: body.blocked || false,
      })

      // Keep only last 1000 entries
      if (securityMetrics.requestHistory.length > 1000) {
        securityMetrics.requestHistory = securityMetrics.requestHistory.slice(-1000)
      }

      securityMetrics.totalRequests++
      if (body.blocked) {
        securityMetrics.blockedRequests++
      }

      return NextResponse.json({ success: true, message: 'Request recorded' })
    }

    // Update security alerts
    if (body.type === 'update_alerts') {
      securityMetrics.securityAlerts = body.count || securityMetrics.securityAlerts
      return NextResponse.json({ success: true, message: 'Alerts updated' })
    }

    return NextResponse.json({ error: 'Invalid request type' }, { status: 400 })
  } catch (error) {
    console.error('Security metrics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
