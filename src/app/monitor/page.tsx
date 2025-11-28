"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Monitor,
  UserCheck,
  Users,
  RefreshCw,
  Globe,
  Calendar,
  Clock,
  MapPin,
  Smartphone,
  Laptop,
  Shield,
  Eye,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

interface VisitData {
  id: string
  type: "guest" | "user"
  email?: string
  device: string
  browser: string
  os: string
  ipAddress: string
  location: string
  timestamp: string
  lastActive: string
  isActive: boolean
}

interface LoginData {
  id: string
  email: string
  name: string
  device: string
  browser: string
  ipAddress: string
  location: string
  loginTime: string
  lastActive: string
  sessionDuration: string
}

interface ActiveViewer {
  id: string
  type: "guest" | "user"
  email?: string
  name?: string
  device: string
  browser: string
  ipAddress: string
  pageViewing: string
  timeOnPage: string
  timestamp: string
}

export default function MonitorPage() {
  const { user } = useUser()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const [recentVisits, setRecentVisits] = useState<VisitData[]>([])
  const [recentLogins, setRecentLogins] = useState<LoginData[]>([])
  const [activeViewers, setActiveViewers] = useState<ActiveViewer[]>([])

  // Check if user is admin
  useEffect(() => {
    if (user) {
      const userEmail = user.emailAddresses?.[0]?.emailAddress
      if (userEmail === 'superjesseray018@gmail.com') {
        setIsAdmin(true)
        fetchMonitoringData()
      } else {
        router.push('/')
      }
    } else {
      setLoading(false)
    }
  }, [user, router])

  const fetchMonitoringData = async () => {
    try {
      const response = await fetch('/api/monitoring')
      const data = await response.json()
      
      setRecentVisits(data.recentVisits || [])
      setRecentLogins(data.recentLogins || [])
      setActiveViewers(data.activeViewers || [])
      setLastRefresh(new Date())
    } catch (error) {
      console.error('Error fetching monitoring data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchMonitoringData()
    setTimeout(() => setRefreshing(false), 500)
  }

  const handleClear = async () => {
    if (!confirm('Are you sure you want to clear all monitoring data? This action cannot be undone.')) {
      return
    }

    setClearing(true)
    try {
      const response = await fetch('/api/track', {
        method: 'DELETE',
      })
      
      if (response.ok) {
        // Clear local state
        setRecentVisits([])
        setRecentLogins([])
        setActiveViewers([])
        alert('All monitoring data has been cleared successfully.')
      } else {
        alert('Failed to clear monitoring data. Please try again.')
      }
    } catch (error) {
      console.error('Error clearing data:', error)
      alert('An error occurred while clearing data.')
    } finally {
      setClearing(false)
    }
  }

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!isAdmin) return

    const interval = setInterval(() => {
      fetchMonitoringData()
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [isAdmin])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading monitoring dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <div className="text-center space-y-4">
            <Shield className="h-12 w-12 text-destructive mx-auto" />
            <h2 className="text-2xl font-bold">Access Denied</h2>
            <p className="text-muted-foreground">
              This page is only accessible to administrators.
            </p>
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const getDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('mobile') || device.toLowerCase().includes('phone')) {
      return <Smartphone className="h-4 w-4" />
    }
    return <Laptop className="h-4 w-4" />
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <Shield className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
              <span className="text-lg font-semibold text-foreground">JRL</span>
            </Link>
            <Link href="/">
              <Button variant="ghost">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Visitor Monitoring Dashboard
              </h1>
              <p className="text-muted-foreground">
                Real-time tracking of site visitors, user logins, and active sessions
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex gap-2">
                <Button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  variant="default"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button
                  onClick={handleClear}
                  disabled={clearing}
                  variant="destructive"
                >
                  <Trash2 className={`h-4 w-4 mr-2 ${clearing ? 'animate-pulse' : ''}`} />
                  Clear All
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Recent Visits</p>
                <p className="text-3xl font-bold text-foreground">{recentVisits.length}</p>
              </div>
              <Globe className="h-10 w-10 text-primary opacity-50" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Recent Logins</p>
                <p className="text-3xl font-bold text-foreground">{recentLogins.length}</p>
              </div>
              <UserCheck className="h-10 w-10 text-primary opacity-50" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Currently Viewing</p>
                <p className="text-3xl font-bold text-foreground">{activeViewers.length}</p>
              </div>
              <Eye className="h-10 w-10 text-primary opacity-50" />
            </div>
          </Card>
        </div>

        {/* Monitoring Tabs */}
        <Tabs defaultValue="visits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visits" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Recent Visits
            </TabsTrigger>
            <TabsTrigger value="logins" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Recent Logins
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Currently Viewing
            </TabsTrigger>
          </TabsList>

          {/* Recent Visits Tab */}
          <TabsContent value="visits">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Site Visits</h2>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Visitor Type</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Device & Browser</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Visit Time</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentVisits.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No recent visits recorded
                          </TableCell>
                        </TableRow>
                      ) : (
                        recentVisits.map((visit) => (
                          <TableRow key={visit.id}>
                            <TableCell>
                              <Badge variant={visit.type === 'user' ? 'default' : 'secondary'}>
                                {visit.type === 'user' ? 'User' : 'Guest'}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {visit.email || '-'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getDeviceIcon(visit.device)}
                                <div className="text-sm">
                                  <div>{visit.device}</div>
                                  <div className="text-muted-foreground text-xs">{visit.browser}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{visit.ipAddress}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3" />
                                {visit.location}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-3 w-3" />
                                {formatTimestamp(visit.timestamp)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={visit.isActive ? 'default' : 'outline'}>
                                {visit.isActive ? 'Active' : 'Left'}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Recent Logins Tab */}
          <TabsContent value="logins">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Recent User Logins</h2>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Device & Browser</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Login Time</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Duration</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentLogins.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No recent logins recorded
                          </TableCell>
                        </TableRow>
                      ) : (
                        recentLogins.map((login) => (
                          <TableRow key={login.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{login.name}</div>
                                <div className="text-sm text-muted-foreground font-mono">{login.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getDeviceIcon(login.device)}
                                <div className="text-sm">
                                  <div>{login.device}</div>
                                  <div className="text-muted-foreground text-xs">{login.browser}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{login.ipAddress}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3" />
                                {login.location}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-3 w-3" />
                                {formatTimestamp(login.loginTime)}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatTimestamp(login.lastActive)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{login.sessionDuration}</Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Currently Viewing Tab */}
          <TabsContent value="active">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Currently Active Viewers</h2>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Visitor</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Device & Browser</TableHead>
                        <TableHead>IP Address</TableHead>
                        <TableHead>Current Page</TableHead>
                        <TableHead>Time on Page</TableHead>
                        <TableHead>Session Start</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeViewers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No active viewers at the moment
                          </TableCell>
                        </TableRow>
                      ) : (
                        activeViewers.map((viewer) => (
                          <TableRow key={viewer.id}>
                            <TableCell>
                              <div>
                                {viewer.name && <div className="font-medium">{viewer.name}</div>}
                                {viewer.email && (
                                  <div className="text-sm text-muted-foreground font-mono">{viewer.email}</div>
                                )}
                                {!viewer.email && <div className="text-sm text-muted-foreground">Anonymous</div>}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={viewer.type === 'user' ? 'default' : 'secondary'}>
                                {viewer.type === 'user' ? 'User' : 'Guest'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getDeviceIcon(viewer.device)}
                                <div className="text-sm">
                                  <div>{viewer.device}</div>
                                  <div className="text-muted-foreground text-xs">{viewer.browser}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{viewer.ipAddress}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Monitor className="h-3 w-3" />
                                {viewer.pageViewing}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{viewer.timeOnPage}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3" />
                                {formatTimestamp(viewer.timestamp)}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <Card className="mt-8 p-6 bg-muted/50">
          <div className="flex items-start gap-3">
            <Monitor className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-semibold">Auto-Refresh Enabled & Privacy Protected</h3>
              <p className="text-sm text-muted-foreground">
                This dashboard automatically refreshes every 30 seconds to show the latest visitor activity. 
                You can also manually refresh using the button above for instant updates.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Privacy Notice:</strong> Email addresses are partially hidden (e.g., us***@domain.com) 
                and IP addresses are masked (e.g., 192.168.***.**) to protect visitor privacy.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
