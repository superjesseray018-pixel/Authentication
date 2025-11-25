# Push to GitHub using Personal Access Token
# Replace YOUR_TOKEN_HERE with the actual token from superjesseray018-pixel account

$token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
$tokenPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token))

git push https://$tokenPlain@github.com/superjesseray018-pixel/Authentication.git main

Write-Host "✓ Code pushed to GitHub successfully!" -ForegroundColor Green
