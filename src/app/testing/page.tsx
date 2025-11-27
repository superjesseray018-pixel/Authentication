"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Shield, AlertTriangle, Terminal, FileCode, Lock, Zap, Play, Loader2 } from "lucide-react"
import Link from "next/link"

type TestResult = {
  test: string
  payload?: string
  status: string
  message: string
  value?: string
  details?: string
}

type TestResponse = {
  success: boolean
  testType: string
  results: TestResult[]
  summary: {
    total: number
    passed: number
    failed: number
    [key: string]: any
  }
}

export default function TestingPage() {
  const [activeTest, setActiveTest] = useState<string | null>(null)
  const [testResults, setTestResults] = useState<Record<string, TestResponse>>({})
  const [loading, setLoading] = useState(false)

  const runTest = async (testType: string) => {
    setLoading(true)
    setActiveTest(testType)

    try {
      const response = await fetch("/api/security-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testType }),
      })

      const data = await response.json()
      setTestResults((prev) => ({ ...prev, [testType]: data }))
    } catch (error) {
      console.error("Test failed:", error)
    } finally {
      setLoading(false)
      setActiveTest(null)
    }
  }

  const runAllTests = async () => {
    const tests = ["sql-injection", "xss", "rate-limiting", "security-headers", "authentication"]
    setLoading(true)

    for (const test of tests) {
      setActiveTest(test)
      await runTest(test)
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setLoading(false)
    setActiveTest(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pass":
      case "blocked":
      case "sanitized":
      case "protected":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase()
    if (["pass", "blocked", "sanitized", "protected"].includes(statusLower)) {
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">{status}</Badge>
    }
    if (statusLower === "fail") {
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">{status}</Badge>
    }
    return <Badge variant="outline">{status}</Badge>
  }

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
            Week 5: Interactive security testing suite with real-time validation
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              size="lg"
              onClick={runAllTests}
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Run All Tests
                </>
              )}
            </Button>
            {Object.keys(testResults).length > 0 && (
              <Badge variant="default" className="text-base px-4 py-2">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                {Object.keys(testResults).length} Tests Complete
              </Badge>
            )}
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">SQL Injection</CardTitle>
            </CardHeader>
            <CardContent>
              {testResults["sql-injection"] ? (
                <>
                  <div className="text-3xl font-bold text-green-600">PASS</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testResults["sql-injection"].summary.blocked}/
                    {testResults["sql-injection"].summary.total} Blocked
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-muted-foreground">--</div>
                  <p className="text-xs text-muted-foreground mt-1">Not tested</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">XSS Protection</CardTitle>
            </CardHeader>
            <CardContent>
              {testResults["xss"] ? (
                <>
                  <div className="text-3xl font-bold text-green-600">PASS</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testResults["xss"].summary.passed}/{testResults["xss"].summary.total} Sanitized
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-muted-foreground">--</div>
                  <p className="text-xs text-muted-foreground mt-1">Not tested</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Rate Limiting</CardTitle>
            </CardHeader>
            <CardContent>
              {testResults["rate-limiting"] ? (
                <>
                  <div className="text-3xl font-bold text-green-600">ACTIVE</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testResults["rate-limiting"].summary.passed}/
                    {testResults["rate-limiting"].summary.total} Protected
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-muted-foreground">--</div>
                  <p className="text-xs text-muted-foreground mt-1">Not tested</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Sec Headers</CardTitle>
            </CardHeader>
            <CardContent>
              {testResults["security-headers"] ? (
                <>
                  <div className="text-3xl font-bold text-green-600">PASS</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testResults["security-headers"].summary.passed}/
                    {testResults["security-headers"].summary.total} Configured
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-muted-foreground">--</div>
                  <p className="text-xs text-muted-foreground mt-1">Not tested</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border-green-500/50 bg-green-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              {testResults["authentication"] ? (
                <>
                  <div className="text-3xl font-bold text-green-600">PASS</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {testResults["authentication"].summary.passed}/
                    {testResults["authentication"].summary.total} Secured
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-muted-foreground">--</div>
                  <p className="text-xs text-muted-foreground mt-1">Not tested</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sql-injection">SQL Injection</TabsTrigger>
            <TabsTrigger value="xss">XSS Testing</TabsTrigger>
            <TabsTrigger value="rate-limit">Rate Limiting</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="auth">Auth</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  Interactive Testing Suite
                </CardTitle>
                <CardDescription>
                  Run live penetration tests against the application security controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Real-time Security Testing</AlertTitle>
                  <AlertDescription>
                    Click "Run All Tests" to execute comprehensive security validation or run individual tests
                    below. All tests run against actual security controls in this application.
                  </AlertDescription>
                </Alert>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        SQL Injection Test
                        {activeTest === "sql-injection" && <Loader2 className="h-4 w-4 animate-spin" />}
                      </CardTitle>
                      <CardDescription>10 malicious SQL payloads</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => runTest("sql-injection")}
                        disabled={loading}
                        variant="outline"
                        className="w-full"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Run SQL Tests
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        XSS Protection Test
                        {activeTest === "xss" && <Loader2 className="h-4 w-4 animate-spin" />}
                      </CardTitle>
                      <CardDescription>8 XSS attack vectors</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => runTest("xss")}
                        disabled={loading}
                        variant="outline"
                        className="w-full"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Run XSS Tests
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        Rate Limiting Test
                        {activeTest === "rate-limiting" && <Loader2 className="h-4 w-4 animate-spin" />}
                      </CardTitle>
                      <CardDescription>5 load scenarios</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => runTest("rate-limiting")}
                        disabled={loading}
                        variant="outline"
                        className="w-full"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Run Rate Tests
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        Security Headers Test
                        {activeTest === "security-headers" && <Loader2 className="h-4 w-4 animate-spin" />}
                      </CardTitle>
                      <CardDescription>6 critical headers</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => runTest("security-headers")}
                        disabled={loading}
                        variant="outline"
                        className="w-full"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Run Header Tests
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="text-base flex items-center justify-between">
                        Authentication Test
                        {activeTest === "authentication" && <Loader2 className="h-4 w-4 animate-spin" />}
                      </CardTitle>
                      <CardDescription>5 auth security checks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => runTest("authentication")}
                        disabled={loading}
                        variant="outline"
                        className="w-full"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Run Auth Tests
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SQL Injection Tab */}
          <TabsContent value="sql-injection" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>SQL Injection Testing</CardTitle>
                    <CardDescription>Testing database query protection and input validation</CardDescription>
                  </div>
                  <Button onClick={() => runTest("sql-injection")} disabled={loading}>
                    {activeTest === "sql-injection" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Run Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {testResults["sql-injection"] ? (
                  <div className="space-y-4">
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-600">All Tests Passed</AlertTitle>
                      <AlertDescription>
                        {testResults["sql-injection"].summary.blocked} out of{" "}
                        {testResults["sql-injection"].summary.total} malicious SQL injections blocked by Arcjet
                        WAF
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      {testResults["sql-injection"].results.map((result, idx) => (
                        <Card key={idx} className="border-border/50">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              {getStatusIcon(result.status)}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{result.test}</h4>
                                  {getStatusBadge(result.status)}
                                </div>
                                {result.payload && (
                                  <code className="text-xs bg-muted px-2 py-1 rounded block overflow-x-auto">
                                    {result.payload}
                                  </code>
                                )}
                                <p className="text-sm text-muted-foreground">{result.message}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>No Test Results</AlertTitle>
                    <AlertDescription>Click "Run Test" to execute SQL injection tests</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* XSS Tab */}
          <TabsContent value="xss" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cross-Site Scripting (XSS) Testing</CardTitle>
                    <CardDescription>Testing input sanitization and output encoding</CardDescription>
                  </div>
                  <Button onClick={() => runTest("xss")} disabled={loading}>
                    {activeTest === "xss" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Run Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {testResults["xss"] ? (
                  <div className="space-y-4">
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-600">All Tests Passed</AlertTitle>
                      <AlertDescription>
                        {testResults["xss"].summary.passed} out of {testResults["xss"].summary.total} XSS
                        attacks prevented through sanitization and CSP
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      {testResults["xss"].results.map((result, idx) => (
                        <Card key={idx} className="border-border/50">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              {getStatusIcon(result.status)}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{result.test}</h4>
                                  {getStatusBadge(result.status)}
                                </div>
                                {result.payload && (
                                  <code className="text-xs bg-muted px-2 py-1 rounded block overflow-x-auto">
                                    {result.payload}
                                  </code>
                                )}
                                <p className="text-sm text-muted-foreground">{result.message}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>No Test Results</AlertTitle>
                    <AlertDescription>Click "Run Test" to execute XSS protection tests</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rate Limiting Tab */}
          <TabsContent value="rate-limit" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Rate Limiting & DDoS Protection</CardTitle>
                    <CardDescription>Testing traffic control and abuse prevention</CardDescription>
                  </div>
                  <Button onClick={() => runTest("rate-limiting")} disabled={loading}>
                    {activeTest === "rate-limiting" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Run Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {testResults["rate-limiting"] ? (
                  <div className="space-y-4">
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-600">All Tests Passed</AlertTitle>
                      <AlertDescription>
                        Rate limiting active: {testResults["rate-limiting"].summary.limit}
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      {testResults["rate-limiting"].results.map((result, idx) => (
                        <Card key={idx} className="border-border/50">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              {getStatusIcon(result.status)}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{result.test}</h4>
                                  {getStatusBadge(result.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">{result.message}</p>
                                {result.details && (
                                  <p className="text-xs text-muted-foreground/70">{result.details}</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>No Test Results</AlertTitle>
                    <AlertDescription>
                      Click "Run Test" to execute rate limiting tests
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Headers Tab */}
          <TabsContent value="headers" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Security Headers Validation</CardTitle>
                    <CardDescription>Testing HTTP security header configuration</CardDescription>
                  </div>
                  <Button onClick={() => runTest("security-headers")} disabled={loading}>
                    {activeTest === "security-headers" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Run Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {testResults["security-headers"] ? (
                  <div className="space-y-4">
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-600">All Headers Configured</AlertTitle>
                      <AlertDescription>
                        {testResults["security-headers"].summary.passed} out of{" "}
                        {testResults["security-headers"].summary.total} security headers properly set
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      {testResults["security-headers"].results.map((result, idx) => (
                        <Card key={idx} className="border-border/50">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              {getStatusIcon(result.status)}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{result.test}</h4>
                                  {getStatusBadge(result.status)}
                                </div>
                                {result.value && (
                                  <code className="text-xs bg-muted px-2 py-1 rounded block overflow-x-auto">
                                    {result.value}
                                  </code>
                                )}
                                <p className="text-sm text-muted-foreground">{result.message}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>No Test Results</AlertTitle>
                    <AlertDescription>
                      Click "Run Test" to validate security headers
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authentication Tab */}
          <TabsContent value="auth" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Authentication Security Testing</CardTitle>
                    <CardDescription>Testing OAuth 2.0 and session management</CardDescription>
                  </div>
                  <Button onClick={() => runTest("authentication")} disabled={loading}>
                    {activeTest === "authentication" ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    Run Test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {testResults["authentication"] ? (
                  <div className="space-y-4">
                    <Alert className="border-green-500/50 bg-green-500/10">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-600">Authentication Secured</AlertTitle>
                      <AlertDescription>
                        {testResults["authentication"].summary.passed} out of{" "}
                        {testResults["authentication"].summary.total} authentication controls validated
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      {testResults["authentication"].results.map((result, idx) => (
                        <Card key={idx} className="border-border/50">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-3">
                              {getStatusIcon(result.status)}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium">{result.test}</h4>
                                  {getStatusBadge(result.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">{result.message}</p>
                                {result.details && (
                                  <p className="text-xs text-muted-foreground/70">{result.details}</p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>No Test Results</AlertTitle>
                    <AlertDescription>
                      Click "Run Test" to validate authentication security
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Navigation */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Week 5: Interactive Penetration Testing</h3>
                <p className="text-sm text-muted-foreground">
                  Real-time security validation - Part of the AI Protector Workshop
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
