"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Check, AlertTriangle, Activity, Users, TrendingUp, Eye, Clock, RefreshCw } from "lucide-react"
import Link from "next/link"

interface SecurityMetrics {
  totalRequests: number
  blockedRequests: number
  activeUsers: number
  securityAlerts: number
  recentBlocked24h?: number
  successRate?: number
  uptime?: string
  avgResponseTime?: string
  lastScan: string
}

export default function SecurityMonitoringPage() {
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())

  const fetchMetrics = async () => {
    try {
      const response = await fetch("/api/security/metrics")
      if (response.ok) {
        const data = await response.json()
        setMetrics(data)
        setLastRefresh(new Date())
      }
    } catch (error) {
      console.error("Failed to fetch security metrics:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const securityChecks = [
    { name: "HTTPS Enabled", status: "pass", icon: Check, category: "Transport", week: "1-3" },
    { name: "Clerk Authentication", status: "pass", icon: Check, category: "Identity", week: "1-3" },
    { name: "Security Headers", status: "pass", icon: Check, category: "Headers", week: "2-3" },
    { name: "Environment Variables", status: "pass", icon: Check, category: "Secrets", week: "1-3" },
    { name: "JWT Token Validation", status: "pass", icon: Check, category: "Auth", week: "6-8" },
    { name: "OAuth 2.1 MCP Server", status: "pass", icon: Check, category: "MCP", week: "6-8" },
    { name: "Security Metrics API", status: "pass", icon: Check, category: "Monitoring", week: "9" },
    { name: "Real-time Dashboard", status: "pass", icon: Check, category: "Monitoring", week: "9" },
    { name: "Rate Limiting (Arcjet)", status: "pending", icon: Clock, category: "WAF", week: "4" },
    { name: "Bot Detection", status: "pending", icon: Clock, category: "WAF", week: "4" },
    { name: "Penetration Testing", status: "pending", icon: Clock, category: "Testing", week: "5" },
    { name: "DDoS Protection", status: "pending", icon: Clock, category: "Network", week: "10" },
  ]

  const workshopWeeks = [
    {
      weeks: "1-3",
      title: "Security Foundations",
      status: "complete",
      items: ["✅ HTTPS & Security Headers", "✅ Clerk Authentication", "✅ Environment Security"],
    },
    {
      weeks: "4",
      title: "WAF Integration",
      status: "pending",
      items: ["⏳ Arcjet WAF", "⏳ Rate Limiting", "⏳ Bot Detection"],
    },
    {
      weeks: "5",
      title: "Penetration Testing",
      status: "pending",
      items: ["⏳ Kali Linux Setup", "⏳ Test Scripts", "⏳ Vulnerability Assessment"],
    },
    {
      weeks: "6-8",
      title: "OAuth 2.1 MCP",
      status: "complete",
      items: ["✅ OAuth Endpoints", "✅ JWT Validation", "✅ MCP Server Secured"],
    },
    {
      weeks: "9",
      title: "Security Monitoring",
      status: "complete",
      items: ["✅ Metrics API", "✅ Real-time Dashboard", "✅ Security Alerts"],
    },
    {
      weeks: "10",
      title: "Production Ready",
      status: "pending",
      items: ["⏳ Final Integration", "⏳ Performance Optimization", "⏳ Production Deployment"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <Shield className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
              <span className="text-lg font-semibold">Security Operations Center</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={fetchMetrics}>
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Link href="/security-plan">
                <Button variant="outline" size="sm">
                  Security Plan
                </Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm">
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Security Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time security monitoring • Last updated: {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Metrics */}
        {!loading && metrics && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Requests</p>
                  <p className="text-3xl font-bold">{metrics.totalRequests.toLocaleString()}</p>
                  {metrics.successRate && (
                    <p className="text-xs text-green-600 mt-1">↑ {metrics.successRate}% success</p>
                  )}
                </div>
                <Activity className="h-10 w-10 text-blue-500 opacity-80" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Blocked Threats</p>
                  <p className="text-3xl font-bold text-red-500">{metrics.blockedRequests}</p>
                  {metrics.recentBlocked24h !== undefined && (
                    <p className="text-xs text-muted-foreground mt-1">Last 24h: {metrics.recentBlocked24h}</p>
                  )}
                </div>
                <Shield className="h-10 w-10 text-green-500 opacity-80" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Users</p>
                  <p className="text-3xl font-bold">{metrics.activeUsers}</p>
                  {metrics.uptime && <p className="text-xs text-green-600 mt-1">↑ {metrics.uptime} uptime</p>}
                </div>
                <Users className="h-10 w-10 text-purple-500 opacity-80" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Security Alerts</p>
                  <p className="text-3xl font-bold text-orange-500">{metrics.securityAlerts}</p>
                  {metrics.avgResponseTime && (
                    <p className="text-xs text-muted-foreground mt-1">Avg: {metrics.avgResponseTime}</p>
                  )}
                </div>
                <AlertTriangle className="h-10 w-10 text-red-500 opacity-80" />
              </div>
            </Card>
          </div>
        )}

        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6">
                <div className="h-24 animate-pulse bg-muted rounded" />
              </Card>
            ))}
          </div>
        )}

        {/* Security Controls Status */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Security Controls</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {securityChecks.map((check) => (
              <Card key={check.name} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <check.icon
                        className={`h-5 w-5 ${check.status === "pass" ? "text-green-500" : "text-yellow-500"}`}
                      />
                      <span className="font-semibold text-sm">{check.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {check.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Week {check.week}
                      </Badge>
                    </div>
                  </div>
                  <Badge
                    variant={check.status === "pass" ? "default" : "secondary"}
                    className={check.status === "pass" ? "bg-green-500" : "bg-yellow-500"}
                  >
                    {check.status === "pass" ? "✓" : "⏳"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Workshop Progress */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">AI Protector Workshop Progress</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workshopWeeks.map((week) => (
              <Card
                key={week.weeks}
                className={`p-6 ${
                  week.status === "complete"
                    ? "border-green-500/50 bg-green-500/5"
                    : week.status === "in-progress"
                      ? "border-yellow-500/50 bg-yellow-500/5"
                      : "border-border"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Week{week.weeks.includes("-") ? "s" : ""} {week.weeks}</p>
                    <h3 className="font-semibold">{week.title}</h3>
                  </div>
                  <Badge
                    className={
                      week.status === "complete"
                        ? "bg-green-500"
                        : week.status === "in-progress"
                          ? "bg-yellow-500"
                          : "bg-muted"
                    }
                  >
                    {week.status === "complete" ? "✓" : week.status === "in-progress" ? "→" : "○"}
                  </Badge>
                </div>
                <ul className="text-sm space-y-1.5">
                  {week.items.map((item, i) => (
                    <li key={i} className="text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2">
              <Activity className="h-6 w-6" />
              <span className="text-sm">Security Scan</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Eye className="h-6 w-6" />
              <span className="text-sm">Audit Logs</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2" asChild>
              <Link href="/security-plan">
                <Shield className="h-6 w-6" />
                <span className="text-sm">View Plan</span>
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
