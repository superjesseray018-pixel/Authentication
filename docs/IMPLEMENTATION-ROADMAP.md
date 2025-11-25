# AI Protector Workshop: Implementation Roadmap (No Reports)

**Focus**: Build the actual secure AI portfolio system  
**Goal**: Complete all technical implementations for Weeks 1-10  
**No Documentation Submissions Required**

---

## Week 1: Development Environment (COMPLETED ✅)

✅ Node.js installed  
✅ Git configured  
✅ VS Code with GitHub Copilot  
✅ Portfolio repository set up  
✅ Vercel deployment ready  

**Status**: Environment ready to build

---

## Week 2-3: Secure Portfolio Foundation

### Implementation Goals:
Build and deploy a production-ready secure Next.js portfolio with Clerk authentication.

### Tasks:

#### 1. Verify Current Security Baseline ✅
Your portfolio already has:
- ✅ Clerk authentication
- ✅ HTTPS (Vercel automatic)
- ✅ Environment variables
- ✅ Basic security headers

#### 2. Add Missing Security Headers
Update `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}

export default nextConfig
```

#### 3. Enhance Clerk Security Settings
In your Clerk Dashboard:
- Enable MFA options
- Configure session settings
- Set up email verification
- Configure allowed domains

#### 4. Add Security Monitoring Page
Create `src/app/security/page.tsx`:

```typescript
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Check, AlertTriangle } from "lucide-react"

export default function SecurityPage() {
  const securityChecks = [
    { name: "HTTPS Enabled", status: "pass", icon: Check },
    { name: "Clerk Authentication", status: "pass", icon: Check },
    { name: "Security Headers", status: "pass", icon: Check },
    { name: "Environment Variables Secured", status: "pass", icon: Check },
    { name: "WAF Configured", status: "pending", icon: AlertTriangle },
    { name: "Rate Limiting", status: "pending", icon: AlertTriangle },
  ]

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Security Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {securityChecks.map((check) => (
          <Card key={check.name} className="p-6">
            <div className="flex items-center justify-between">
              <span className="font-medium">{check.name}</span>
              <Badge variant={check.status === "pass" ? "default" : "secondary"}>
                <check.icon className="h-4 w-4 mr-1" />
                {check.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

**Week 2-3 Deliverable**: Secure portfolio deployed on Vercel with enhanced security

---

## Week 4: Vercel Firewall & Arcjet Integration

### Implementation Goals:
Add Web Application Firewall protection and rate limiting.

### Tasks:

#### 1. Install Arcjet
```powershell
cd "portfolio-app-with-authentication (2)\portfolio-app-with-authentication"
npm install @arcjet/next
```

#### 2. Configure Arcjet
Add to `.env.local`:
```
ARCJET_KEY=your_arcjet_key_here
```

Create `lib/arcjet.ts`:
```typescript
import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/next"

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 60,
      capacity: 100,
    }),
    detectBot({
      mode: "LIVE",
      allow: ["GOOGLE_SEARCH", "BING_SEARCH"],
    }),
    shield({
      mode: "LIVE",
    }),
  ],
})
```

#### 3. Protect API Routes
Update `src/app/api/newsletter/route.ts`:
```typescript
import { NextRequest, NextResponse } from "next/server"
import { aj } from "@/lib/arcjet"

export async function POST(request: NextRequest) {
  const decision = await aj.protect(request)

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      )
    }
    if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "Bot access denied" },
        { status: 403 }
      )
    }
    return NextResponse.json(
      { error: "Request blocked" },
      { status: 403 }
    )
  }

  // Your existing newsletter logic...
  try {
    const { email } = await request.json()
    
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      )
    }

    // Process subscription...
    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

#### 4. Add Middleware Protection
Update `middleware.ts`:
```typescript
import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { aj } from '@/lib/arcjet'

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const decision = await aj.protect(request)

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Request blocked" },
      { status: 403 }
    )
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

#### 5. Test Protection
Create `test-rate-limit.ps1`:
```powershell
$url = "http://localhost:3000/api/newsletter"

