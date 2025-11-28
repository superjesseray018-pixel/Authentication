# 🐉 Kali Linux Penetration Testing - Quick Start Guide

**Target Application**: https://portfolio-app-with-authentication-owdjtrive.vercel.app  
**Testing Environment**: Kali Linux (VM or Native)  
**Authorization**: ✅ Self-owned application testing

---

## 🚀 Quick Start (5 Minutes)

### Option 1: Run Automated Test Suite (Recommended)

```bash
# 1. Download the test script
wget https://raw.githubusercontent.com/superjesseray018-pixel/Authentication/main/tests/kali-pentest-suite.sh

# Or if you have the repo locally:
cd tests

# 2. Make it executable
chmod +x kali-pentest-suite.sh

# 3. Run all tests
./kali-pentest-suite.sh https://portfolio-app-with-authentication-owdjtrive.vercel.app

# Results will be saved to: ./pentest-results-[timestamp]/
```

### Option 2: Manual Testing (Step-by-Step)

```bash
# Quick reconnaissance
nmap -sV portfolio-app-with-authentication-owdjtrive.vercel.app
whatweb https://portfolio-app-with-authentication-owdjtrive.vercel.app

# Test security headers
curl -I https://portfolio-app-with-authentication-owdjtrive.vercel.app

# Test rate limiting (send 150 requests)
for i in {1..150}; do 
    curl -s -o /dev/null -w "%{http_code}\n" \
    https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/newsletter &
done | sort | uniq -c

# Quick vulnerability scan
nikto -h https://portfolio-app-with-authentication-owdjtrive.vercel.app
```

---

## 📋 Pre-Flight Checklist

### System Requirements
- [ ] Kali Linux installed (VM, WSL, or native)
- [ ] Internet connection active
- [ ] Required tools installed (see below)
- [ ] Authorization confirmed (you own this app)

### Install Required Tools

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y \
    nmap \
    nikto \
    sqlmap \
    whatweb \
    curl \
    wget \
    dirb \
    gobuster \
    zaproxy

# Verify installations
nmap --version
nikto -Version
curl --version
```

---

## 🎯 Testing Scenarios

### 1. Security Headers Test (2 minutes)

**What we're testing**: Proper security header configuration

```bash
# Test security headers
curl -I https://portfolio-app-with-authentication-owdjtrive.vercel.app | grep -i "strict-transport-security\|x-frame-options\|x-content-type-options\|content-security-policy"

# Expected results:
# ✅ Strict-Transport-Security: max-age=63072000
# ✅ X-Frame-Options: SAMEORIGIN
# ✅ X-Content-Type-Options: nosniff
# ✅ Content-Security-Policy: [policy string]
```

**Expected Outcome**: All 10+ security headers present ✅

---

### 2. Rate Limiting Test (3 minutes)

**What we're testing**: Arcjet WAF rate limiting (100 req/min)

```bash
# Send 150 rapid requests
for i in {1..150}; do
    curl -s -o /dev/null -w "Request $i: %{http_code}\n" \
    https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/newsletter \
    -X POST \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test$i@example.com\"}"
    sleep 0.1
done | tee rate-limit-results.txt

# Count 429 responses
grep "429" rate-limit-results.txt | wc -l
```

**Expected Outcome**: 
- First ~100 requests: 200/201 ✅
- After 100: 429 (Rate Limited) ✅

---

### 3. SQL Injection Test (5 minutes)

**What we're testing**: Arcjet Shield SQL injection protection

```bash
# Test common SQL injection payloads
echo "Testing SQL Injection Protection..."

# Payload 1: Classic OR bypass
curl -X POST https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/newsletter \
    -H "Content-Type: application/json" \
    -d '{"email":"admin'\'' OR '\''1'\''='\''1@test.com"}'

# Payload 2: UNION attack
curl -X POST https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/newsletter \
    -H "Content-Type: application/json" \
    -d '{"email":"test'\'' UNION SELECT * FROM users--@test.com"}'

