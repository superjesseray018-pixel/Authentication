# Kali Linux Penetration Testing Setup Guide

## Option 1: Windows Subsystem for Linux (WSL) - Recommended

### Step 1: Install WSL and Kali Linux

```powershell
# Run in PowerShell as Administrator

# Install WSL
wsl --install

# Install Kali Linux
wsl --install -d kali-linux

# Or download from Microsoft Store:
# Search for "Kali Linux" in Microsoft Store and install
```

### Step 2: Start Kali Linux

```powershell
# Start Kali Linux
wsl -d kali-linux

# Or just type:
kali
```

### Step 3: Update Kali and Install Tools

```bash
# In Kali Linux terminal

# Update package lists
sudo apt update && sudo apt upgrade -y

# Install essential penetration testing tools
sudo apt install -y kali-tools-top10

# Install individual tools
sudo apt install -y \
    nmap \
    nikto \
    sqlmap \
    zaproxy \
    curl \
    wget \
    git \
    whatweb \
    testssl.sh \
    gobuster \
    hydra

# Verify installations
nmap --version
nikto -Version
sqlmap --version
```

---

## Option 2: VirtualBox Virtual Machine

### Step 1: Download Kali Linux

1. Go to https://www.kali.org/get-kali/
2. Download the VirtualBox image (`.ova` file)
3. Download VirtualBox from https://www.virtualbox.org/

### Step 2: Import VM

1. Open VirtualBox
2. File → Import Appliance
3. Select the downloaded `.ova` file
4. Click Import and wait
5. Start the VM

### Step 3: Login

- **Username**: `kali`
- **Password**: `kali`

---

## Running the Penetration Tests

### Method 1: Run the Comprehensive Test Suite

```bash
# Navigate to the tests directory
cd /mnt/c/Users/roque/Downloads/portfolio-app-with-authentication\ \(2\)/portfolio-app-with-authentication/tests

# Make the script executable
chmod +x kali-pentest-suite.sh

# Run against production
./kali-pentest-suite.sh https://portfolio-app-with-authentication-756m80c9a.vercel.app

# Or run against localhost (if running locally)
./kali-pentest-suite.sh http://localhost:3000
```

### Method 2: Run Individual Tests

#### DNS Enumeration
```bash
TARGET="portfolio-app-with-authentication-756m80c9a.vercel.app"

# DNS lookup
dig $TARGET ANY +noall +answer
nslookup $TARGET

# Reverse DNS
dig -x $TARGET
```

#### Port Scanning with Nmap
```bash
# Quick scan of common ports
nmap -sV -sC -p 80,443 portfolio-app-with-authentication-756m80c9a.vercel.app

# Comprehensive scan (takes longer)
nmap -sV -sC -p- portfolio-app-with-authentication-756m80c9a.vercel.app

# Scan for SSL/TLS vulnerabilities
nmap --script ssl-enum-ciphers -p 443 portfolio-app-with-authentication-756m80c9a.vercel.app
```

#### Web Server Scanning with Nikto
```bash
nikto -h https://portfolio-app-with-authentication-756m80c9a.vercel.app -ssl
```

#### Technology Detection
```bash
whatweb -v https://portfolio-app-with-authentication-756m80c9a.vercel.app
```

#### SSL/TLS Analysis
```bash
testssl.sh --fast https://portfolio-app-with-authentication-756m80c9a.vercel.app
```

#### Directory Brute-forcing (Use Carefully)
```bash
gobuster dir \
    -u https://portfolio-app-with-authentication-756m80c9a.vercel.app \
    -w /usr/share/wordlists/dirb/common.txt \
    -t 50
```

#### SQL Injection Testing with SQLMap
```bash
# Test the newsletter endpoint
sqlmap -u "https://portfolio-app-with-authentication-756m80c9a.vercel.app/api/newsletter" \
    --data='{"email":"test@example.com"}' \
    --method POST \
    --headers="Content-Type: application/json" \
    --level=2 \
    --risk=2 \
    --batch
```

#### Rate Limiting Test
```bash
# Using curl in a loop
for i in {1..150}; do
    curl -s -o /dev/null -w "Request $i: %{http_code}\n" \
        -X POST https://portfolio-app-with-authentication-756m80c9a.vercel.app/api/newsletter \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"test$i@example.com\"}"
    sleep 0.1
done
```

---

