# AI Protector Workshop - Week 5 SQL Injection Testing
# PowerShell script for testing SQL injection protection

param(
    [Parameter(Mandatory=$false)]
    [string]$Target = "http://localhost:3000"
)

Write-Host "================================" -ForegroundColor Cyan
Write-Host "AI Protector - SQL Injection Test" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Target: $Target" -ForegroundColor Yellow
Write-Host ""

$endpoint = "$Target/api/newsletter"

# Common SQL injection payloads
$payloads = @(
    "' OR '1'='1",
    "'; DROP TABLE users--",
    "' UNION SELECT * FROM users--",
    "admin'--",
    "' OR 1=1--",
    "1' OR '1' = '1",
    "' OR 'a'='a",
    "') OR ('1'='1",
    "' UNION SELECT NULL, NULL, NULL--",
    "1' UNION SELECT username, password FROM users--"
)

$vulnerabilities = 0
$blocked = 0
$errors = 0

Write-Host "Testing SQL injection payloads..." -ForegroundColor Green
Write-Host ""

foreach ($payload in $payloads) {
    try {
        $body = @{
            email = "${payload}@test.com"
        } | ConvertTo-Json

        Write-Host "Testing: $payload" -ForegroundColor Yellow

        $response = Invoke-WebRequest -Uri $endpoint `
            -Method POST `
            -Body $body `
            -ContentType "application/json" `
            -TimeoutSec 5 `
            -ErrorAction Stop

        if ($response.StatusCode -eq 201 -or $response.StatusCode -eq 200) {
            $vulnerabilities++
            Write-Host "  ⚠ POTENTIAL VULNERABILITY: Payload accepted (${response.StatusCode})" -ForegroundColor Red
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.Value__
        
        if ($statusCode -eq 400) {
            $blocked++
            Write-Host "  ✓ Blocked: Input validation (400)" -ForegroundColor Green
        }
        elseif ($statusCode -eq 403) {
            $blocked++
            Write-Host "  ✓ Blocked: WAF protection (403)" -ForegroundColor Green
        }
        elseif ($statusCode -eq 429) {
            Write-Host "  ⏸ Rate limited (429) - continuing..." -ForegroundColor Yellow
            Start-Sleep -Seconds 2
        }
        else {
            $errors++
            Write-Host "  ✗ Error: $statusCode" -ForegroundColor Yellow
        }
    }

    Write-Host ""
    Start-Sleep -Milliseconds 500
}

Write-Host "================================" -ForegroundColor Cyan
Write-Host "SQL Injection Test Results" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Total Payloads:   $($payloads.Count)" -ForegroundColor White
Write-Host "Vulnerabilities:  $vulnerabilities" -ForegroundColor $(if ($vulnerabilities -gt 0) { "Red" } else { "Green" })
Write-Host "Blocked:          $blocked" -ForegroundColor Green
Write-Host "Errors:           $errors" -ForegroundColor Yellow
Write-Host ""

if ($vulnerabilities -eq 0) {
    Write-Host "✅ PASS: No SQL injection vulnerabilities detected!" -ForegroundColor Green
    Write-Host "   All payloads were properly validated/blocked" -ForegroundColor Green
} else {
    Write-Host "❌ FAIL: Potential SQL injection vulnerabilities!" -ForegroundColor Red
    Write-Host "   ${vulnerabilities} payloads were accepted" -ForegroundColor Red
    Write-Host "   ⚠ Review input validation and sanitization" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Test completed at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