# Payload 3: Comment bypass
curl -X POST https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/newsletter \
    -H "Content-Type: application/json" \
    -d '{"email":"admin'\''--@test.com"}'

# Automated testing
sqlmap -u "https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/newsletter" \
    --data='{"email":"test@example.com"}' \
    --batch \
    --level=3
```

**Expected Outcome**: All payloads blocked (403) or sanitized ✅

---

### 4. XSS Test (5 minutes)

**What we're testing**: Cross-Site Scripting protection

```bash
# Test XSS payloads
echo "Testing XSS Protection..."

# Payload 1: Basic script tag
curl -X POST https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/newsletter \
    -H "Content-Type: application/json" \
    -d '{"email":"<script>alert(\"XSS\")</script>@test.com"}'

# Payload 2: Event handler
curl -X POST https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/newsletter \
    -H "Content-Type: application/json" \
    -d '{"email":"<img src=x onerror=alert(\"XSS\")>@test.com"}'

# Payload 3: SVG-based XSS
curl -X POST https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/newsletter \
    -H "Content-Type: application/json" \
    -d '{"email":"<svg/onload=alert(\"XSS\")>@test.com"}'
```

**Expected Outcome**: All XSS attempts sanitized or blocked ✅

---

### 5. Bot Detection Test (2 minutes)

**What we're testing**: Arcjet bot detection

```bash
# Test as normal browser (should work)
curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0" \
    https://portfolio-app-with-authentication-owdjtrive.vercel.app

# Test as Python bot (should be blocked)
curl -A "python-requests/2.31.0" \
    https://portfolio-app-with-authentication-owdjtrive.vercel.app

# Test as scraper (should be blocked)
curl -A "Scrapy/2.11.0" \
    https://portfolio-app-with-authentication-owdjtrive.vercel.app

# Test as Googlebot (should be allowed)
curl -A "Googlebot/2.1" \
    https://portfolio-app-with-authentication-owdjtrive.vercel.app
```

**Expected Outcome**:
- Normal browser: 200 ✅
- Python/Scrapers: 403 ✅
- Search engines: 200 ✅

---

### 6. Authentication Bypass Test (3 minutes)

**What we're testing**: Protected route access control

```bash
# Try accessing protected routes without auth
echo "Testing Authentication Controls..."

# Test 1: Dashboard (should redirect or 401)
curl -I https://portfolio-app-with-authentication-owdjtrive.vercel.app/dashboard

# Test 2: Admin panel (should redirect or 401)
curl -I https://portfolio-app-with-authentication-owdjtrive.vercel.app/admin

# Test 3: Monitoring API (should return 401)
curl https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/monitoring

# Test 4: Protected API with fake token
curl -H "Authorization: Bearer fake_token_12345" \
    https://portfolio-app-with-authentication-owdjtrive.vercel.app/api/mcp
```

**Expected Outcome**: All unauthorized access blocked ✅

---

### 7. Port & Service Scan (5 minutes)

**What we're testing**: Open ports and services

```bash
# Basic port scan
nmap -sV portfolio-app-with-authentication-owdjtrive.vercel.app

# Comprehensive scan
nmap -sS -sV -A -p- portfolio-app-with-authentication-owdjtrive.vercel.app

# Save results
nmap -sV -oN nmap-results.txt portfolio-app-with-authentication-owdjtrive.vercel.app
```

**Expected Outcome**: 
- Port 443 (HTTPS): Open ✅
- Port 80 (HTTP): Redirects to HTTPS ✅
- Other ports: Filtered/Closed ✅

---

### 8. Web Application Scan (10 minutes)

**What we're testing**: Common web vulnerabilities

```bash
# Run Nikto web scanner
nikto -h https://portfolio-app-with-authentication-owdjtrive.vercel.app \
    -output nikto-report.html \
    -Format html

# Check for interesting directories
gobuster dir \
    -u https://portfolio-app-with-authentication-owdjtrive.vercel.app \
    -w /usr/share/wordlists/dirb/common.txt \
    -t 30

