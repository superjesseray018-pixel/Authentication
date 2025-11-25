import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Users, Mail, Download, Search, Filter, MoreHorizontal, Calendar } from "lucide-react"
import Link from "next/link"

// Mock subscriber data
const allSubscribers = [
  {
    id: "1",
    email: "john.doe@example.com",
    subscribedAt: "2024-01-15T10:30:00Z",
    source: "Homepage",
    status: "Active",
    engagement: "High",
  },
  {
    id: "2",
    email: "jane.smith@techcorp.com",
    subscribedAt: "2024-01-20T14:45:00Z",
    source: "Blog",
    status: "Active",
    engagement: "Medium",
  },
  {
    id: "3",
    email: "security.admin@company.org",
    subscribedAt: "2024-02-01T09:15:00Z",
    source: "Homepage",
    status: "Active",
    engagement: "High",
  },
  {
    id: "4",
    email: "mike.wilson@startup.io",
    subscribedAt: "2024-02-05T16:20:00Z",
    source: "Blog",
    status: "Active",
    engagement: "Low",
  },
  {
    id: "5",
    email: "sarah.jones@enterprise.com",
    subscribedAt: "2024-02-10T11:30:00Z",
    source: "Homepage",
    status: "Active",
    engagement: "High",
  },
  {
    id: "6",
    email: "alex.brown@consulting.com",
    subscribedAt: "2024-02-15T08:45:00Z",
    source: "Blog",
    status: "Unsubscribed",
    engagement: "Low",
  },
  {
    id: "7",
    email: "lisa.garcia@fintech.io",
    subscribedAt: "2024-02-20T13:20:00Z",
    source: "Homepage",
    status: "Active",
    engagement: "Medium",
  },
  {
    id: "8",
    email: "david.kim@healthcare.org",
    subscribedAt: "2024-02-25T15:10:00Z",
    source: "Blog",
    status: "Active",
    engagement: "High",
  },
  {
    id: "9",
    email: "emma.taylor@education.edu",
    subscribedAt: "2024-03-01T09:30:00Z",
    source: "Homepage",
    status: "Active",
    engagement: "Medium",
  },
  {
    id: "10",
    email: "ryan.martinez@government.gov",
    subscribedAt: "2024-03-05T14:15:00Z",
    source: "Blog",
    status: "Active",
    engagement: "High",
  },
]

export default async function SubscribersPage() {
  const activeSubscribers = allSubscribers.filter((sub) => sub.status === "Active")
  const totalSubscribers = allSubscribers.length

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/admin" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-bold text-foreground">CyberGuard Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Newsletter Subscribers</h1>
            <p className="text-muted-foreground">Manage your newsletter subscriber list and engagement metrics.</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button>
              <Mail className="h-4 w-4 mr-2" />
              Send Newsletter
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Subscribers</p>
                <p className="text-2xl font-bold text-foreground">{totalSubscribers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Subscribers</p>
                <p className="text-2xl font-bold text-foreground">{activeSubscribers.length}</p>
              </div>
              <Mail className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold text-foreground">78%</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search subscribers..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Subscribers Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground">Email</th>
                  <th className="text-left p-4 font-medium text-foreground">Subscribed</th>
                  <th className="text-left p-4 font-medium text-foreground">Source</th>
                  <th className="text-left p-4 font-medium text-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-foreground">Engagement</th>
                  <th className="text-left p-4 font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allSubscribers.map((subscriber, index) => (
                  <tr key={subscriber.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{subscriber.email}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(subscriber.subscribedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {subscriber.source}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={subscriber.status === "Active" ? "secondary" : "destructive"} className="text-xs">
                        {subscriber.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          subscriber.engagement === "High"
                            ? "default"
                            : subscriber.engagement === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {subscriber.engagement}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing 1-{allSubscribers.length} of {totalSubscribers} subscribers
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
