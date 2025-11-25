# AI Protector Workshop - Week 5 XSS Testing
# PowerShell script for testing Cross-Site Scripting protection

param(
    [Parameter(Mandatory=$false)]
    [string]$Target = "http://localhost:3000"
)

Write-Host "================================" -ForegroundColor Cyan
Write-Host "AI Protector - XSS Test" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Target: $Target" -ForegroundColor Yellow
Write-Host ""

$endpoint = "$Target/api/newsletter"

# Common XSS payloads
$payloads = @(
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "<svg/onload=alert('XSS')>",
    "javascript:alert('XSS')",
    "<iframe src='javascript:alert(1)'>",
    "<body onload=alert('XSS')>",
    "<input onfocus=alert('XSS') autofocus>",
    "<select onfocus=alert('XSS') autofocus>",
    "<textarea onfocus=alert('XSS') autofocus>",
    "';alert(String.fromCharCode(88,83,83))//'"
)

$vulnerabilities = 0
$blocked = 0
$errors = 0

Write-Host "Testing XSS payloads..." -ForegroundColor Green
Write-Host ""

foreach ($payload in $payloads) {
    try {
        # Encode payload for URL
        $encodedPayload = [System.Web.HttpUtility]::UrlEncode($payload)
        
        $body = @{
            email = "${payload}@test.com"
        } | ConvertTo-Json

        Write-Host "Testing: $($payload.Substring(0, [Math]::Min(50, $payload.Length)))..." -ForegroundColor Yellow

        $response = Invoke-WebRequest -Uri $endpoint `
            -Method POST `
            -Body $body `
            -ContentType "application/json" `
            -TimeoutSec 5 `
            -ErrorAction Stop

        if ($response.StatusCode -eq 201 -or $response.StatusCode -eq 200) {
            # Check if response contains unsanitized payload
            if ($response.Content -match [regex]::Escape($payload)) {
                $vulnerabilities++
                Write-Host "  ⚠ VULNERABILITY: XSS payload reflected (${response.StatusCode})" -ForegroundColor Red
            } else {
                Write-Host "  ✓ Sanitized: Payload accepted but sanitized (${response.StatusCode})" -ForegroundColor Green
            }
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
Write-Host "XSS Test Results" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Total Payloads:   $($payloads.Count)" -ForegroundColor White
Write-Host "Vulnerabilities:  $vulnerabilities" -ForegroundColor $(if ($vulnerabilities -gt 0) { "Red" } else { "Green" })
Write-Host "Blocked:          $blocked" -ForegroundColor Green
Write-Host "Errors:           $errors" -ForegroundColor Yellow
Write-Host ""

if ($vulnerabilities -eq 0) {
    Write-Host "✅ PASS: No XSS vulnerabilities detected!" -ForegroundColor Green
    Write-Host "   All payloads were properly validated/sanitized/blocked" -ForegroundColor Green
} else {
    Write-Host "❌ FAIL: Potential XSS vulnerabilities!" -ForegroundColor Red
    Write-Host "   ${vulnerabilities} payloads were reflected without sanitization" -ForegroundColor Red
    Write-Host "   ⚠ Review input sanitization and CSP headers" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Note: CSP headers configured in next.config.mjs provide additional protection" -ForegroundColor Cyan
Write-Host "Test completed at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