# OR use dirb
dirb https://portfolio-app-with-authentication-owdjtrive.vercel.app
```

**Expected Outcome**: 
- Public pages accessible ✅
- Hidden admin paths blocked ✅
- Minimal information disclosure ✅

---

## 📊 Results Interpretation

### ✅ **PASS** - Security Controls Working
- Rate limiting triggers at 100 req/min (429 responses)
- SQL injection blocked (403 or sanitized)
- XSS payloads sanitized/blocked
- Security headers all present
- Protected routes require authentication
- Bots/scrapers blocked except search engines

### ⚠️ **REVIEW** - Needs Investigation
- Some payloads accepted (check if sanitized)
- Slow response times (potential DoS vector)
- Information disclosure in error messages
- Missing specific security headers

### ❌ **FAIL** - Vulnerability Found
- Rate limiting not working (no 429s)
- SQL/XSS payloads accepted without sanitization
- Protected routes accessible without auth
- Critical security headers missing

---

## 🛡️ What Should Happen (Expected Security Posture)

Based on your implementation:

| Test Type | Expected Result | Arcjet Feature |
|-----------|----------------|----------------|
| Rate Limiting | 429 after 100 req/min | ✅ Token Bucket |
| SQL Injection | 403 Blocked | ✅ Shield |
| XSS Attacks | Sanitized/Blocked | ✅ Shield |
| Bot Scraping | 403 Forbidden | ✅ Bot Detection |
| Auth Bypass | 401/Redirect | ✅ Clerk OAuth |
| Admin Access | 403 Non-admin | ✅ Role-Based |
| Security Headers | 10+ Headers | ✅ Next.js Config |

---

## 📁 Generate Full Report

```bash
# Run complete test suite
./tests/kali-pentest-suite.sh https://portfolio-app-with-authentication-owdjtrive.vercel.app

# Results will be in: ./pentest-results-[timestamp]/
# Files include:
# - dns-records.txt
# - nmap-scan.txt
# - nikto-scan.txt
# - security-headers.txt
# - rate-limit-test.txt
# - sql-injection-test.txt
# - xss-test.txt
# - ssl-scan.txt
```

---

## 🎓 Learning Outcomes

After completing these tests, you'll have verified:

1. **Transport Security**: HTTPS/TLS properly configured
2. **Input Validation**: SQL/XSS attacks prevented
3. **Rate Limiting**: DDoS protection active
4. **Authentication**: OAuth 2.0 properly implemented
5. **Authorization**: Role-based access working
6. **Bot Protection**: Legitimate traffic only
7. **Security Headers**: Browser protections enabled
8. **API Security**: OAuth 2.1 MCP endpoints secured

---

## 🆘 Troubleshooting

### "Command not found" errors
```bash
# Install missing tools
sudo apt install [tool-name]
```

### Rate limiting not triggering
```bash
# May need to wait 1 minute for bucket refill
# Try from different IP or wait and retry
```

### Permission denied errors
```bash
# Run Kali as root or use sudo
sudo ./kali-pentest-suite.sh
```

### Connection timeouts
```bash
# Check if target is accessible
curl -I https://portfolio-app-with-authentication-owdjtrive.vercel.app
```

---

## 📚 Next Steps

1. **Run the automated suite**: `./tests/kali-pentest-suite.sh`
2. **Review all results**: Check each test output file
3. **Document findings**: Note any vulnerabilities
4. **Remediate issues**: Fix any problems found
5. **Re-test**: Verify fixes work
6. **Update security baseline**: Document new security posture

---

## ⚡ Pro Tips

- 🔴 **Always test with permission** - Only your own apps
- 📝 **Document everything** - Screenshots, commands, outputs
- 🎯 **Test methodically** - One category at a time
- 🔄 **Retest after changes** - Verify fixes work
- 🛡️ **Think like an attacker** - But act ethically
- 📊 **Compare baseline** - Track security improvements

---

**Ready to start? Run this command:**

```bash
cd tests && chmod +x kali-pentest-suite.sh && ./kali-pentest-suite.sh
```

Your comprehensive penetration test will begin! 🚀🔒