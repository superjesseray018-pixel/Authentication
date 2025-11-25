import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Check, AlertTriangle, Clock, FileText, TestTube } from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
  const securityChecks = [
    { 
      name: "HTTPS Enabled", 
      status: "pass", 
      icon: Check,
      description: "All traffic encrypted with TLS 1.3"
    },
    { 
      name: "Clerk Authentication", 
      status: "pass", 
      icon: Check,
      description: "OAuth 2.0 with JWT token validation"
    },
    { 
      name: "Security Headers", 
      status: "pass", 
      icon: Check,
      description: "HSTS, CSP, X-Frame-Options, 10+ headers configured"
    },
    { 
      name: "Environment Variables Secured", 
      status: "pass", 
      icon: Check,
      description: "Clerk + Arcjet keys secured via Vercel"
    },
    { 
      name: "WAF Configured", 
      status: "pass", 
      icon: Check,
      description: "Arcjet WAF active with rate limiting and bot detection"
    },
    { 
      name: "Rate Limiting", 
      status: "pass", 
      icon: Check,
      description: "100 requests/minute per IP via Arcjet"
    },
    { 
      name: "Penetration Testing", 
      status: "pass", 
      icon: Check,
      description: "SQL injection, XSS, rate limit tests passed"
    },
    { 
      name: "OAuth 2.1 MCP Server", 
      status: "pass", 
      icon: Check,
      description: "OAuth-secured MCP endpoint with JWT validation"
    },
    { 
      name: "Security Monitoring", 
      status: "pass", 
      icon: Check,
      description: "Real-time security dashboard and metrics API"
    },
    { 
      name: "Bot Detection", 
      status: "pass", 
      icon: Check,
      description: "Arcjet bot detection with search engine allowlist"
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">JRL Security</span>
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Portfolio
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold">Security Dashboard</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            AI Protector Workshop - Security Implementation Status
          </p>
        </div>

        {/* Security Status Summary */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="p-6 bg-green-500/10 border-green-500/20">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">10</p>
              <p className="text-sm text-muted-foreground">Implemented</p>
            </div>
          </Card>
          <Card className="p-6 bg-green-500/10 border-green-500/20">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </Card>
          <Card className="p-6 bg-green-500/10 border-green-500/20">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">100%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <Link href="/testing">
            <Button size="lg" className="w-full sm:w-auto">
              <TestTube className="mr-2 h-4 w-4" />
              View Test Results
            </Button>
          </Link>
          <Link href="/security-plan">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <FileText className="mr-2 h-4 w-4" />
              Security Plan
            </Button>
          </Link>
          <Link href="/dashboard/security">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Shield className="mr-2 h-4 w-4" />
              Live Monitoring
            </Button>
          </Link>
        </div>

        {/* Security Checks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6">Security Controls</h2>
          {securityChecks.map((check) => (
            <Card key={check.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-2 rounded-lg ${
                    check.status === "pass" 
                      ? "bg-green-500/10" 
                      : "bg-yellow-500/10"
                  }`}>
                    <check.icon className={`h-6 w-6 ${
                      check.status === "pass"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{check.name}</h3>
                    <p className="text-sm text-muted-foreground">{check.description}</p>
                  </div>
                </div>
                <Badge 
                  variant={check.status === "pass" ? "default" : "secondary"}
                  className={
                    check.status === "pass"
                      ? "bg-green-500/10 text-green-700 border-green-500/20"
                      : "bg-yellow-500/10 text-yellow-700 border-yellow-500/20"
                  }
                >
                  {check.status === "pass" ? "✓ Active" : "⏳ Pending"}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Implementation Timeline */}
        <Card className="p-8 mt-12">
          <h2 className="text-2xl font-semibold mb-6">AI Protector Workshop Timeline</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500">✓</Badge>
              <div>
                <p className="font-medium">Weeks 1-3: Security Foundation</p>
                <p className="text-sm text-muted-foreground">HTTPS, OAuth 2.0, Security Headers - Complete</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500">✓</Badge>
              <div>
                <p className="font-medium">Week 4: Arcjet WAF Integration</p>
                <p className="text-sm text-muted-foreground">Rate limiting, Bot detection, SQL shield - Complete</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500">✓</Badge>
              <div>
                <p className="font-medium">Week 5: Penetration Testing</p>
                <p className="text-sm text-muted-foreground">SQL injection, XSS, rate limit tests - All Passed</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500">✓</Badge>
              <div>
                <p className="font-medium">Weeks 6-8: OAuth 2.1 MCP Server</p>
                <p className="text-sm text-muted-foreground">JWT validation, Admin controls - Complete</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500">✓</Badge>
              <div>
                <p className="font-medium">Week 9: Security Monitoring</p>
                <p className="text-sm text-muted-foreground">Real-time dashboard, Metrics API - Complete</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-500">✓</Badge>
              <div>
                <p className="font-medium">Week 10: Production Deployment</p>
                <p className="text-sm text-muted-foreground">CI/CD pipeline, Final validation - Complete</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <p className="font-semibold text-green-600">All 10 Weeks Complete - Production Ready</p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Completion Date: November 25, 2025 • Status: Live in Production
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
