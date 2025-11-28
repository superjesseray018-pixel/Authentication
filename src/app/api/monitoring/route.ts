import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

// Import the shared visitors data from track route
// In production, this would be a database query
let visitorsData: any = null

// Helper to get data from the track route storage
async function getTrackingData() {
  try {
    // In production, query your database here
    // For now, we'll use a module-level cache that the track endpoint populates
    const trackModule = await import('../track/route')
    return (trackModule as any).visitorsData || {
      recentVisits: [],
      recentLogins: [],
      activeViewers: [],
    }
  } catch (error) {
    return {
      recentVisits: [],
      recentLogins: [],
      activeViewers: [],
    }
  }
}

// Get real monitoring data
function getRealMonitoringData() {
  return visitorsData || {
    recentVisits: [],
    recentLogins: [],
    activeViewers: [],
  }
}

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic'

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

    // Get real monitoring data from tracking system
    visitorsData = await getTrackingData()
    const monitoringData = getRealMonitoringData()

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
