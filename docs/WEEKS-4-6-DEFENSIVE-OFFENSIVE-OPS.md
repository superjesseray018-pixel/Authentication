# Week 4-6: Defensive & Offensive Operations Guide

**Student**: Jesse Ray S. Lasam  
**Program**: AI Protector Workshop - Cycle 2  
**Focus**: WAF, Arcjet, Vercel Firewall, and Kali Linux Penetration Testing

---

## Week 4: Layered Defenses - WAF, Arcjet, and Vercel Firewall

### Overview
Implement multiple layers of security defense for your digital portfolio, focusing on Web Application Firewall (WAF) protection, Arcjet AI-agent-aware shielding, and Vercel's edge network firewall capabilities.

### Learning Objectives
- [ ] Understand Web Application Firewall (WAF) concepts
- [ ] Configure Vercel Firewall for edge protection
- [ ] Integrate Arcjet for AI agent security
- [ ] Implement rate limiting and DDoS protection
- [ ] Test firewall effectiveness
- [ ] Document layered defense architecture

---

## Part 1: Vercel Firewall Configuration

### Step 1: Enable Vercel Firewall

**Vercel Dashboard Steps**:
1. Go to your project on Vercel
2. Navigate to Settings → Firewall
3. Enable Vercel Firewall (Available on Pro plans)

### Step 2: Configure Firewall Rules

#### Create vercel.json Configuration
```json
{
  "firewall": {
    "rules": [
      {
        "id": "block-suspicious-requests",
        "action": "deny",
        "conditions": {
          "path": "contains",
          "value": [
            "../",
            "etc/passwd",
            "eval(",
            "<script>"
          ]
        }
      },
      {
        "id": "rate-limit-api",
        "action": "rate_limit",
        "conditions": {
          "path": "starts_with",
          "value": "/api/"
        },
        "rateLimit": {
          "limit": 100,
          "window": "1m"
        }
      },
      {
        "id": "geo-blocking",
        "action": "deny",
        "conditions": {
          "country": "not_in",
          "value": ["AU", "US", "GB", "CA", "NZ"]
        },
        "description": "Allow only trusted regions"
      },
      {
        "id": "block-known-bots",
        "action": "deny",
        "conditions": {
          "userAgent": "contains",
          "value": [
            "bot",
            "crawler",
            "spider",
            "scraper"
          ]
        },
        "exceptions": [
          "Googlebot",
          "Bingbot"
        ]
      }
    ]
  }
}
```

### Step 3: Implement Custom Security Headers

#### Update next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
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
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://vercel.live;"
          }
        ]
      }
    ]
  }
}

export default nextConfig
```

---

## Part 2: Arcjet Integration for AI Agent Protection

### Step 1: Install Arcjet

```powershell
# Install Arcjet SDK
npm install @arcjet/next

# Install additional Arcjet packages
npm install @arcjet/rate-limit @arcjet/bot-detection
```

### Step 2: Configure Arcjet

#### Create .env.local
```bash
ARCJET_KEY=your_arcjet_api_key_here
```

#### Create lib/arcjet.ts
```typescript
import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/next"

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    // Rate limiting for API routes
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 60,
      capacity: 100,
    }),
    // Bot detection
    detectBot({
      mode: "LIVE",
      allow: ["GOOGLE_SEARCH", "BING_SEARCH"],
    }),
    // Shield against common attacks
    shield({
      mode: "LIVE",
    }),
  ],
})
```

### Step 3: Protect API Routes

#### Update src/app/api/newsletter/route.ts
```typescript
import { NextRequest, NextResponse } from "next/server"
import { aj } from "@/lib/arcjet"

export async function POST(request: NextRequest) {
  // Apply Arcjet protection
  const decision = await aj.protect(request)

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "Bot access not allowed" },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: "Request blocked by security policy" },
      { status: 403 }
    )
  }

  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      )
    }

    // Your existing newsletter logic here...
    
    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

### Step 4: Add Middleware Protection

