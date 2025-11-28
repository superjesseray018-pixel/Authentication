import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'

// Get real monitoring data
// In production, this would query your database for actual visitor data
function getRealMonitoringData() {
  // For now, return empty arrays since we don't have a database yet
  // Once you set up analytics/tracking, this will return real data
  return {
    recentVisits: [],
    recentLogins: [],
    activeViewers: [],
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

    // Get real monitoring data
    // In production, this would query your database for actual visitor data
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
