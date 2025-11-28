import { NextResponse } from 'next/server'

// In-memory storage for demonstration (in production, use a database)
// This will reset when the server restarts
export const visitorsData = {
  recentVisits: [] as any[],
  recentLogins: [] as any[],
  activeViewers: [] as any[],
}

// Clean up inactive viewers (older than 5 minutes)
function cleanupInactiveViewers() {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
  visitorsData.activeViewers = visitorsData.activeViewers.filter(
    viewer => new Date(viewer.lastActivity).getTime() > fiveMinutesAgo
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data } = body

    // Get client info from headers
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ipAddress = forwardedFor?.split(',')[0] || realIp || 'Unknown'

    // Parse user agent for device and browser info
    const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent)
    const device = isMobile ? 'Mobile' : 'Desktop'
    
    let browser = 'Unknown'
    if (userAgent.includes('Chrome')) browser = 'Chrome'
    else if (userAgent.includes('Firefox')) browser = 'Firefox'
    else if (userAgent.includes('Safari')) browser = 'Safari'
    else if (userAgent.includes('Edge')) browser = 'Edge'

    const timestamp = new Date().toISOString()

    if (action === 'page-view') {
      // Track page view
      const viewerId = data.viewerId || `guest-${Date.now()}`
      const existingViewer = visitorsData.activeViewers.find(v => v.id === viewerId)

      if (existingViewer) {
        // Update existing viewer
        existingViewer.pageViewing = data.page
        existingViewer.lastActivity = timestamp
        existingViewer.timeOnPage = data.timeOnPage || '0s'
      } else {
        // Add new viewer
        visitorsData.activeViewers.push({
          id: viewerId,
          type: data.email ? 'user' : 'guest',
          email: data.email || undefined,
          name: data.name || undefined,
          device,
          browser,
          ipAddress,
          pageViewing: data.page,
          timeOnPage: '0s',
          timestamp,
          lastActivity: timestamp,
        })

        // Also add to recent visits
        visitorsData.recentVisits.unshift({
          id: `visit-${Date.now()}`,
          type: data.email ? 'user' : 'guest',
          email: data.email || undefined,
          device,
          browser,
          os: userAgent.includes('Windows') ? 'Windows' : userAgent.includes('Mac') ? 'macOS' : userAgent.includes('Linux') ? 'Linux' : 'Unknown',
          ipAddress,
          location: 'Philippines', // You can integrate IP geolocation API here
          timestamp,
          lastActive: timestamp,
          isActive: true,
        })

        // Keep only last 50 visits
        if (visitorsData.recentVisits.length > 50) {
          visitorsData.recentVisits = visitorsData.recentVisits.slice(0, 50)
        }
      }

      cleanupInactiveViewers()
      return NextResponse.json({ success: true, viewerId })
    }

    if (action === 'user-login') {
      // Track user login
      visitorsData.recentLogins.unshift({
        id: `login-${Date.now()}`,
        email: data.email,
        name: data.name,
        device,
        browser,
        ipAddress,
        location: 'Philippines',
        loginTime: timestamp,
        lastActive: timestamp,
        sessionDuration: '0m',
      })

      // Keep only last 30 logins
      if (visitorsData.recentLogins.length > 30) {
        visitorsData.recentLogins = visitorsData.recentLogins.slice(0, 30)
      }

      return NextResponse.json({ success: true })
    }

    if (action === 'page-leave') {
      // Mark viewer as inactive
      const viewerId = data.viewerId
      const viewer = visitorsData.activeViewers.find(v => v.id === viewerId)
      if (viewer) {
        // Update last activity
        viewer.lastActivity = timestamp
      }

      // Update visit status
      const visit = visitorsData.recentVisits.find(v => v.id.includes(viewerId) || v.email === data.email)
      if (visit) {
        visit.isActive = false
        visit.lastActive = timestamp
      }

      return NextResponse.json({ success: true })
    }

    if (action === 'heartbeat') {
      // Update active viewer's last activity
      const viewerId = data.viewerId
      const viewer = visitorsData.activeViewers.find(v => v.id === viewerId)
      if (viewer) {
        viewer.lastActivity = timestamp
        viewer.pageViewing = data.page
        viewer.timeOnPage = data.timeOnPage || '0s'
      }

      cleanupInactiveViewers()
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
