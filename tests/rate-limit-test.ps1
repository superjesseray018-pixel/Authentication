# AI Protector Workshop - Week 5 Penetration Testing Scripts
# PowerShell script for testing rate limiting and security controls

param(
    [Parameter(Mandatory=$false)]
    [string]$Target = "http://localhost:3000",
    
    [Parameter(Mandatory=$false)]
    [int]$RequestCount = 150,
    
    [Parameter(Mandatory=$false)]
    [int]$DelayMs = 100
)

Write-Host "================================" -ForegroundColor Cyan
Write-Host "AI Protector - Rate Limit Test" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Target: $Target" -ForegroundColor Yellow
Write-Host "Requests: $RequestCount" -ForegroundColor Yellow
Write-Host "Delay: ${DelayMs}ms" -ForegroundColor Yellow
Write-Host ""

$endpoint = "$Target/api/newsletter"
$success = 0
$blocked = 0
$errors = 0

Write-Host "Starting rate limit test..." -ForegroundColor Green
Write-Host ""

for ($i = 1; $i -le $RequestCount; $i++) {
    try {
        $body = @{
            email = "test${i}@example.com"
        } | ConvertTo-Json

        $response = Invoke-WebRequest -Uri $endpoint `
            -Method POST `
            -Body $body `
            -ContentType "application/json" `
            -TimeoutSec 5 `
            -ErrorAction Stop

        if ($response.StatusCode -eq 201 -or $response.StatusCode -eq 200) {
            $success++
            Write-Host "[$i/$RequestCount] ✓ Success (${response.StatusCode})" -ForegroundColor Green
        }
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.Value__
        
        if ($statusCode -eq 429) {
            $blocked++
            Write-Host "[$i/$RequestCount] ⚠ Rate Limited (429)" -ForegroundColor Red
        }
        elseif ($statusCode -eq 403) {
            $blocked++
            Write-Host "[$i/$RequestCount] 🛡 Blocked by WAF (403)" -ForegroundColor Red
        }
        else {
            $errors++
            Write-Host "[$i/$RequestCount] ✗ Error ($statusCode)" -ForegroundColor Yellow
        }
    }

    Start-Sleep -Milliseconds $DelayMs
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Test Results Summary" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Total Requests:  $RequestCount" -ForegroundColor White
Write-Host "Successful:      $success" -ForegroundColor Green
Write-Host "Blocked/Limited: $blocked" -ForegroundColor Red
Write-Host "Errors:          $errors" -ForegroundColor Yellow
Write-Host ""

# Determine if rate limiting is working
if ($blocked -gt 0) {
    Write-Host "✅ PASS: Rate limiting is active!" -ForegroundColor Green
    Write-Host "   ${blocked} requests were blocked/rate-limited" -ForegroundColor Green
} else {
    Write-Host "❌ FAIL: No rate limiting detected!" -ForegroundColor Red
    Write-Host "   All ${success} requests succeeded" -ForegroundColor Red
    Write-Host "   ⚠ Week 4 Arcjet integration required" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Test completed at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
