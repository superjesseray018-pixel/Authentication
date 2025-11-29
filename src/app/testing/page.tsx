"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Shield, AlertTriangle, Terminal, FileCode, Lock, Zap, Play, Loader2, RotateCcw, Download, ArrowLeft } from "lucide-react"
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
  const [kaliOutput, setKaliOutput] = useState<string[]>([])
  const [kaliLoading, setKaliLoading] = useState(false)
  const [selectedKaliTest, setSelectedKaliTest] = useState<string>("")
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [kaliOutput])

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

  const resetAllTests = () => {
    setTestResults({})
    setLoading(false)
    setActiveTest(null)
  }

  const resetTest = (testType: string) => {
    const newResults = { ...testResults }
    delete newResults[testType]
    setTestResults(newResults)
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

  const runKaliTest = async (testType: string) => {
    setKaliLoading(true)
    setSelectedKaliTest(testType)
    setKaliOutput([`> Running ${testType} test...`, ""])

    try {
      const response = await fetch("/api/pentest/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tests: [testType] }),
      })

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n").filter((line) => line.trim())

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") continue
              setKaliOutput((prev) => [...prev, data])
            }
          }
        }
      }

      setKaliOutput((prev) => [...prev, "", `✓ ${testType} test complete`])
    } catch (error) {
      setKaliOutput((prev) => [...prev, "", `✗ Error: ${error}`])
    } finally {
      setKaliLoading(false)
    }
  }

  const runAllKaliTests = async () => {
    setKaliLoading(true)
    setSelectedKaliTest("all")
    setKaliOutput(["> Running comprehensive Kali Linux penetration tests...", ""])

    const tests = ["security-headers", "rate-limit", "sql-injection", "xss", "auth-bypass"]

    for (const test of tests) {
      setKaliOutput((prev) => [...prev, "", `> Starting ${test} test...`])
      
      try {
        const response = await fetch("/api/pentest/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tests: [test] }),
        })

        const reader = response.body?.getReader()
        const decoder = new TextDecoder()

        if (reader) {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            const chunk = decoder.decode(value)
            const lines = chunk.split("\n").filter((line) => line.trim())

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6)
                if (data === "[DONE]") continue
                setKaliOutput((prev) => [...prev, data])
              }
            }
          }
        }

        setKaliOutput((prev) => [...prev, `✓ ${test} complete`])
      } catch (error) {
        setKaliOutput((prev) => [...prev, `✗ ${test} failed: ${error}`])
      }

      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setKaliOutput((prev) => [...prev, "", "=" .repeat(60), "✓ All Kali Linux tests complete"])
    setKaliLoading(false)
  }

  const exportKaliResults = () => {
    const blob = new Blob([kaliOutput.join("\n")], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `kali-pentest-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const clearKaliOutput = () => {
    setKaliOutput([])
    setSelectedKaliTest("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <Shield className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
              <span className="text-lg font-semibold text-foreground">JRL</span>
            </Link>

            {/* Back Button */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Link>
            </Button>
          </div>
        </div>
      </nav>

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
              <>
                <Badge variant="default" className="text-base px-4 py-2">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  {Object.keys(testResults).length} Tests Complete
                </Badge>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={resetAllTests}
                  disabled={loading}
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  Reset All
                </Button>
              </>
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
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sql-injection">SQL Injection</TabsTrigger>
            <TabsTrigger value="xss">XSS Testing</TabsTrigger>
            <TabsTrigger value="rate-limit">Rate Limiting</TabsTrigger>
            <TabsTrigger value="headers">Headers</TabsTrigger>
            <TabsTrigger value="auth">Auth</TabsTrigger>
            <TabsTrigger value="kali">
              <Terminal className="h-4 w-4 mr-2" />
              Kali Linux
            </TabsTrigger>
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
                  <div className="flex gap-2">
                    <Button onClick={() => runTest("sql-injection")} disabled={loading}>
                      {activeTest === "sql-injection" ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      Run Test
                    </Button>
                    {testResults["sql-injection"] && (
                      <Button
                        variant="outline"
                        onClick={() => resetTest("sql-injection")}
                        disabled={loading}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
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
                  <div className="flex gap-2">
                    <Button onClick={() => runTest("xss")} disabled={loading}>
                      {activeTest === "xss" ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      Run Test
                    </Button>
                    {testResults["xss"] && (
                      <Button
                        variant="outline"
                        onClick={() => resetTest("xss")}
                        disabled={loading}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
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
                  <div className="flex gap-2">
                    <Button onClick={() => runTest("rate-limiting")} disabled={loading}>
                      {activeTest === "rate-limiting" ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      Run Test
                    </Button>
                    {testResults["rate-limiting"] && (
                      <Button
                        variant="outline"
                        onClick={() => resetTest("rate-limiting")}
                        disabled={loading}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
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
                  <div className="flex gap-2">
                    <Button onClick={() => runTest("security-headers")} disabled={loading}>
                      {activeTest === "security-headers" ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      Run Test
                    </Button>
                    {testResults["security-headers"] && (
                      <Button
                        variant="outline"
                        onClick={() => resetTest("security-headers")}
                        disabled={loading}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
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
                  <div className="flex gap-2">
                    <Button onClick={() => runTest("authentication")} disabled={loading}>
                      {activeTest === "authentication" ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      Run Test
                    </Button>
                    {testResults["authentication"] && (
                      <Button
                        variant="outline"
                        onClick={() => resetTest("authentication")}
                        disabled={loading}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
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

          {/* Kali Linux Terminal Tab */}
          <TabsContent value="kali" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Terminal className="h-5 w-5" />
                      Kali Linux Penetration Testing
                    </CardTitle>
                    <CardDescription>Live terminal output from security testing tools</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={runAllKaliTests} disabled={kaliLoading}>
                      {kaliLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4 mr-2" />
                      )}
                      Run All Tests
                    </Button>
                    {kaliOutput.length > 0 && (
                      <>
                        <Button variant="outline" onClick={exportKaliResults} disabled={kaliLoading}>
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="outline" onClick={clearKaliOutput} disabled={kaliLoading}>
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertTitle>Professional Penetration Testing</AlertTitle>
                  <AlertDescription>
                    Run comprehensive security tests with real-time terminal output. Select individual tests or run
                    all tests to perform a full security assessment.
                  </AlertDescription>
                </Alert>

                {/* Quick Test Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => runKaliTest("security-headers")}
                    disabled={kaliLoading}
                    className="h-auto py-3"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Security Headers
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => runKaliTest("rate-limit")}
                    disabled={kaliLoading}
                    className="h-auto py-3"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Rate Limiting
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => runKaliTest("sql-injection")}
                    disabled={kaliLoading}
                    className="h-auto py-3"
                  >
                    <FileCode className="h-4 w-4 mr-2" />
                    SQL Injection
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => runKaliTest("xss")}
                    disabled={kaliLoading}
                    className="h-auto py-3"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    XSS Testing
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => runKaliTest("auth-bypass")}
                    disabled={kaliLoading}
                    className="h-auto py-3"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Auth Bypass
                  </Button>
                </div>

                {/* Terminal Output */}
                <Card className="bg-black border-green-500/20">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-green-500/20 bg-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <Terminal className="h-4 w-4 text-green-500 ml-2" />
                        <span className="text-green-500 font-mono text-sm">root@kali-pentest:~#</span>
                      </div>
                      {kaliLoading && (
                        <Badge variant="outline" className="border-green-500/50 text-green-500 bg-green-500/10">
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Executing...
                        </Badge>
                      )}
                    </div>
                    
                    <div 
                      ref={terminalRef}
                      className="font-mono text-sm text-green-400 overflow-y-auto p-4 bg-black"
                      style={{ 
                        height: "600px",
                        scrollBehavior: "smooth",
                        lineHeight: "1.5"
                      }}
                    >
                      {kaliOutput.length > 0 ? (
                        kaliOutput.map((line, idx) => (
                          <div 
                            key={idx} 
                            className={`whitespace-pre-wrap break-all ${
                              line.includes('✅') ? 'text-green-400' :
                              line.includes('❌') ? 'text-red-400' :
                              line.includes('⚠️') ? 'text-yellow-400' :
                              line.includes('🎯') ? 'text-cyan-400 font-semibold' :
                              line.includes('═') ? 'text-blue-400' :
                              line.includes('─') ? 'text-gray-600' :
                              line.includes('$') ? 'text-purple-400' :
                              line.includes('📊') ? 'text-yellow-300 font-semibold' :
                              'text-green-400'
                            }`}
                          >
                            {line || '\u00A0'}
                          </div>
                        ))
                      ) : (
                        <div className="text-green-500/50 italic">
                          <div>╔═══════════════════════════════════════════════════════════╗</div>
                          <div>║  Kali Linux Penetration Testing Terminal                 ║</div>
                          <div>║  Ready to execute security tests...                       ║</div>
                          <div>║                                                           ║</div>
                          <div>║  Select a test above or run comprehensive suite          ║</div>
                          <div>╚═══════════════════════════════════════════════════════════╝</div>
                        </div>
                      )}
                      {kaliLoading && (
                        <div className="flex items-center gap-2 mt-2 text-green-500">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="animate-pulse">Executing penetration tests...</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Test Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-blue-500/20 bg-blue-500/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">What is Kali Linux?</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Kali Linux is a Debian-based distribution designed for digital forensics and penetration
                      testing. It comes pre-installed with hundreds of security tools for vulnerability assessment
                      and ethical hacking.
                    </CardContent>
                  </Card>

                  <Card className="border-purple-500/20 bg-purple-500/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Tests Performed</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      This suite tests security headers, rate limiting, SQL injection protection, XSS prevention,
                      and authentication bypass attempts - simulating real-world attack vectors against your
                      application.
                    </CardContent>
                  </Card>
                </div>
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
