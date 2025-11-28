import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

// Mock data generator - In production, this would come from a database
function generateMockData() {
  const devices = ['Desktop', 'Mobile', 'Tablet', 'Laptop']
  const browsers = ['Chrome 120', 'Firefox 121', 'Safari 17', 'Edge 120']
  const os = ['Windows 11', 'macOS Sonoma', 'iOS 17', 'Android 14']
  const locations = ['Manila, Philippines', 'Quezon City, Philippines', 'Makati, Philippines', 'Cebu City, Philippines', 'Davao City, Philippines']
  const pages = ['/', '/security-plan', '/testing', '/dashboard', '/blog']
  
  // Generate mock IP addresses
  const generateIP = () => {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
  }

  // Generate recent visits
  const recentVisits = Array.from({ length: 15 }, (_, i) => {
    const isUser = Math.random() > 0.5
    const timestamp = new Date(Date.now() - Math.random() * 3600000 * 24) // Last 24 hours
    const isActive = Math.random() > 0.7
    
    return {
      id: `visit-${i}`,
      type: isUser ? 'user' : 'guest',
      email: isUser ? `user${i}@example.com` : undefined,
      device: devices[Math.floor(Math.random() * devices.length)],
      browser: browsers[Math.floor(Math.random() * browsers.length)],
      os: os[Math.floor(Math.random() * os.length)],
      ipAddress: generateIP(),
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: timestamp.toISOString(),
      lastActive: new Date(timestamp.getTime() + Math.random() * 600000).toISOString(),
      isActive,
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Generate recent logins
  const recentLogins = Array.from({ length: 10 }, (_, i) => {
    const loginTime = new Date(Date.now() - Math.random() * 3600000 * 48) // Last 48 hours
    const lastActive = new Date(loginTime.getTime() + Math.random() * 3600000)
    const duration = Math.floor((lastActive.getTime() - loginTime.getTime()) / 60000) // minutes
    
    return {
      id: `login-${i}`,
      email: `user${i}@example.com`,
      name: `User ${i}`,
      device: devices[Math.floor(Math.random() * devices.length)],
      browser: browsers[Math.floor(Math.random() * browsers.length)],
      ipAddress: generateIP(),
      location: locations[Math.floor(Math.random() * locations.length)],
      loginTime: loginTime.toISOString(),
      lastActive: lastActive.toISOString(),
      sessionDuration: `${duration}m`,
    }
  }).sort((a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime())

  // Generate active viewers
  const activeViewers = Array.from({ length: 8 }, (_, i) => {
    const isUser = Math.random() > 0.4
    const timestamp = new Date(Date.now() - Math.random() * 600000) // Last 10 minutes
    const timeOnPage = Math.floor(Math.random() * 600) // seconds
    
    return {
      id: `active-${i}`,
      type: isUser ? 'user' : 'guest',
      email: isUser ? `viewer${i}@example.com` : undefined,
      name: isUser ? `Viewer ${i}` : undefined,
      device: devices[Math.floor(Math.random() * devices.length)],
      browser: browsers[Math.floor(Math.random() * browsers.length)],
      ipAddress: generateIP(),
      pageViewing: pages[Math.floor(Math.random() * pages.length)],
      timeOnPage: timeOnPage > 60 ? `${Math.floor(timeOnPage / 60)}m ${timeOnPage % 60}s` : `${timeOnPage}s`,
      timestamp: timestamp.toISOString(),
    }
  })

  return {
    recentVisits,
    recentLogins,
    activeViewers,
  }
}

export async function GET(request: Request) {
  try {
    // Check if user is authenticated and is admin
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userEmail = user.emailAddresses?.[0]?.emailAddress
    const isAdmin = userEmail === 'superjesseray018@gmail.com'

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Generate mock data
    // In production, this would query your database for actual visitor data
    const monitoringData = generateMockData()

    return NextResponse.json(monitoringData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  } catch (error) {
    console.error('Error fetching monitoring data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
