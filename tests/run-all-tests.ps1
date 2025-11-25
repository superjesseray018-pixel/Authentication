# AI Protector Workshop - Week 5 Comprehensive Security Test Suite
# Master script to run all penetration tests

param(
    [Parameter(Mandatory=$false)]
    [string]$Target = "http://localhost:3000"
)

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  AI PROTECTOR SECURITY TEST SUITE" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Target URL: $Target" -ForegroundColor Yellow
Write-Host "Start Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Yellow
Write-Host ""
Write-Host "This suite will run the following tests:" -ForegroundColor White
Write-Host "  1. Rate Limiting Test" -ForegroundColor White
Write-Host "  2. SQL Injection Test" -ForegroundColor White
Write-Host "  3. XSS (Cross-Site Scripting) Test" -ForegroundColor White
Write-Host ""

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path

# Test 1: Rate Limiting
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host "TEST 1: RATE LIMITING" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host ""

& "$scriptPath\rate-limit-test.ps1" -Target $Target -RequestCount 150 -DelayMs 100

Write-Host ""
Write-Host "Press any key to continue to next test..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Test 2: SQL Injection
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host "TEST 2: SQL INJECTION" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host ""

& "$scriptPath\sql-injection-test.ps1" -Target $Target

Write-Host ""
Write-Host "Press any key to continue to next test..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Test 3: XSS
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host "TEST 3: CROSS-SITE SCRIPTING (XSS)" -ForegroundColor Magenta
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Magenta
Write-Host ""

& "$scriptPath\xss-test.ps1" -Target $Target

# Summary
Write-Host ""
Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  TEST SUITE COMPLETE" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "All penetration tests have been completed." -ForegroundColor Green
Write-Host "Review the results above to identify any security vulnerabilities." -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  • If rate limiting test failed, complete Week 4 Arcjet integration" -ForegroundColor White
Write-Host "  • Review any identified vulnerabilities" -ForegroundColor White
Write-Host "  • Document findings in security report" -ForegroundColor White
Write-Host "  • Implement remediations as needed" -ForegroundColor White
Write-Host ""
Write-Host "End Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Yellow
Write-Host ""
