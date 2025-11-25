"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft, Download, FileText, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ReportPage() {
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
              <a href="/" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </a>
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
              Security Baseline Report
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Week 2 Deliverable: My Digital Portfolio Security Implementation Plan. Comprehensive documentation
              covering authentication readiness, secrets management, logging infrastructure, and security controls
              roadmap.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button asChild>
                <a href="/docs/SECURITY-BASELINE-REPORT.md" download className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Markdown
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/security-plan" className="gap-2">
                  <FileText className="h-4 w-4" />
                  View Security Plan
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Executive Summary</h2>
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Project Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Project Name</p>
                    <p className="font-semibold text-foreground">My Digital Portfolio with Security Baseline</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Author</p>
                    <p className="font-semibold text-foreground">Jesse Ray S. Lasam</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Submission Date</p>
                    <p className="font-semibold text-foreground">January 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Deployment Platform</p>
                    <p className="font-semibold text-foreground">Vercel (v0.dev)</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-border">
                <p className="text-muted-foreground leading-relaxed">
                  This security baseline report documents the initial deployment of a professional cybersecurity
                  portfolio application built with Next.js and deployed on Vercel. The portfolio showcases cybersecurity
                  expertise, with comprehensive security documentation, authentication-ready infrastructure, and a
                  detailed roadmap for implementing advanced security controls.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Submission Checklist */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Submission Checklist</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Completed Items</h3>
              <div className="space-y-3">
                {[
                  "Portfolio landing page with hero section",
                  "/security-plan page with comprehensive documentation",
                  "docs/SECURITY-NOTES.md with implementation details",
                  "docs/LMS-REFERENCES.md with curriculum framework",
                  "Authentication readiness documentation",
                  "Secrets handling best practices",
                  "Logging infrastructure planning",
                  "README updated with deployment info",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Action Items Remaining</h3>
              <div className="space-y-3">
                {[
                  "Deploy to Vercel (click 'Publish' button)",
                  "Add Vercel deployment URL to report",
                  "Add LMS curriculum URLs from St. Paul University",
                  "Enable MFA on v0.dev account",
                  "Capture v0.dev MFA screenshots",
                  "Convert report to DOCX format",
                  "Submit portfolio with documentation",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Sections */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Report Sections</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Portfolio Overview",
                description: "Project description, technology stack, and features overview",
              },
              {
                title: "Deployment Information",
                description: "Vercel deployment details, security features, and deployment checklist",
              },
              {
                title: "LMS References",
                description: "St. Paul University curriculum modules and security topics covered",
              },
              {
                title: "Security Considerations",
                description: "Authentication readiness, secrets handling, logging infrastructure",
              },
              {
                title: "Compliance & Governance",
                description: "GDPR compliance, CCPA requirements, security standards alignment",
              },
              {
                title: "Security Controls Roadmap",
                description: "Upcoming controls, timelines, and implementation priorities",
              },
            ].map((section, i) => (
              <Card key={i} className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Quick Facts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">100%</p>
              <p className="text-muted-foreground">HTTPS Encrypted</p>
              <p className="text-xs text-muted-foreground mt-2">Automatic SSL/TLS on Vercel</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">0</p>
              <p className="text-muted-foreground">Hardcoded Secrets</p>
              <p className="text-xs text-muted-foreground mt-2">All environment-managed</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-4xl font-bold text-primary mb-2">7</p>
              <p className="text-muted-foreground">Security Courses</p>
              <p className="text-xs text-muted-foreground mt-2">From curriculum framework</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Documentation Files</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Security Baseline Report</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive 11-section report covering all submission requirements
              </p>
              <Badge variant="secondary" className="text-xs">
                docs/SECURITY-BASELINE-REPORT.md
              </Badge>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Security Notes</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Authentication, secrets management, and logging implementation details
              </p>
              <Badge variant="secondary" className="text-xs">
                docs/SECURITY-NOTES.md
              </Badge>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">LMS References</h3>
              <p className="text-sm text-muted-foreground mb-4">
                St. Paul University curriculum framework and course modules
              </p>
              <Badge variant="secondary" className="text-xs">
                docs/LMS-REFERENCES.md
              </Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Convert to DOCX */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Converting to DOCX</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Option A: Microsoft Word",
                steps: ["Copy markdown content", "Open Microsoft Word", "Paste and format as needed", "Save as .docx"],
              },
              {
                title: "Option B: Google Docs",
                steps: [
                  "Go to docs.google.com",
                  "Create new document",
                  "Copy-paste markdown content",
                  "Download as .docx",
                ],
              },
              {
                title: "Option C: Online Converter",
                steps: [
                  "Visit pandoc.org or cloudconvert.com",
                  "Upload markdown file",
                  "Select DOCX output format",
                  "Download converted file",
                ],
              },
              {
                title: "Option D: Markdown Editor",
                steps: [
                  "Use Typora or similar editor",
                  "Open markdown file",
                  "Export as DOCX directly",
                  "Submit converted file",
                ],
              },
            ].map((option, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-semibold text-foreground mb-4">{option.title}</h3>
                <ol className="space-y-3">
                  {option.steps.map((step, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="text-primary font-semibold text-sm">{j + 1}.</span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-8">Next Steps</h2>
          <div className="space-y-6">
            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-semibold text-foreground mb-2">This Week</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Click "Publish" button in v0 to deploy to Vercel</li>
                <li>• Copy your Vercel deployment URL</li>
                <li>• Enable MFA on v0.dev account in security settings</li>
                <li>• Screenshot your MFA configuration</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-l-secondary">
              <h3 className="text-lg font-semibold text-foreground mb-2">Next Week</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Add LMS URLs from St. Paul University to docs/LMS-REFERENCES.md</li>
                <li>• Update Vercel URL in SECURITY-BASELINE-REPORT.md</li>
                <li>• Convert markdown report to DOCX using preferred method</li>
                <li>• Verify all submission requirements are met</li>
              </ul>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary/60">
              <h3 className="text-lg font-semibold text-foreground mb-2">Weeks 2-4</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Begin OAuth authentication implementation</li>
                <li>• Add database integration (Neon PostgreSQL)</li>
                <li>• Implement logging infrastructure</li>
                <li>• Conduct basic security testing</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Security Baseline Report for My Digital Portfolio | Jesse Ray S. Lasam | January 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
