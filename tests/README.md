# AI Protector Workshop - Week 5 Penetration Testing

## Overview
Comprehensive penetration testing scripts for the AI Protector Workshop. These PowerShell scripts test your portfolio application's security controls against common web vulnerabilities.

## Prerequisites
- PowerShell 5.1 or higher
- Portfolio application running locally or deployed
- Network access to target application

## Test Scripts

### 1. Rate Limiting Test (`rate-limit-test.ps1`)
Tests the application's ability to handle high-volume requests and enforce rate limiting.

**Usage:**
```powershell
.\rate-limit-test.ps1 -Target "http://localhost:3000" -RequestCount 150 -DelayMs 100
```

**Parameters:**
- `Target`: URL of the application (default: http://localhost:3000)
- `RequestCount`: Number of requests to send (default: 150)
- `DelayMs`: Delay between requests in milliseconds (default: 100)

**What it tests:**
- Rate limiting enforcement
- WAF (Web Application Firewall) protection
- Threshold detection (429 responses)

### 2. SQL Injection Test (`sql-injection-test.ps1`)
Tests the application's protection against SQL injection attacks.

**Usage:**
```powershell
.\sql-injection-test.ps1 -Target "http://localhost:3000"
```

**Parameters:**
- `Target`: URL of the application (default: http://localhost:3000)

**What it tests:**
- Input validation
- SQL injection payload detection
- Database query protection
- Common injection patterns:
  - `' OR '1'='1`
  - `'; DROP TABLE users--`
  - `' UNION SELECT * FROM users--`
  - And more...

### 3. XSS (Cross-Site Scripting) Test (`xss-test.ps1`)
Tests the application's protection against XSS attacks.

**Usage:**
```powershell
.\xss-test.ps1 -Target "http://localhost:3000"
```

**Parameters:**
- `Target`: URL of the application (default: http://localhost:3000)

**What it tests:**
- Input sanitization
- XSS payload detection
- Content Security Policy (CSP) effectiveness
- Common XSS patterns:
  - `<script>alert('XSS')</script>`
  - `<img src=x onerror=alert('XSS')>`
  - `<svg/onload=alert('XSS')>`
  - And more...

### 4. Comprehensive Test Suite (`run-all-tests.ps1`)
Runs all penetration tests in sequence.

**Usage:**
```powershell
.\run-all-tests.ps1 -Target "http://localhost:3000"
```

**Parameters:**
- `Target`: URL of the application (default: http://localhost:3000)

## Running the Tests

### Testing Local Development Server

1. Start your development server:
```powershell
cd "c:\Users\roque\Downloads\portfolio-app-with-authentication (2)\portfolio-app-with-authentication"
npm run dev
```

2. Open a new PowerShell terminal

3. Navigate to the tests directory:
```powershell
cd "c:\Users\roque\Downloads\portfolio-app-with-authentication (2)\portfolio-app-with-authentication\tests"
```

4. Run the comprehensive test suite:
```powershell
.\run-all-tests.ps1
```

Or run individual tests:
```powershell
# Rate limiting test
.\rate-limit-test.ps1

# SQL injection test
.\sql-injection-test.ps1

# XSS test
.\xss-test.ps1
```

### Testing Production Deployment

Test your deployed application on Vercel:
```powershell
.\run-all-tests.ps1 -Target "https://your-app.vercel.app"
```

## Interpreting Results

### Expected Results (Secure Application)

**Rate Limiting Test:**
- ✅ PASS: Some requests should be blocked (429 status)
- Expected: ~100 requests succeed, ~50 blocked
- Note: Will fail until Week 4 Arcjet integration is complete

**SQL Injection Test:**
- ✅ PASS: All payloads should be blocked or sanitized
- Expected: 0 vulnerabilities detected
- Status: Should pass with current email validation

**XSS Test:**
- ✅ PASS: All payloads should be blocked or sanitized
- Expected: 0 vulnerabilities detected
- Status: Should pass with CSP headers configured

### Failed Tests

If tests fail, refer to the AI Protector Workshop roadmap:

- **Rate Limiting Failures**: Complete Week 4 - Arcjet WAF Integration
- **SQL Injection Vulnerabilities**: Review input validation in API routes
- **XSS Vulnerabilities**: Check CSP headers and input sanitization

## Workshop Integration

### Week 5 Requirements
These tests fulfill the Week 5 "Kali Linux Penetration Testing Sprint" requirements:
1. ✅ Penetration testing scripts created
2. ✅ Rate limiting evaluation
3. ✅ SQL injection testing
4. ✅ XSS testing
5. ✅ Automated test execution

### Documentation
Results from these tests should be documented in:
- Security dashboard (`/security` and `/dashboard/security`)
- Implementation roadmap (`docs/IMPLEMENTATION-ROADMAP.md`)
- Security notes (`docs/SECURITY-NOTES.md`)

## Security Best Practices

1. **Never run these tests against production systems you don't own**
2. **Always get permission before testing**
3. **Rate limiting tests may trigger security alerts**
4. **Document all findings**
5. **Implement fixes for discovered vulnerabilities**

## Troubleshooting

### PowerShell Execution Policy
If you get an execution policy error:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Network Errors
- Verify the target URL is correct
- Check if the application is running
- Ensure firewall allows connections
- Try increasing timeout values

### Test Hangs or Freezes
- Reduce `RequestCount` parameter
- Increase `DelayMs` parameter
- Check application logs for errors

## Advanced Usage

### Custom Test Parameters
```powershell
# Aggressive rate limit test
.\rate-limit-test.ps1 -RequestCount 300 -DelayMs 50

# Test production deployment
.\xss-test.ps1 -Target "https://your-production-url.vercel.app"
```

### Combining with CI/CD
These scripts can be integrated into CI/CD pipelines:
```powershell
# Example: GitHub Actions or Azure DevOps
.\run-all-tests.ps1 -Target $env:DEPLOYMENT_URL
if ($LASTEXITCODE -ne 0) { exit 1 }
```

## Next Steps

After completing Week 5 testing:
1. Document all findings
2. Complete Week 4 Arcjet integration if rate limiting failed
3. Fix any identified vulnerabilities
4. Move to Week 6-8: OAuth 2.1 MCP implementation
5. Continue to Week 9: Security monitoring and reporting

## Support

For issues or questions:
- Review the AI Protector Workshop documentation
- Check the security dashboard at `/security`
- Review implementation roadmap at `docs/IMPLEMENTATION-ROADMAP.md`

---

**AI Protector Workshop - Week 5: Penetration Testing Sprint**  
Last Updated: $(Get-Date -Format 'yyyy-MM-dd')
