import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { visitorsData } from '../track/route'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    // Check authentication
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Return monitoring data
    return NextResponse.json({
      recentVisits: visitorsData.recentVisits,
      recentLogins: visitorsData.recentLogins,
      activeViewers: visitorsData.activeViewers,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error fetching monitoring data:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
