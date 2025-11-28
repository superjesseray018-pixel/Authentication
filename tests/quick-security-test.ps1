# Quick Security Test for Deployed Portfolio App
# Run this from PowerShell on Windows

param(
    [string]$TargetUrl = "https://portfolio-app-with-authentication-owdjtrive.vercel.app"
)

Write-Host "`n===========================================" -ForegroundColor Cyan
Write-Host "  QUICK SECURITY TEST SUITE" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "Target: $TargetUrl`n" -ForegroundColor Yellow

# Test 1: Check if site is accessible
Write-Host "[TEST 1] Site Accessibility" -ForegroundColor Magenta
try {
    $response = Invoke-WebRequest -Uri $TargetUrl -UseBasicParsing
    Write-Host "[PASS] Site is accessible (Status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] Site is not accessible: $_" -ForegroundColor Red
}

# Test 2: Security Headers
Write-Host "`n[TEST 2] Security Headers Check" -ForegroundColor Magenta
try {
    $response = Invoke-WebRequest -Uri $TargetUrl -Method Head -UseBasicParsing
    
    $headers = @{
        'Strict-Transport-Security' = $response.Headers['Strict-Transport-Security']
        'X-Frame-Options' = $response.Headers['X-Frame-Options']
        'X-Content-Type-Options' = $response.Headers['X-Content-Type-Options']
        'Content-Security-Policy' = $response.Headers['Content-Security-Policy']
    }
    
    $found = 0
    foreach ($h in $headers.Keys) {
        $headerValue = $headers[$h]
        if ($headerValue) {
            Write-Host "[PASS] ${h} is present" -ForegroundColor Green
            $found++
        } else {
            Write-Host "[FAIL] ${h} is missing" -ForegroundColor Red
        }
    }
    
    Write-Host "Score: $found/4 security headers" -ForegroundColor Cyan
} catch {
    Write-Host "[ERROR] Could not check headers: $_" -ForegroundColor Red
}

# Test 3: Rate Limiting (Quick Test - 20 requests)
Write-Host "`n[TEST 3] Rate Limiting (20 requests)" -ForegroundColor Magenta
$success = 0
$rateLimited = 0

for ($i = 1; $i -le 20; $i++) {
    try {
        $body = @{ email = "test$i@example.com" } | ConvertTo-Json
        $r = Invoke-WebRequest -Uri "$TargetUrl/api/newsletter" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
        $success++
    } catch {
        if ($_.Exception.Response.StatusCode.value__ -eq 429) {
            $rateLimited++
        }
    }
    Start-Sleep -Milliseconds 50
}

Write-Host "Success: $success | Rate Limited (429): $rateLimited" -ForegroundColor White
if ($rateLimited -gt 0) {
    Write-Host "[PASS] Rate limiting detected" -ForegroundColor Green
} else {
    Write-Host "[INFO] No rate limiting in first 20 requests (may need 100+)" -ForegroundColor Yellow
}

# Test 4: SQL Injection Protection
Write-Host "`n[TEST 4] SQL Injection Protection" -ForegroundColor Magenta
$sqlPayload = "' OR '1'='1@test.com"
try {
    $body = @{ email = $sqlPayload } | ConvertTo-Json
    $r = Invoke-WebRequest -Uri "$TargetUrl/api/newsletter" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host "[WARN] SQL payload accepted (Status: $($r.StatusCode)) - May need review" -ForegroundColor Yellow
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    Write-Host "[PASS] SQL injection blocked (Status: $code)" -ForegroundColor Green
}

# Test 5: XSS Protection
Write-Host "`n[TEST 5] XSS Protection" -ForegroundColor Magenta
$xssPayload = "<script>alert('XSS')</script>@test.com"
try {
    $body = @{ email = $xssPayload } | ConvertTo-Json
    $r = Invoke-WebRequest -Uri "$TargetUrl/api/newsletter" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host "[WARN] XSS payload accepted (Status: $($r.StatusCode)) - May be sanitized" -ForegroundColor Yellow
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    Write-Host "[PASS] XSS payload blocked (Status: $code)" -ForegroundColor Green
}

# Test 6: Protected Routes
Write-Host "`n[TEST 6] Protected Routes" -ForegroundColor Magenta
$protectedRoutes = @('/dashboard', '/admin', '/api/monitoring')
foreach ($route in $protectedRoutes) {
    try {
        $r = Invoke-WebRequest -Uri "$TargetUrl$route" -UseBasicParsing -ErrorAction Stop
        Write-Host "[WARN] $route is accessible without auth" -ForegroundColor Yellow
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        if ($code -eq 401 -or $code -eq 403 -or $code -eq 307) {
            Write-Host "[PASS] $route is protected (Status: $code)" -ForegroundColor Green
        }
    }
}

Write-Host "`n===========================================" -ForegroundColor Cyan
Write-Host "  QUICK TEST COMPLETE" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host "`nFor comprehensive testing, use Kali Linux with:" -ForegroundColor White
Write-Host "  ./tests/kali-pentest-suite.sh`n" -ForegroundColor Cyan