#### Update middleware.ts
```typescript
import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { aj } from '@/lib/arcjet'

export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Apply Arcjet protection to all routes
  const decision = await aj.protect(request)

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Request blocked by security policy" },
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

---

## Part 3: Testing Firewall Effectiveness

### Manual Testing Checklist

#### Test 1: Rate Limiting
```powershell
# Send multiple rapid requests
for ($i=1; $i -le 150; $i++) {
    Invoke-WebRequest -Uri "https://your-domain.vercel.app/api/newsletter" `
        -Method POST `
        -Body '{"email":"test@example.com"}' `
        -ContentType "application/json"
    Write-Host "Request $i completed"
}
```

**Expected Result**: After ~100 requests within 1 minute, requests should be rate-limited (429 status)

#### Test 2: SQL Injection Attempts
```powershell
# Test SQL injection protection
$maliciousPayloads = @(
    "' OR '1'='1",
    "'; DROP TABLE users--",
    "' UNION SELECT * FROM users--"
)

foreach ($payload in $maliciousPayloads) {
    Invoke-WebRequest -Uri "https://your-domain.vercel.app/api/newsletter" `
        -Method POST `
        -Body "{`"email`":`"$payload`"}" `
        -ContentType "application/json"
}
```

**Expected Result**: Requests should be blocked (400 or 403 status)

#### Test 3: XSS Attempts
```powershell
# Test XSS protection
$xssPayloads = @(
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "javascript:alert('XSS')"
)

foreach ($payload in $xssPayloads) {
    Invoke-WebRequest -Uri "https://your-domain.vercel.app/api/newsletter" `
        -Method POST `
        -Body "{`"email`":`"$payload@test.com`"}" `
        -ContentType "application/json"
}
```

**Expected Result**: Requests should be sanitized or blocked

### Automated Testing with curl

Create a test script `test-firewall.ps1`:

```powershell
# Firewall Testing Script
param(
    [string]$BaseUrl = "https://your-domain.vercel.app"
)

Write-Host "=== Firewall Security Testing ===" -ForegroundColor Cyan
Write-Host "Target: $BaseUrl" -ForegroundColor Yellow
Write-Host ""

# Test 1: Rate Limiting
Write-Host "Test 1: Rate Limiting..." -ForegroundColor Green
$rateLimitSuccess = 0
$rateLimitBlocked = 0

for ($i=1; $i -le 120; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "$BaseUrl/api/newsletter" `
            -Method POST `
            -Body '{"email":"test@example.com"}' `
            -ContentType "application/json" `
            -ErrorAction Stop
        
        if ($response.StatusCode -eq 201) {
            $rateLimitSuccess++
        }
    } catch {
        if ($_.Exception.Response.StatusCode.Value__ -eq 429) {
            $rateLimitBlocked++
        }
    }
    
    if ($i % 20 -eq 0) {
        Write-Host "  Sent $i requests..." -ForegroundColor Gray
    }
}

Write-Host "  Success: $rateLimitSuccess, Blocked: $rateLimitBlocked" -ForegroundColor White
if ($rateLimitBlocked -gt 0) {
    Write-Host "  ✅ Rate limiting is working" -ForegroundColor Green
} else {
    Write-Host "  ❌ Rate limiting may not be configured" -ForegroundColor Red
}

Write-Host ""

# Test 2: Security Headers
Write-Host "Test 2: Security Headers..." -ForegroundColor Green
$response = Invoke-WebRequest -Uri $BaseUrl -Method GET

$securityHeaders = @(
    "Strict-Transport-Security",
    "X-Frame-Options",
    "X-Content-Type-Options",
    "X-XSS-Protection",
    "Content-Security-Policy"
)

foreach ($header in $securityHeaders) {
    if ($response.Headers.ContainsKey($header)) {
        Write-Host "  ✅ $header present" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $header missing" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Testing Complete ===" -ForegroundColor Cyan
```

---

## Week 4 Deliverable Checklist

- [ ] Vercel Firewall configured and enabled
- [ ] vercel.json with firewall rules created
- [ ] Security headers implemented in next.config.mjs
- [ ] Arcjet SDK installed and configured
- [ ] Rate limiting implemented on API routes
- [ ] Bot detection configured
- [ ] Shield protection enabled
- [ ] Middleware protection added
- [ ] Manual testing completed
- [ ] Automated test script created and run
- [ ] Test results documented
- [ ] Security posture assessment written

### Documentation Requirements
1. **WAF Configuration Document**: Detailed explanation of all firewall rules
2. **Arcjet Integration Report**: Implementation steps and configuration
3. **Test Results**: Screenshots and logs from security testing
4. **Security Architecture Diagram**: Visual representation of layered defenses
5. **Incident Response Playbook**: What to do when attacks are detected

---

## Week 5: Kali Linux Penetration Testing Sprint

### Overview
Set up a Kali Linux environment and conduct comprehensive penetration testing against your portfolio application. Learn offensive security techniques to identify vulnerabilities from an attacker's perspective.

### Learning Objectives
- [ ] Set up Kali Linux environment (VM or WSL)
- [ ] Learn penetration testing methodology
- [ ] Conduct rate limit testing
- [ ] Perform brute-force attacks
- [ ] Test for SQL injection vulnerabilities
- [ ] Test for XSS and CSRF
- [ ] Document findings and create remediation plan

---

## Part 1: Kali Linux Setup

### Option 1: Windows Subsystem for Linux (WSL) - Recommended for Windows

```powershell
# Enable WSL
wsl --install

# Install Kali Linux from Microsoft Store
# Or use command line:
wsl --install -d kali-linux

# Start Kali Linux
wsl -d kali-linux

# Update Kali
sudo apt update && sudo apt upgrade -y

# Install Kali metapackages
sudo apt install -y kali-tools-top10
```

### Option 2: VirtualBox Virtual Machine

1. Download Kali Linux VM image from https://www.kali.org/get-kali/
2. Install VirtualBox
3. Import Kali Linux VM
4. Configure network settings (Bridged Adapter for testing)

### Essential Tools Installation

```bash
# In Kali Linux terminal
sudo apt update

# Install essential penetration testing tools
sudo apt install -y \
    nmap \
    nikto \
    sqlmap \
    burpsuite \
    zaproxy \
    metasploit-framework \
    hydra \
    john \
    aircrack-ng \
    wireshark \
    gobuster \
    dirbuster

# Install additional tools
sudo apt install -y \
    curl \
    wget \
    git \
    python3 \
    python3-pip
```

---

## Part 2: Reconnaissance and Information Gathering

### Target Information
**Target URL**: https://your-portfolio.vercel.app  
**Scope**: Your own portfolio application only  
**Authorized Testing**: ✅ Yes (your own application)

### Network Reconnaissance

```bash
# Scan target for open ports
nmap -sV -sC -p- your-portfolio.vercel.app

# Check SSL/TLS configuration
nmap --script ssl-enum-ciphers -p 443 your-portfolio.vercel.app

# DNS enumeration
nslookup your-portfolio.vercel.app
dig your-portfolio.vercel.app ANY
```

### Web Application Scanning

```bash
# Nikto web server scanner
nikto -h https://your-portfolio.vercel.app -ssl

# Directory bruteforcing
gobuster dir -u https://your-portfolio.vercel.app \
    -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

# Technology detection
whatweb https://your-portfolio.vercel.app
```

---

## Part 3: Authentication Testing

### Rate Limit Testing

Create `rate-limit-test.py`:

```python
import requests
import time
from concurrent.futures import ThreadPoolExecutor

TARGET_URL = "https://your-portfolio.vercel.app/api/newsletter"
THREADS = 10
REQUESTS_PER_THREAD = 20

def send_request(i):
    try:
        response = requests.post(
            TARGET_URL,
            json={"email": f"test{i}@example.com"},
            timeout=5
        )
        return {
            "request": i,
            "status": response.status_code,
            "response": response.text[:100]
        }
    except Exception as e:
        return {
            "request": i,
            "status": "Error",
            "response": str(e)
        }

def main():
    print(f"[*] Starting rate limit test against {TARGET_URL}")
    print(f"[*] Threads: {THREADS}, Requests per thread: {REQUESTS_PER_THREAD}")
    
    start_time = time.time()
    
    with ThreadPoolExecutor(max_workers=THREADS) as executor:
        results = list(executor.map(send_request, range(THREADS * REQUESTS_PER_THREAD)))
    
    end_time = time.time()
    
    # Analyze results
    status_codes = {}
    for result in results:
        status = result["status"]
        status_codes[status] = status_codes.get(status, 0) + 1
    
    print(f"\n[+] Test completed in {end_time - start_time:.2f} seconds")
    print(f"[+] Status code distribution:")
    for status, count in status_codes.items():
        print(f"    {status}: {count}")
    
    # Check if rate limiting is working
    if 429 in status_codes or "429" in status_codes:
        print(f"\n[✓] Rate limiting is WORKING (found {status_codes.get(429, status_codes.get('429', 0))} rate-limited responses)")
    else:
        print(f"\n[!] Rate limiting may NOT be configured properly")

if __name__ == "__main__":
    main()
```

Run the test:
```bash
python3 rate-limit-test.py
```

### Brute Force Testing (Clerk Authentication)

**WARNING**: Only test against your own application with permission.

```bash
# Test authentication brute force protection
# Using hydra (if you have a test endpoint)
hydra -l testuser@example.com -P /usr/share/wordlists/rockyou.txt \
    your-portfolio.vercel.app https-post-form \
    "/api/auth:email=^USER^&password=^PASS^:F=incorrect"
```

**Expected Result**: Clerk should block repeated failed attempts

---

## Part 4: Vulnerability Scanning

### SQL Injection Testing

```bash
# Use sqlmap to test for SQL injection
sqlmap -u "https://your-portfolio.vercel.app/api/newsletter" \
    --data='{"email":"test@example.com"}' \
    --method POST \
    --headers="Content-Type: application/json" \
    --level=5 \
    --risk=3

# Manual SQL injection tests
curl -X POST https://your-portfolio.vercel.app/api/newsletter \
    -H "Content-Type: application/json" \
    -d '{"email":"'\''OR 1=1--"}'
```

**Expected Result**: All requests should be safely handled (no SQL injection)

### XSS (Cross-Site Scripting) Testing

Create `xss-test.sh`:

```bash
#!/bin/bash

TARGET="https://your-portfolio.vercel.app/api/newsletter"

# XSS payloads
XSS_PAYLOADS=(
    "<script>alert('XSS')</script>"
    "<img src=x onerror=alert('XSS')>"
    "<svg/onload=alert('XSS')>"
    "javascript:alert('XSS')"
    "<iframe src=javascript:alert('XSS')>"
)

echo "[*] Starting XSS testing..."

for payload in "${XSS_PAYLOADS[@]}"; do
    echo "[+] Testing payload: $payload"
    curl -X POST "$TARGET" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"$payload@test.com\"}" \
        -v
    echo "---"
    sleep 1
done

echo "[*] XSS testing complete"
```

Make executable and run:
```bash
chmod +x xss-test.sh
./xss-test.sh
```

### CSRF (Cross-Site Request Forgery) Testing

Check for CSRF tokens in forms and verify SameSite cookie attributes:

```bash
# Check cookie security
curl -I https://your-portfolio.vercel.app

# Look for:
# - SameSite=Strict or Lax
# - Secure flag
# - HttpOnly flag
```

---

## Part 5: OWASP ZAP Automated Scanning

### Setup and Run ZAP

```bash
# Start OWASP ZAP in daemon mode
zaproxy -daemon -host 0.0.0.0 -port 8080 -config api.disablekey=true

# Run automated scan
zap-cli quick-scan --self-contained \
    -sc https://your-portfolio.vercel.app

# Generate report
zap-cli report -o zap-report.html -f html
```

---

## Week 5 Deliverable: Penetration Testing Playbook

### Playbook Structure

1. **Executive Summary**
   - Testing scope and objectives
   - Key findings summary
   - Risk assessment overview

2. **Methodology**
   - Testing approach
   - Tools used
   - Timeline

3. **Findings**
   - For each vulnerability found:
     - Severity (Critical/High/Medium/Low)
     - Description
     - Proof of concept
     - Affected components
     - Remediation recommendations

4. **Test Results**
   - Rate limiting tests
   - Authentication security
   - Input validation
   - XSS testing
   - SQL injection testing
   - CSRF protection
   - Security headers
   - SSL/TLS configuration

5. **Remediation Plan**
   - Prioritized fix list
   - Implementation timeline
   - Verification steps

6. **Screenshots and Evidence**
   - Tool outputs
   - Successful exploit attempts
   - Fixed vulnerabilities

### Deliverable Checklist

- [ ] Kali Linux environment set up
- [ ] All reconnaissance tests completed
- [ ] Rate limiting thoroughly tested
- [ ] Authentication security verified
- [ ] SQL injection tests completed
- [ ] XSS testing completed
- [ ] CSRF protection verified
- [ ] OWASP ZAP scan completed
- [ ] Penetration testing playbook written
- [ ] All findings documented with screenshots
- [ ] Remediation plan created
- [ ] High-priority vulnerabilities fixed
- [ ] Verification tests run after fixes

---

## Week 6: Prerequisites for Agent Security Advanced

### Overview
Prepare for advanced MCP security implementation by studying OAuth 2.1, JWT tokens, and MCP authentication architecture.

### Learning Objectives
- [ ] Master OAuth 2.1 specification
- [ ] Understand JWT token lifecycle
- [ ] Study MCP security best practices
- [ ] Review mcp-auth-demo repository
- [ ] Prepare for advanced implementation

### Study Topics

#### OAuth 2.1 Deep Dive
- Authorization Code Flow with PKCE
- Client authentication
- Token endpoints
- Refresh tokens
- Scope management

#### JWT Token Management
- Token structure (header, payload, signature)
- Token validation
- Expiration handling
- Refresh token rotation
- Security best practices

#### MCP Authentication Patterns
- Server-to-server authentication
- API key management
- OAuth integration with MCP
- Secure transport protocols

### Deliverable
- [ ] OAuth 2.1 knowledge assessment (quiz or documentation)
- [ ] JWT token management documentation
- [ ] MCP authentication architecture diagram
- [ ] Prerequisites completion checklist

---

**Documents Created**: Complete guides for Weeks 4-6  
**Status**: Ready for implementation  
**Next**: Execute Week 4 implementation