for ($i=1; $i -le 150; $i++) {
    try {
        $response = Invoke-WebRequest -Uri $url `
            -Method POST `
            -Body '{"email":"test@example.com"}' `
            -ContentType "application/json" `
            -ErrorAction Stop
        
        Write-Host "Request $i : $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "Request $i : BLOCKED ($($_.Exception.Response.StatusCode.Value__))" -ForegroundColor Red
    }
    Start-Sleep -Milliseconds 100
}
```

Run test:
```powershell
npm run dev
# In another terminal:
.\test-rate-limit.ps1
```

**Week 4 Deliverable**: WAF and rate limiting active on portfolio

---

## Week 5: Kali Linux Penetration Testing

### Implementation Goals:
Set up Kali and run penetration tests against your portfolio.

### Tasks:

#### 1. Install Kali Linux (WSL)
```powershell
# Install WSL if not already
wsl --install

# Install Kali
wsl --install -d kali-linux

# Start Kali
wsl -d kali-linux
```

#### 2. Install Testing Tools (in Kali)
```bash
sudo apt update
sudo apt install -y nmap nikto sqlmap curl python3 python3-pip
pip3 install requests
```

#### 3. Create Penetration Testing Scripts

**Rate Limit Test** (`rate-limit-test.py`):
```python
import requests
import time

TARGET = "https://your-portfolio.vercel.app/api/newsletter"
REQUESTS = 150

success = 0
blocked = 0

for i in range(REQUESTS):
    try:
        r = requests.post(TARGET, json={"email": f"test{i}@example.com"}, timeout=5)
        if r.status_code == 201:
            success += 1
        elif r.status_code == 429:
            blocked += 1
    except:
        pass

print(f"Success: {success}, Blocked: {blocked}")
print("✅ Rate limiting works!" if blocked > 0 else "❌ No rate limiting")
```

**SQL Injection Test** (`sql-test.sh`):
```bash
#!/bin/bash
TARGET="https://your-portfolio.vercel.app/api/newsletter"

PAYLOADS=(
    "' OR '1'='1"
    "'; DROP TABLE users--"
    "' UNION SELECT * FROM users--"
)

for payload in "${PAYLOADS[@]}"; do
    echo "Testing: $payload"
    curl -X POST "$TARGET" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$payload\"}"
    echo ""
done
```

**XSS Test** (`xss-test.sh`):
```bash
#!/bin/bash
TARGET="https://your-portfolio.vercel.app/api/newsletter"

PAYLOADS=(
    "<script>alert('XSS')</script>"
    "<img src=x onerror=alert('XSS')>"
    "javascript:alert('XSS')"
)

for payload in "${PAYLOADS[@]}"; do
    echo "Testing: $payload"
    curl -X POST "$TARGET" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$payload@test.com\"}"
    echo ""
done
```

#### 4. Run All Tests
```bash
# In Kali Linux
chmod +x sql-test.sh xss-test.sh
python3 rate-limit-test.py
./sql-test.sh
./xss-test.sh

# Network scan
nmap -sV your-portfolio.vercel.app

# Web vulnerability scan
nikto -h https://your-portfolio.vercel.app
```

**Week 5 Deliverable**: Penetration tests completed, vulnerabilities identified and fixed

---

## Week 6: OAuth 2.1 Prerequisites

### Implementation Goals:
Understand OAuth 2.1 and prepare for MCP authentication.

### Tasks:

#### 1. Study OAuth 2.1 Flow
Read: https://oauth.net/2.1/

Key concepts to understand:
- Authorization Code Flow with PKCE
- Access tokens vs Refresh tokens
- Token expiration and rotation
- Client authentication

#### 2. Review Clerk's OAuth Implementation
Your portfolio already uses Clerk which implements OAuth. Study:
```typescript
// How Clerk handles OAuth
import { auth } from '@clerk/nextjs/server'

// Protected route example
export default async function ProtectedPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  return <div>Protected content</div>
}
```

#### 3. Clone mcp-auth-demo
```powershell
git clone https://github.com/modelcontextprotocol/mcp-auth-demo
cd mcp-auth-demo
npm install
```

Review the authentication implementation.

**Week 6 Deliverable**: OAuth 2.1 fundamentals understood, ready for advanced implementation

---

## Week 7-8: OAuth 2.1 MCP Server Implementation

### Implementation Goals:
Create an OAuth-secured MCP server for your portfolio.

### Tasks:

#### 1. Create OAuth-Protected API
Create `src/app/api/mcp/route.ts`:
```typescript
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { userId } = auth()
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // MCP server functionality
  return NextResponse.json({
    message: 'MCP server endpoint',
    userId,
    capabilities: ['read', 'write']
  })
}

