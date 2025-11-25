import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Check, AlertTriangle, Clock } from "lucide-react"
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
      description: "Industry-standard OAuth authentication"
    },
    { 
      name: "Security Headers", 
      status: "pass", 
      icon: Check,
      description: "HSTS, CSP, X-Frame-Options configured"
    },
    { 
      name: "Environment Variables Secured", 
      status: "pass", 
      icon: Check,
      description: "Secrets managed via Vercel"
    },
    { 
      name: "WAF Configured", 
      status: "pending", 
      icon: Clock,
      description: "Web Application Firewall - Week 4"
    },
    { 
      name: "Rate Limiting", 
      status: "pending", 
      icon: Clock,
      description: "Arcjet rate limiting - Week 4"
    },
    { 
      name: "Penetration Testing", 
      status: "pending", 
      icon: Clock,
      description: "Kali Linux security audit - Week 5"
    },
    { 
      name: "OAuth 2.1 MCP", 
      status: "pending", 
      icon: Clock,
      description: "Advanced MCP authentication - Week 7-8"
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
              <p className="text-3xl font-bold text-green-600">4</p>
              <p className="text-sm text-muted-foreground">Implemented</p>
            </div>
          </Card>
          <Card className="p-6 bg-yellow-500/10 border-yellow-500/20">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-600">4</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
          </Card>
          <Card className="p-6 bg-blue-500/10 border-blue-500/20">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">50%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
          </Card>
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
                <p className="text-sm text-muted-foreground">HTTPS, Authentication, Security Headers</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary">→</Badge>
              <div>
                <p className="font-medium">Week 4: Defensive Operations</p>
                <p className="text-sm text-muted-foreground">WAF, Arcjet, Rate Limiting</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline">○</Badge>
              <div>
                <p className="font-medium">Week 5: Offensive Security</p>
                <p className="text-sm text-muted-foreground">Kali Linux Penetration Testing</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline">○</Badge>
              <div>
                <p className="font-medium">Weeks 7-8: Advanced Security</p>
                <p className="text-sm text-muted-foreground">OAuth 2.1 MCP Authentication</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline">○</Badge>
              <div>
                <p className="font-medium">Week 9-10: Operations & Monitoring</p>
                <p className="text-sm text-muted-foreground">Security Dashboard & Final Integration</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
