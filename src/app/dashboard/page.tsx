import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth-button"
import { Shield, User, Mail, Calendar, Activity, TrendingUp, FileText, Lock } from "lucide-react"
import Link from "next/link"

// Mock user activity data
const userActivity = [
  {
    id: 1,
    action: "Downloaded whitepaper",
    resource: "Advanced Threat Hunting Techniques",
    timestamp: "2024-03-15T10:30:00Z",
  },
  {
    id: 2,
    action: "Viewed blog post",
    resource: "The Rise of AI-Powered Cyber Attacks",
    timestamp: "2024-03-14T14:45:00Z",
  },
  {
    id: 3,
    action: "Subscribed to newsletter",
    resource: "Weekly Security Updates",
    timestamp: "2024-03-13T09:15:00Z",
  },
]

const recommendedContent = [
  {
    id: 1,
    title: "Zero Trust Implementation Guide",
    type: "Guide",
    category: "Network Security",
    readTime: "15 min",
  },
  {
    id: 2,
    title: "Incident Response Best Practices",
    type: "Article",
    category: "Incident Response",
    readTime: "8 min",
  },
  {
    id: 3,
    title: "Cloud Security Checklist",
    type: "Checklist",
    category: "Cloud Security",
    readTime: "5 min",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="text-xl font-bold text-foreground">CyberGuard</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">
                Services
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link href="/protected" className="text-muted-foreground hover:text-foreground transition-colors">
                Premium Content
              </Link>
              <Link href="/dashboard" className="text-foreground font-medium">
                Dashboard
              </Link>
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Dashboard</h1>
          <p className="text-muted-foreground">
            Track your cybersecurity learning progress and access personalized content.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Content Accessed</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Streak</p>
                <p className="text-2xl font-bold text-foreground">7 days</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="text-2xl font-bold text-foreground">Jan 2024</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Score</p>
                <p className="text-2xl font-bold text-foreground">85%</p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-4">
              {userActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-4 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.resource}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border/40">
              <Button variant="ghost" className="w-full">
                View All Activity
              </Button>
            </div>
          </Card>

          {/* Recommended Content */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Recommended for You</h2>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-4">
              {recommendedContent.map((content) => (
                <div key={content.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-medium text-foreground text-balance">{content.title}</h3>
                    <Badge variant="outline" className="text-xs ml-2">
                      {content.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {content.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{content.readTime}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border/40">
              <Button variant="ghost" className="w-full">
                <Link href="/protected">Browse All Content</Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 mt-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2">
              <Lock className="h-6 w-6" />
              <span>Access Premium Content</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <Mail className="h-6 w-6" />
              <span>Newsletter Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
              <User className="h-6 w-6" />
              <span>Profile Settings</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
