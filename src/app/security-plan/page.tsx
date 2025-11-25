import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Key, Eye, FileText, AlertTriangle, CheckCircle2, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SecurityPlanPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <Shield className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
              <span className="text-lg font-semibold text-foreground">JRL</span>
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Security Documentation
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Security Implementation Plan
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Comprehensive security strategy for the portfolio application, covering authentication readiness, secrets
              management, logging infrastructure, and upcoming security controls.
            </p>
          </div>
        </div>
      </section>

      {/* Current Security Status */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Current Security Status</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-green-500/20 bg-green-500/5">
              <div className="flex items-start justify-between mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  Implemented
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">HTTPS Deployment</h3>
              <p className="text-sm text-muted-foreground">
                Application deployed on Vercel with automatic SSL/TLS certificates and secure HTTPS connections.
              </p>
            </Card>

            <Card className="p-6 border-green-500/20 bg-green-500/5">
              <div className="flex items-start justify-between mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                  Implemented
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Environment Variables</h3>
              <p className="text-sm text-muted-foreground">
                Sensitive configuration managed through Vercel environment variables, never committed to repository.
              </p>
            </Card>

            <Card className="p-6 border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-start justify-between mb-4">
                <Clock className="h-8 w-8 text-yellow-500" />
                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                  Planned
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Authentication System</h3>
              <p className="text-sm text-muted-foreground">
                User authentication ready for implementation using industry-standard OAuth 2.0 and JWT tokens.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Authentication Readiness */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Lock className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Authentication Readiness</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Planned Authentication Flow</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">OAuth 2.0 Integration</p>
                    <p className="text-sm text-muted-foreground">
                      Support for Google, GitHub, and email/password authentication
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">JWT Token Management</p>
                    <p className="text-sm text-muted-foreground">
                      Secure token generation, validation, and refresh mechanisms
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Session Management</p>
                    <p className="text-sm text-muted-foreground">
                      Secure session storage with automatic expiration and renewal
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 rounded-full p-2 mt-1">
                    <span className="text-primary font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Multi-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Optional 2FA using TOTP (Time-based One-Time Password)
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Security Measures</h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Password Hashing",
                    description: "bcrypt with salt rounds for secure password storage",
                  },
                  {
                    title: "Rate Limiting",
                    description: "Prevent brute force attacks on login endpoints",
                  },
                  {
                    title: "CSRF Protection",
                    description: "Token-based protection against cross-site request forgery",
                  },
                  {
                    title: "Account Lockout",
                    description: "Temporary lockout after multiple failed login attempts",
                  },
                  {
                    title: "Email Verification",
                    description: "Verify user email addresses before account activation",
                  },
                  {
                    title: "Password Reset",
                    description: "Secure password reset flow with time-limited tokens",
                  },
                ].map((measure, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{measure.title}</p>
                      <p className="text-xs text-muted-foreground">{measure.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Secrets Management */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Key className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Secrets Management</h2>
          </div>

          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Current Implementation</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Environment Variables</p>
                        <p className="text-sm text-muted-foreground">
                          All secrets stored in Vercel environment variables
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-foreground">.gitignore Configuration</p>
                        <p className="text-sm text-muted-foreground">.env files excluded from version control</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Separate Environments</p>
                        <p className="text-sm text-muted-foreground">
                          Different secrets for development, preview, and production
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-foreground">No Hardcoded Secrets</p>
                        <p className="text-sm text-muted-foreground">Zero secrets committed to repository</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Access Control</p>
                        <p className="text-sm text-muted-foreground">Team-based access to production secrets</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="font-medium text-foreground">Rotation Ready</p>
                        <p className="text-sm text-muted-foreground">Infrastructure supports secret rotation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">Planned Enhancements</h3>
                <div className="space-y-3">
                  {[
                    {
                      title: "Secret Rotation Policy",
                      description: "Automated rotation of API keys and tokens every 90 days",
                    },
                    {
                      title: "Vault Integration",
                      description: "HashiCorp Vault or AWS Secrets Manager for enterprise secrets",
                    },
                    {
                      title: "Audit Logging",
                      description: "Track all secret access and modifications",
                    },
                  ].map((enhancement, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <Clock className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-foreground text-sm">{enhancement.title}</p>
                        <p className="text-xs text-muted-foreground">{enhancement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Logging Infrastructure */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Eye className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Logging & Monitoring</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Current Logging</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="font-medium text-foreground mb-2">Vercel Analytics</p>
                  <p className="text-sm text-muted-foreground mb-3">Real-time performance metrics and user analytics</p>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    Active
                  </Badge>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="font-medium text-foreground mb-2">Build Logs</p>
                  <p className="text-sm text-muted-foreground mb-3">Deployment and build process logging</p>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    Active
                  </Badge>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="font-medium text-foreground mb-2">Runtime Logs</p>
                  <p className="text-sm text-muted-foreground mb-3">Server-side function execution logs</p>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    Active
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Planned Logging Features</h3>
              <div className="space-y-3">
                {[
                  {
                    title: "Security Event Logging",
                    description: "Track authentication attempts, authorization failures, and suspicious activities",
                  },
                  {
                    title: "Structured Logging",
                    description: "JSON-formatted logs with consistent schema for easy parsing",
                  },
                  {
                    title: "Log Aggregation",
                    description: "Centralized logging with tools like Datadog or LogRocket",
                  },
                  {
                    title: "Error Tracking",
                    description: "Sentry integration for real-time error monitoring and alerting",
                  },
                  {
                    title: "Audit Trail",
                    description: "Complete audit log of all user actions and system changes",
                  },
                  {
                    title: "Log Retention",
                    description: "90-day retention policy with archival for compliance",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <Clock className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Security Controls */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Upcoming Security Controls</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Web Application Firewall",
                description: "Deploy WAF rules to protect against common web attacks (SQL injection, XSS, etc.)",
                priority: "High",
                timeline: "Q2 2025",
              },
              {
                icon: Lock,
                title: "Content Security Policy",
                description: "Implement strict CSP headers to prevent XSS and data injection attacks",
                priority: "High",
                timeline: "Q2 2025",
              },
              {
                icon: Key,
                title: "API Rate Limiting",
                description: "Protect API endpoints from abuse with intelligent rate limiting",
                priority: "High",
                timeline: "Q2 2025",
              },
              {
                icon: FileText,
                title: "Security Headers",
                description: "Add comprehensive security headers (HSTS, X-Frame-Options, etc.)",
                priority: "Medium",
                timeline: "Q2 2025",
              },
              {
                icon: Eye,
                title: "Intrusion Detection",
                description: "Real-time monitoring and alerting for suspicious activities",
                priority: "Medium",
                timeline: "Q3 2025",
              },
              {
                icon: Shield,
                title: "DDoS Protection",
                description: "Enhanced DDoS mitigation with Cloudflare or AWS Shield",
                priority: "Medium",
                timeline: "Q3 2025",
              },
              {
                icon: Lock,
                title: "Data Encryption",
                description: "End-to-end encryption for sensitive user data at rest and in transit",
                priority: "High",
                timeline: "Q2 2025",
              },
              {
                icon: FileText,
                title: "Compliance Framework",
                description: "GDPR and CCPA compliance implementation with data privacy controls",
                priority: "Medium",
                timeline: "Q3 2025",
              },
              {
                icon: AlertTriangle,
                title: "Vulnerability Scanning",
                description: "Automated security scanning with Snyk or Dependabot",
                priority: "High",
                timeline: "Q2 2025",
              },
            ].map((control, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <control.icon className="h-8 w-8 text-primary" />
                    <Badge
                      variant="secondary"
                      className={
                        control.priority === "High" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                      }
                    >
                      {control.priority}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{control.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{control.description}</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">Timeline: {control.timeline}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Best Practices */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Security Best Practices</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Development Practices</h3>
              <ul className="space-y-3">
                {[
                  "Regular dependency updates and security patches",
                  "Code review process for all changes",
                  "Static code analysis with ESLint security rules",
                  "Secure coding guidelines and training",
                  "Git commit signing for authenticity",
                  "Branch protection rules on main branch",
                ].map((practice, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{practice}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Operational Security</h3>
              <ul className="space-y-3">
                {[
                  "Multi-factor authentication for all team accounts",
                  "Principle of least privilege for access control",
                  "Regular security audits and penetration testing",
                  "Incident response plan and procedures",
                  "Backup and disaster recovery strategy",
                  "Security awareness training for team members",
                ].map((practice, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{practice}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Security Plan v1.0 - Last Updated: January 2025</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
