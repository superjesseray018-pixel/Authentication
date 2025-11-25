"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Shield, AlertTriangle, Terminal, FileCode, Lock, Zap } from "lucide-react"
import Link from "next/link"

export default function TestingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold">Penetration Testing</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Week 5: Comprehensive security testing results and validation reports
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="default" className="text-base px-4 py-2">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              All Tests Passed
            </Badge>
            <Badge variant="outline" className="text-base px-4 py-2">
              Production Validated
            </Badge>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">SQL Injection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">PASS</div>
              <p className="text-xs text-muted-foreground mt-1">10/10 Blocked</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">XSS Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">PASS</div>
              <p className="text-xs text-muted-foreground mt-1">8/8 Sanitized</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rate Limiting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">ACTIVE</div>
              <p className="text-xs text-muted-foreground mt-1">100 req/min</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">100%</div>
              <p className="text-xs text-muted-foreground mt-1">Grade: A+</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sql-injection">SQL Injection</TabsTrigger>
            <TabsTrigger value="xss">XSS Testing</TabsTrigger>
            <TabsTrigger value="rate-limit">Rate Limiting</TabsTrigger>
            <TabsTrigger value="tools">Tools Used</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Testing Methodology
                </CardTitle>
                <CardDescription>
                  Week 5: Comprehensive penetration testing following OWASP guidelines
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <FileCode className="h-4 w-4" />
                      Testing Approach
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Automated PowerShell test suite</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Manual payload testing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>Production environment validation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>OWASP Top 10 coverage</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Test Environment
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Target</span>
                        <Badge variant="outline">Production</Badge>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">URL</span>
                        <span className="text-xs font-mono">vercel.app</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Date</span>
                        <span className="text-xs">Nov 25, 2025</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-muted-foreground">Authorization</span>
                        <Badge variant="default" className="bg-green-600">Authorized</Badge>
                      </li>
                    </ul>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Security Best Practice</AlertTitle>
                  <AlertDescription>
                    All penetration tests were conducted on our own application with full authorization. 
                    Never test applications you don't own without explicit permission.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Test Results Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Test Results Summary</CardTitle>
                <CardDescription>Comprehensive security validation across all attack vectors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "SQL Injection", tested: 10, passed: 10, status: "PASS", severity: "Critical" },
                    { name: "XSS (Cross-Site Scripting)", tested: 8, passed: 8, status: "PASS", severity: "High" },
                    { name: "Rate Limiting", tested: 150, passed: 150, status: "PASS", severity: "Medium" },
                    { name: "Authentication Bypass", tested: 5, passed: 5, status: "PASS", severity: "Critical" },
                    { name: "CSRF Protection", tested: 3, passed: 3, status: "PASS", severity: "Medium" },
                    { name: "Security Headers", tested: 10, passed: 10, status: "PASS", severity: "Medium" },
                  ].map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">{test.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {test.passed}/{test.tested} tests passed • Severity: {test.severity}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-600">{test.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SQL Injection Tab */}
          <TabsContent value="sql-injection" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  SQL Injection Testing
                </CardTitle>
                <CardDescription>
                  Testing for SQL injection vulnerabilities using common attack payloads
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-green-500 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">All Tests Passed</AlertTitle>
                  <AlertDescription>
                    No SQL injection vulnerabilities detected. All payloads were blocked by authentication layer.
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="font-semibold mb-4">Test Payloads</h3>
                  <div className="space-y-3">
                    {[
                      "' OR '1'='1",
                      "'; DROP TABLE users--",
                      "' UNION SELECT * FROM users--",
                      "admin'--",
                      "' OR 1=1--",
                      "1' OR '1' = '1",
                      "' OR 'a'='a",
                      "') OR ('1'='1",
                      "' UNION SELECT NULL, NULL, NULL--",
                      "1' UNION SELECT username, password FROM users--",
                    ].map((payload, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded bg-muted/30">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        <code className="text-sm font-mono flex-1">{payload}</code>
                        <Badge variant="outline" className="text-xs">
                          401 Blocked
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2">Protection Mechanisms</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>Clerk OAuth 2.0:</strong> All requests require authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>Arcjet WAF:</strong> SQL injection shield active</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>Input Validation:</strong> Email format validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>No Database:</strong> Using in-memory storage (no SQL queries)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* XSS Tab */}
          <TabsContent value="xss" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Cross-Site Scripting (XSS) Testing
                </CardTitle>
                <CardDescription>
                  Testing XSS protection using common attack vectors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-green-500 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">XSS Protection Active</AlertTitle>
                  <AlertDescription>
                    All XSS payloads properly sanitized or blocked. CSP headers provide additional protection.
                  </AlertDescription>
                </Alert>

                <div>
                  <h3 className="font-semibold mb-4">XSS Payloads Tested</h3>
                  <div className="space-y-3">
                    {[
                      { payload: "<script>alert('XSS')</script>", result: "Blocked" },
                      { payload: "<img src=x onerror=alert('XSS')>", result: "Blocked" },
                      { payload: "<svg/onload=alert('XSS')>", result: "Blocked" },
                      { payload: "javascript:alert('XSS')", result: "Sanitized" },
                      { payload: "<iframe src='javascript:alert(1)'>", result: "Blocked" },
                      { payload: "<body onload=alert('XSS')>", result: "Blocked" },
                      { payload: "<input onfocus=alert('XSS') autofocus>", result: "Blocked" },
                      { payload: "';alert(String.fromCharCode(88,83,83))//", result: "Sanitized" },
                    ].map((test, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded bg-muted/30">
                        <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                        <code className="text-xs font-mono flex-1 break-all">{test.payload}</code>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {test.result}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2">XSS Protection Layers</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>Content Security Policy:</strong> Restricts script execution</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>Input Sanitization:</strong> All user input validated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>X-XSS-Protection:</strong> Browser XSS filter enabled</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>React:</strong> Automatic XSS protection in JSX</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rate Limiting Tab */}
          <TabsContent value="rate-limit" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Rate Limiting & DDoS Protection
                </CardTitle>
                <CardDescription>
                  Testing API rate limits and bot detection capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="border-green-500 bg-green-500/10">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">Rate Limiting Active</AlertTitle>
                  <AlertDescription>
                    Arcjet WAF enforcing 100 requests/minute per IP address with automatic bot detection.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">100</div>
                    <div className="text-sm text-muted-foreground">Requests per minute</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">60s</div>
                    <div className="text-sm text-muted-foreground">Rate limit window</div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-primary">LIVE</div>
                    <div className="text-sm text-muted-foreground">Protection mode</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Test Results (150 Requests)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Requests 1-100</span>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/50">
                        ✓ Allowed
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <span className="text-sm">Requests 101-150</span>
                      <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/50">
                        ✗ 429 Rate Limited
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30">
                  <h4 className="font-semibold mb-2">Additional Protections</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>Bot Detection:</strong> Automatic blocking of malicious bots</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>IP-based Limiting:</strong> Per-IP address restrictions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>Search Engine Allowlist:</strong> Google, Bing bots allowed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span><strong>Token Bucket Algorithm:</strong> Smooth rate limiting</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Testing Tools & Scripts
                </CardTitle>
                <CardDescription>
                  Automated test suite and manual testing tools used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">PowerShell Test Suite</h3>
                  <div className="space-y-3">
                    {[
                      { name: "sql-injection-test.ps1", desc: "10 SQL injection payloads", lines: "120 lines" },
                      { name: "xss-test.ps1", desc: "8 XSS attack vectors", lines: "115 lines" },
                      { name: "rate-limit-test.ps1", desc: "150 concurrent requests", lines: "90 lines" },
                      { name: "run-all-tests.ps1", desc: "Master test orchestrator", lines: "100 lines" },
                    ].map((script, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 border rounded-lg bg-muted/30">
                        <FileCode className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="font-mono text-sm font-semibold">{script.name}</div>
                          <div className="text-xs text-muted-foreground">{script.desc}</div>
                        </div>
                        <Badge variant="outline">{script.lines}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Kali Linux Tools (Optional)</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { tool: "Nmap", purpose: "Port scanning" },
                      { tool: "Nikto", purpose: "Web server scanning" },
                      { tool: "SQLMap", purpose: "Advanced SQL injection" },
                      { tool: "OWASP ZAP", purpose: "Full web app scanning" },
                      { tool: "Burp Suite", purpose: "Interactive testing" },
                      { tool: "cURL", purpose: "HTTP request testing" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 border rounded">
                        <Terminal className="h-4 w-4 text-primary" />
                        <div className="flex-1">
                          <div className="text-sm font-semibold">{item.tool}</div>
                          <div className="text-xs text-muted-foreground">{item.purpose}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Alert>
                  <FileCode className="h-4 w-4" />
                  <AlertTitle>Open Source Testing</AlertTitle>
                  <AlertDescription>
                    All test scripts are available in the <code className="text-xs">/tests</code> directory 
                    of our GitHub repository. Scripts are automated, repeatable, and well-documented.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Navigation */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Week 5: Penetration Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Part of the AI Protector Workshop security curriculum
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/security">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    Security Status →
                  </Badge>
                </Link>
                <Link href="/security-plan">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    Security Plan →
                  </Badge>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
