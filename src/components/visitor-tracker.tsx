"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

export function VisitorTracker() {
  const pathname = usePathname()
  const { user } = useUser()
  const viewerIdRef = useRef<string>('')
  const startTimeRef = useRef<number>(Date.now())
  const heartbeatIntervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Generate or get viewer ID
    let viewerId = localStorage.getItem('viewerId')
    if (!viewerId) {
      viewerId = `visitor-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('viewerId', viewerId)
    }
    viewerIdRef.current = viewerId

    // Track page view
    const trackPageView = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'page-view',
            data: {
              viewerId: viewerIdRef.current,
              page: pathname,
              email: user?.emailAddresses?.[0]?.emailAddress,
              name: user?.fullName,
            },
          }),
        })
      } catch (error) {
        console.error('Error tracking page view:', error)
      }
    }

    trackPageView()

    // Send heartbeat every 10 seconds to show user is still active
    heartbeatIntervalRef.current = setInterval(async () => {
      const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000)
      const minutes = Math.floor(timeOnPage / 60)
      const seconds = timeOnPage % 60
      const timeString = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`

      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'heartbeat',
            data: {
              viewerId: viewerIdRef.current,
              page: pathname,
              timeOnPage: timeString,
              email: user?.emailAddresses?.[0]?.emailAddress,
            },
          }),
        })
      } catch (error) {
        // Silently fail
      }
    }, 10000) // Every 10 seconds

    // Track when user leaves the page
    const handlePageLeave = async () => {
      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'page-leave',
            data: {
              viewerId: viewerIdRef.current,
              email: user?.emailAddresses?.[0]?.emailAddress,
            },
          }),
          keepalive: true, // Ensures request completes even if page is closing
        })
      } catch (error) {
        // Silently fail
      }
    }

    window.addEventListener('beforeunload', handlePageLeave)

    return () => {
      window.removeEventListener('beforeunload', handlePageLeave)
      if (heartbeatIntervalRef.current) {
        clearInterval(heartbeatIntervalRef.current)
      }
      handlePageLeave()
    }
  }, [pathname, user])

  // Track user login
  useEffect(() => {
    if (user) {
      const trackLogin = async () => {
        try {
          await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'user-login',
              data: {
                email: user.emailAddresses?.[0]?.emailAddress,
                name: user.fullName,
              },
            }),
          })
        } catch (error) {
          console.error('Error tracking login:', error)
        }
      }

      trackLogin()
    }
  }, [user?.id]) // Only trigger when user ID changes (new login)

  return null // This component doesn't render anything
}