export async function POST(request: NextRequest) {
  const { userId } = auth()
  
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const body = await request.json()
  
  // Process MCP commands
  return NextResponse.json({
    success: true,
    result: body
  })
}
```

#### 2. Add JWT Token Validation
Create `lib/jwt-validation.ts`:
```typescript
import { auth } from '@clerk/nextjs/server'

export async function validateToken(request: Request) {
  const { userId, sessionId } = auth()
  
  if (!userId || !sessionId) {
    throw new Error('Invalid or missing authentication token')
  }

  return {
    userId,
    sessionId,
    valid: true
  }
}
```

#### 3. Implement Token Refresh
Clerk handles this automatically, but document the flow:
```typescript
// Clerk automatically refreshes tokens
// Session tokens expire after configured time
// Refresh tokens are used to get new session tokens
// All handled by Clerk middleware
```

#### 4. Add Rate Limiting to MCP Endpoints
```typescript
import { aj } from '@/lib/arcjet'

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const decision = await aj.protect(request)
  
  if (decision.isDenied()) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  // Your MCP logic...
}
```

**Week 7-8 Deliverable**: OAuth-secured API endpoints with token validation

---

## Week 9: Security Dashboard & Monitoring

### Implementation Goals:
Build real-time security monitoring dashboard.

### Tasks:

#### 1. Create Security Metrics API
Create `src/app/api/security/metrics/route.ts`:
```typescript
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { userId } = auth()
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Mock security metrics (replace with real data)
  const metrics = {
    totalRequests: 1247,
    blockedRequests: 23,
    activeUsers: 145,
    securityAlerts: 3,
    lastScan: new Date().toISOString()
  }

  return NextResponse.json(metrics)
}
```

#### 2. Build Security Dashboard
Create `src/app/dashboard/security/page.tsx`:
```typescript
"use client"

import { useEffect, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Activity, AlertTriangle, Users } from "lucide-react"

export default function SecurityDashboard() {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    fetch('/api/security/metrics')
      .then(r => r.json())
      .then(setMetrics)
  }, [])

  if (!metrics) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Security Operations Center</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Requests</p>
              <p className="text-2xl font-bold">{metrics.totalRequests}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Blocked Requests</p>
              <p className="text-2xl font-bold">{metrics.blockedRequests}</p>
            </div>
            <Shield className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Users</p>
              <p className="text-2xl font-bold">{metrics.activeUsers}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Alerts</p>
              <p className="text-2xl font-bold">{metrics.securityAlerts}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>
    </div>
  )
}
```

#### 3. Add Real-Time Monitoring
Install dependencies:
```powershell
npm install @vercel/analytics
```

Add to `src/app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Week 9 Deliverable**: Live security dashboard with real-time metrics

---

## Week 10: Final System Integration

### Implementation Goals:
Complete and polish the entire secure AI portfolio system.

### Tasks:

#### 1. Final Security Checklist
- [ ] All API routes protected with Arcjet
- [ ] Clerk authentication on all protected pages
- [ ] Security headers configured
- [ ] Rate limiting active
- [ ] HTTPS enforced
- [ ] Environment variables secured
- [ ] Security dashboard live
- [ ] Penetration tests passed

#### 2. Performance Optimization
```powershell
# Build for production
npm run build

# Test production build
npm start
```

#### 3. Deploy to Vercel
```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### 4. Final Testing
- Test all authentication flows
- Verify rate limiting
- Check security headers
- Test API endpoints
- Validate monitoring

**Week 10 Deliverable**: Complete production-ready secure AI portfolio

---

## Quick Implementation Checklist

### Core Components to Build:
- [x] Week 1: Dev environment
- [ ] Week 2-3: Security headers + Clerk configuration
- [ ] Week 4: Arcjet WAF + rate limiting
- [ ] Week 5: Penetration testing scripts
- [ ] Week 6: OAuth study
- [ ] Week 7-8: OAuth-secured API endpoints
- [ ] Week 9: Security dashboard
- [ ] Week 10: Final integration

### No Reports Needed:
✅ Focus on building the system  
✅ Test everything thoroughly  
✅ Deploy to production  
✅ Demonstrate working security features  

**Goal**: Have a production-ready, secure AI portfolio that demonstrates all AI Protector concepts through actual implementation.