## OWASP ZAP (Zed Attack Proxy)

### Install and Run ZAP

```bash
# Install ZAP
sudo apt install -y zaproxy

# Start ZAP GUI
zaproxy

# Or start in daemon mode
zaproxy -daemon -host 0.0.0.0 -port 8080
```

### Quick Scan with ZAP CLI

```bash
# Install ZAP CLI
pip3 install zapcli

# Start ZAP daemon
zaproxy -daemon -host 0.0.0.0 -port 8080 -config api.disablekey=true &

# Wait for ZAP to start
sleep 10

# Run quick scan
zap-cli quick-scan --self-contained \
    -sc https://portfolio-app-with-authentication-756m80c9a.vercel.app

# Generate HTML report
zap-cli report -o zap-report.html -f html
```

---

## Security Testing Checklist

### ✅ Reconnaissance
- [ ] DNS enumeration completed
- [ ] Port scanning completed
- [ ] Technology detection completed
- [ ] SSL/TLS configuration analyzed

### ✅ Vulnerability Scanning
- [ ] Nikto web server scan completed
- [ ] OWASP ZAP automated scan completed
- [ ] Directory brute-forcing completed (optional)

### ✅ Authentication Testing
- [ ] Rate limiting tested
- [ ] Brute force protection verified
- [ ] Session management reviewed

### ✅ Injection Testing
- [ ] SQL injection tests completed
- [ ] XSS payloads tested
- [ ] Command injection tests completed (if applicable)

### ✅ Security Headers
- [ ] HSTS verified
- [ ] CSP verified
- [ ] X-Frame-Options verified
- [ ] X-Content-Type-Options verified
- [ ] All security headers present

---

## Expected Results for Your Application

### ✅ What Should PASS

1. **Rate Limiting**: After ~100 requests, should receive 429 errors
2. **SQL Injection**: All payloads should be blocked (401/403/400)
3. **XSS**: Payloads should be sanitized or rejected
4. **Security Headers**: All 7+ headers should be present
5. **Authentication**: Unauthenticated requests to protected routes should return 401
6. **Bot Detection**: Malicious bots should be blocked (403)

### ⚠️ What Might FAIL (Expected)

1. **Directory Brute-forcing**: May find public routes (this is normal)
2. **Some Nikto warnings**: May report minor issues (review individually)

---

## Creating a Penetration Testing Report

After running tests, create a report with:

1. **Executive Summary**
   - Testing date and duration
   - Scope (your portfolio URL)
   - Key findings summary

2. **Methodology**
   - Tools used (Nmap, Nikto, SQLMap, etc.)
   - Testing approach
   - Timeline

3. **Findings**
   - For each vulnerability:
     - Severity (Critical/High/Medium/Low)
     - Description
     - Proof of concept
     - Remediation

4. **Test Results**
   - Rate limiting: PASS/FAIL
   - SQL injection: PASS/FAIL
   - XSS protection: PASS/FAIL
   - Security headers: X/7 present

5. **Recommendations**
   - Prioritized fix list
   - Long-term security improvements

---

## Troubleshooting

### WSL Issues

```powershell
# Check WSL version
wsl --version

# Update WSL
wsl --update

# Restart WSL
wsl --shutdown
wsl -d kali-linux
```

### Permission Issues

```bash
# If you get permission errors, use sudo
sudo nmap ...
sudo nikto ...
```

### Tool Not Found

```bash
# Update package list
sudo apt update

# Search for tool
apt search <tool-name>

# Install tool
sudo apt install <tool-name>
```

---

## Legal and Ethical Considerations

⚠️ **IMPORTANT**: Only test applications you own or have explicit permission to test.

- ✅ **Your own portfolio**: AUTHORIZED
- ✅ **Localhost development**: AUTHORIZED
- ❌ **Other people's websites**: UNAUTHORIZED (illegal)
- ❌ **Production systems without permission**: UNAUTHORIZED

---

## Next Steps

After completing Kali Linux penetration testing:

1. ✅ Review all test results
2. ✅ Document findings in security report
3. ✅ Fix any high-priority vulnerabilities
4. ✅ Re-test after fixes
5. ✅ Move to Week 10: Final integration and documentation

---

**Week 5 Deliverable**: Penetration Testing Playbook  
**Status**: Ready to execute  
**Estimated Time**: 2-3 hours for complete testing
