import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AuthButton } from "@/components/auth-button"
import { Shield, Lock, FileText, Download, Eye, AlertTriangle, CheckCircle, Users } from "lucide-react"
import Link from "next/link"

// Mock protected content data
const exclusiveContent = [
  {
    id: 1,
    title: "Advanced Threat Hunting Techniques",
    description: "Deep dive into proactive threat hunting methodologies and tools used by enterprise security teams.",
    type: "Whitepaper",
    downloadUrl: "#",
    publishedAt: "2024-03-10",
    category: "Advanced",
  },
  {
    id: 2,
    title: "Zero-Day Vulnerability Assessment Framework",
    description: "Comprehensive framework for identifying and mitigating zero-day vulnerabilities in your environment.",
    type: "Guide",
    downloadUrl: "#",
    publishedAt: "2024-03-05",
    category: "Expert",
  },
  {
    id: 3,
    title: "Incident Response Playbook Template",
    description: "Ready-to-use incident response playbook with customizable procedures for various attack scenarios.",
    type: "Template",
    downloadUrl: "#",
    publishedAt: "2024-02-28",
    category: "Practical",
  },
  {
    id: 4,
    title: "Cybersecurity Risk Assessment Checklist",
    description:
      "Comprehensive checklist for conducting thorough cybersecurity risk assessments across all business areas.",
    type: "Checklist",
    downloadUrl: "#",
    publishedAt: "2024-02-20",
    category: "Practical",
  },
]

const securityInsights = [
  {
    id: 1,
    title: "Q1 2024 Threat Landscape Report",
    summary: "Analysis of emerging threats, attack vectors, and defensive strategies observed in the first quarter.",
    severity: "High",
    affectedSectors: ["Finance", "Healthcare", "Government"],
  },
  {
    id: 2,
    title: "Supply Chain Attack Trends",
    summary: "Recent supply chain compromises and recommended mitigation strategies for organizations.",
    severity: "Critical",
    affectedSectors: ["Technology", "Manufacturing", "Retail"],
  },
  {
    id: 3,
    title: "AI-Powered Social Engineering Evolution",
    summary: "How artificial intelligence is being weaponized for more sophisticated social engineering attacks.",
    severity: "Medium",
    affectedSectors: ["All Sectors"],
  },
]

export default function ProtectedPage() {
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
              <Link href="/protected" className="text-foreground font-medium">
                Premium Content
              </Link>
              <AuthButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500/10 to-green-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <Badge variant="secondary" className="mb-4">
              <Lock className="h-3 w-3 mr-1" />
              Premium Content
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Exclusive Cybersecurity Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Access advanced security frameworks, threat intelligence reports, and expert analysis reserved for
              authenticated members.
            </p>
          </div>
        </div>
      </section>

      {/* Exclusive Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Exclusive Downloads</h2>
            <p className="text-muted-foreground">
              Premium resources and tools available only to authenticated members.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {exclusiveContent.map((content) => (
              <Card key={content.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <Badge variant="outline" className="text-xs">
                        {content.type}
                      </Badge>
                    </div>
                    <Badge
                      variant={
                        content.category === "Expert"
                          ? "destructive"
                          : content.category === "Advanced"
                            ? "default"
                            : "secondary"
                      }
                      className="text-xs"
                    >
                      {content.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground text-balance">{content.title}</h3>

                  <p className="text-muted-foreground text-pretty">{content.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <span className="text-sm text-muted-foreground">
                      {new Date(content.publishedAt).toLocaleDateString()}
                    </span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Threat Intelligence */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Latest Threat Intelligence</h2>
            <p className="text-muted-foreground">
              Real-time security insights and threat analysis for authenticated members.
            </p>
          </div>

          <div className="space-y-6">
            {securityInsights.map((insight) => (
              <Card key={insight.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle
                      className={`h-6 w-6 ${
                        insight.severity === "Critical"
                          ? "text-red-500"
                          : insight.severity === "High"
                            ? "text-orange-500"
                            : "text-yellow-500"
                      }`}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{insight.title}</h3>
                      <p className="text-sm text-muted-foreground">Affected: {insight.affectedSectors.join(", ")}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      insight.severity === "Critical"
                        ? "destructive"
                        : insight.severity === "High"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {insight.severity}
                  </Badge>
                </div>

                <p className="text-muted-foreground mb-4 text-pretty">{insight.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>Members Only</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Read Full Report
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-500/10 to-green-500/10">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">You're a Premium Member!</h2>
              </div>

              <p className="text-muted-foreground text-pretty">
                Enjoy unlimited access to exclusive cybersecurity resources, threat intelligence reports, and expert
                analysis.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Exclusive Content</h3>
                  <p className="text-sm text-muted-foreground">Advanced guides and frameworks</p>
                </div>
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Threat Intelligence</h3>
                  <p className="text-sm text-muted-foreground">Real-time security insights</p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-foreground">Expert Community</h3>
                  <p className="text-sm text-muted-foreground">Connect with security professionals</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-500" />
                <span className="text-lg font-bold text-foreground">CyberGuard</span>
              </div>
              <p className="text-muted-foreground text-pretty">
                Professional cybersecurity services to protect your digital assets and ensure business continuity.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Services</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                    Security Assessments
                  </Link>
                </div>
                <div>
                  <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                    Penetration Testing
                  </Link>
                </div>
                <div>
                  <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                    Threat Monitoring
                  </Link>
                </div>
                <div>
                  <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                    Incident Response
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Resources</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </div>
                <div>
                  <Link href="/protected" className="text-muted-foreground hover:text-foreground">
                    Premium Content
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Whitepapers
                  </Link>
                </div>
                <div>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Security Tools
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>security@cyberguard.com</div>
                <div>+1 (555) 123-4567</div>
                <div>Available 24/7 for emergencies</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CyberGuard. All rights reserved. Built with security in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
