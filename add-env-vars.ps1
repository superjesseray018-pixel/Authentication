# Add Environment Variables to Vercel
# Run this after getting your API keys from Clerk and Arcjet

# Note: You'll need to get these keys first:
# 1. Clerk: https://dashboard.clerk.com → API Keys
# 2. Arcjet: https://app.arcjet.com → Settings → API Keys

Write-Host "🔑 Adding Environment Variables to Vercel..." -ForegroundColor Green

# Add Clerk Keys (You need to replace with your actual keys)
Write-Host "Adding Clerk authentication keys..." -ForegroundColor Yellow
# vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
# vercel env add CLERK_SECRET_KEY production

# Add Arcjet Key  
Write-Host "Adding Arcjet WAF key..." -ForegroundColor Yellow
# vercel env add ARCJET_KEY production

# Add Admin User IDs (optional - add after first signup)
Write-Host "Adding admin configuration..." -ForegroundColor Yellow  
# vercel env add ADMIN_USER_IDS production

# Add Node environment
Write-Host "Setting production environment..." -ForegroundColor Yellow
# vercel env add NODE_ENV production

Write-Host "⚠️  IMPORTANT: Uncomment and run the vercel env add commands above" -ForegroundColor Red
Write-Host "   after getting your API keys from Clerk and Arcjet dashboards." -ForegroundColor Red
Write-Host ""
Write-Host "📋 Steps to complete deployment:" -ForegroundColor Cyan
Write-Host "1. Get Clerk keys: https://dashboard.clerk.com" -ForegroundColor White
Write-Host "2. Get Arcjet key: https://app.arcjet.com" -ForegroundColor White  
Write-Host "3. Uncomment lines in this script" -ForegroundColor White
Write-Host "4. Run: .\add-env-vars.ps1" -ForegroundColor White
Write-Host "5. Redeploy: vercel --prod" -ForegroundColor White