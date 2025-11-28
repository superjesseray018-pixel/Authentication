import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, Mail, TrendingUp, Activity, Download, Eye, BarChart3, Terminal } from "lucide-react"
import Link from "next/link"

// Mock data for the dashboard
const dashboardStats = {
  totalSubscribers: 1247,
  newSubscribersThisWeek: 23,
  blogViews: 8432,
  securityAlerts: 3,
}

const recentSubscribers = [
  {
    id: "1",
    email: "john.doe@example.com",
    subscribedAt: "2024-03-15T10:30:00Z",
    source: "Homepage",
  },
  {
    id: "2",
    email: "jane.smith@techcorp.com",
    subscribedAt: "2024-03-14T14:45:00Z",
    source: "Blog",
  },
  {
    id: "3",
    email: "security.admin@company.org",
    subscribedAt: "2024-03-13T09:15:00Z",
    source: "Homepage",
  },
  {
    id: "4",
    email: "mike.wilson@startup.io",
    subscribedAt: "2024-03-12T16:20:00Z",
    source: "Blog",
  },
  {
    id: "5",
    email: "sarah.jones@enterprise.com",
    subscribedAt: "2024-03-11T11:30:00Z",
    source: "Homepage",
  },
]

const securityAlerts = [
  {
    id: 1,
    type: "High",
    message: "Unusual login attempt detected from new location",
    timestamp: "2024-03-15T08:30:00Z",
    status: "Active",
  },
  {
    id: 2,
    type: "Medium",
    message: "Multiple failed login attempts",
    timestamp: "2024-03-14T15:45:00Z",
    status: "Resolved",
  },
  {
    id: 3,
    type: "Low",
    message: "Newsletter subscription from suspicious email pattern",
    timestamp: "2024-03-13T12:15:00Z",
    status: "Monitoring",
  },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-bold text-foreground">CyberGuard Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Back to Site
              </Link>
              <Badge variant="secondary">Admin</Badge>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your cybersecurity portfolio performance and manage subscribers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Subscribers</p>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.totalSubscribers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold text-foreground">+{dashboardStats.newSubscribersThisWeek}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blog Views</p>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.blogViews}</p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Alerts</p>
                <p className="text-2xl font-bold text-foreground">{dashboardStats.securityAlerts}</p>
              </div>
              <Activity className="h-8 w-8 text-red-500" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Subscribers */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Recent Subscribers</h2>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="space-y-4">
              {recentSubscribers.map((subscriber) => (
                <div key={subscriber.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{subscriber.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(subscriber.subscribedAt).toLocaleDateString()} • {subscriber.source}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border/40">
              <Button variant="ghost" className="w-full">
                <Link href="/admin/subscribers">View All Subscribers</Link>
              </Button>
            </div>
          </Card>

          {/* Security Alerts */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Security Alerts</h2>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant={
                        alert.type === "High" ? "destructive" : alert.type === "Medium" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {alert.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(alert.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground mb-2">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        alert.status === "Active"
                          ? "destructive"
                          : alert.status === "Resolved"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {alert.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Mail className="h-6 w-6" />
              <span>Send Newsletter</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span>Manage Subscribers</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <BarChart3 className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
            <Link href="/admin/pentest">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent w-full">
                <Terminal className="h-6 w-6" />
                <span>Live Pentest</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
