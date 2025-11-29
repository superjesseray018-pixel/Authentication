# Kali Linux Penetration Testing Setup (Oracle VirtualBox)

## 🎯 Overview
This guide will help you set up Kali Linux in Oracle VirtualBox to perform penetration testing on your portfolio application at:
- **Target:** https://portfolio-app-with-authentication-cpq4j1upa.vercel.app

---

## 📋 Prerequisites

### What You'll Need:
- **Oracle VirtualBox** (Latest version)
- **Kali Linux ISO** (2024.x or later)
- **Minimum System Requirements:**
  - 4GB RAM (8GB recommended)
  - 20GB free disk space
  - CPU with virtualization support (VT-x/AMD-V)

---

## 🔧 Step 1: Download Required Software

### A. Download Oracle VirtualBox
1. Go to: https://www.virtualbox.org/wiki/Downloads
2. Download **VirtualBox 7.x** for Windows
3. Download **VirtualBox Extension Pack**
4. Install VirtualBox with default settings

### B. Download Kali Linux
1. Go to: https://www.kali.org/get-kali/#kali-virtual-machines
2. Download **Kali Linux VirtualBox 64-bit** (Pre-built VM)
   - File: `kali-linux-2024.x-virtualbox-amd64.7z`
   - Size: ~3.5GB
3. Extract the `.7z` file using 7-Zip or WinRAR
   - You'll get a `.vbox` file and `.vdi` disk image

**Alternative:** Download the ISO if you want to install from scratch:
- ISO Download: https://www.kali.org/get-kali/#kali-installer-images
- File: `kali-linux-2024.x-installer-amd64.iso`

---

## 🖥️ Step 2: Import Kali Linux into VirtualBox

### Option A: Using Pre-built VM (Recommended - Faster)

1. **Open VirtualBox**
2. Click **File → Import Appliance**
3. Browse to the extracted `.vbox` file
4. Click **Next** → **Import**
5. Wait for import to complete (~5 minutes)

**Default Credentials:**
- Username: `kali`
- Password: `kali`

### Option B: Create New VM from ISO (Custom Setup)

1. **Create New VM:**
   - Click **New**
   - Name: `Kali Linux Pentest`
   - Type: `Linux`
   - Version: `Debian (64-bit)`
   - Click **Next**

2. **Allocate Memory:**
   - Recommended: `4096 MB` (4GB)
   - Minimum: `2048 MB` (2GB)
   - Click **Next**

3. **Create Virtual Hard Disk:**
   - Select **Create a virtual hard disk now**
   - Type: `VDI (VirtualBox Disk Image)`
   - Storage: `Dynamically allocated`
   - Size: `40 GB`
   - Click **Create**

4. **Configure VM Settings:**
   - Select VM → Click **Settings**
   - **System → Processor:** Set to `2 CPUs` (or more)
   - **System → Acceleration:** Enable `VT-x/AMD-V`
   - **Display → Video Memory:** `128 MB`
   - **Network → Adapter 1:** `NAT` (for internet access)
   - **Storage:** Click **Empty** → Choose ISO file
   - Click **OK**

5. **Start VM and Install:**
   - Click **Start**
   - Select **Graphical Install**
   - Follow installation wizard
   - Default password: `kali`

---

## 🌐 Step 3: Network Configuration

### Verify Internet Connection

```bash
# Start Kali Linux and open terminal
ping -c 4 google.com
ping -c 4 portfolio-app-with-authentication-cpq4j1upa.vercel.app
```

**If no internet:**
1. Go to **Settings → Network → Adapter 1**
2. Set to **NAT** or **Bridged Adapter**
3. Restart VM

---

## 🛠️ Step 4: Install Penetration Testing Tools

### Update Kali Linux

```bash
# Open terminal in Kali
sudo apt update
sudo apt upgrade -y
sudo apt dist-upgrade -y
```

### Install Essential Tools

```bash
# Web Application Testing
sudo apt install -y nikto sqlmap dirb gobuster wpscan

# Network Analysis
sudo apt install -y nmap wireshark tcpdump

# SSL/TLS Testing
sudo apt install -y sslscan testssl.sh

# HTTP Clients
sudo apt install -y curl wget httpie

# Fuzzing & Exploitation
sudo apt install -y wfuzz hydra metasploit-framework

# OWASP ZAP (GUI Tool)
sudo apt install -y zaproxy

# Burp Suite Community (Pre-installed in Kali)
```

---

## 🎯 Step 5: Run Your First Penetration Test

### A. Basic Reconnaissance

```bash
# 1. Check if target is reachable
ping -c 4 portfolio-app-with-authentication-cpq4j1upa.vercel.app

# 2. DNS Lookup
nslookup portfolio-app-with-authentication-cpq4j1upa.vercel.app

# 3. Get IP address
host portfolio-app-with-authentication-cpq4j1upa.vercel.app

# 4. Check HTTP headers
curl -I https://portfolio-app-with-authentication-cpq4j1upa.vercel.app
```

### B. Port Scanning with Nmap

```bash
# Basic scan
nmap portfolio-app-with-authentication-cpq4j1upa.vercel.app

# Service detection
nmap -sV portfolio-app-with-authentication-cpq4j1upa.vercel.app

# Aggressive scan (use with caution)
nmap -A portfolio-app-with-authentication-cpq4j1upa.vercel.app
```

### C. Web Vulnerability Scanning

```bash
# Nikto web scanner
nikto -h https://portfolio-app-with-authentication-cpq4j1upa.vercel.app

# SSL/TLS check
sslscan portfolio-app-with-authentication-cpq4j1upa.vercel.app

# Directory enumeration
dirb https://portfolio-app-with-authentication-cpq4j1upa.vercel.app
```

### D. SQL Injection Testing

```bash
# Test newsletter endpoint
sqlmap -u "https://portfolio-app-with-authentication-cpq4j1upa.vercel.app/api/newsletter" \
  --data='{"email":"test@example.com"}' \
  --method=POST \
  --headers="Content-Type: application/json"
```

### E. XSS Testing

```bash
# Test with various payloads
curl -X POST https://portfolio-app-with-authentication-cpq4j1upa.vercel.app/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"<script>alert(\"XSS\")</script>"}'

curl -X POST https://portfolio-app-with-authentication-cpq4j1upa.vercel.app/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com\"><img src=x onerror=alert(1)>"}'
```

### F. Rate Limiting Test

```bash
# Send multiple requests rapidly
for i in {1..50}; do
  curl -X POST https://portfolio-app-with-authentication-cpq4j1upa.vercel.app/api/newsletter \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test$i@example.com\"}" &
done
wait
```

### G. Authentication Bypass Testing

```bash
# Test protected routes without authentication
curl -I https://portfolio-app-with-authentication-cpq4j1upa.vercel.app/security
curl -I https://portfolio-app-with-authentication-cpq4j1upa.vercel.app/testing
curl -I https://portfolio-app-with-authentication-cpq4j1upa.vercel.app/security-plan

# Expected: 302 redirect to /unauthorized
```

---

## 🔍 Step 6: Using GUI Penetration Testing Tools

### A. OWASP ZAP (Zed Attack Proxy)

```bash
# Launch ZAP
zaproxy &
```

**Using ZAP:**
1. Set **Target URL:** `https://portfolio-app-with-authentication-cpq4j1upa.vercel.app`
2. Click **Automated Scan**
3. Select **Attack Mode**
4. Click **Attack**
5. Review results in **Alerts** tab

### B. Burp Suite Community Edition

```bash
# Launch Burp Suite
burpsuite &
```

**Using Burp Suite:**
1. Go to **Proxy → Intercept**
2. Configure browser to use proxy: `127.0.0.1:8080`
3. Browse your portfolio site
4. Intercept and modify requests
5. Use **Intruder** for automated attacks
6. Use **Repeater** to replay requests

---

## 📊 Step 7: Comprehensive Test Script

Save this as `comprehensive-pentest.sh` in Kali:

```bash
#!/bin/bash

# Comprehensive Penetration Test Script
TARGET="portfolio-app-with-authentication-cpq4j1upa.vercel.app"
OUTPUT_DIR="pentest-results-$(date +%Y%m%d-%H%M%S)"

mkdir -p "$OUTPUT_DIR"

echo "=================================="
echo "Penetration Test Started"
echo "Target: $TARGET"
echo "Time: $(date)"
echo "=================================="

# 1. Reconnaissance
echo "[*] Running Reconnaissance..."
nmap -sV "$TARGET" > "$OUTPUT_DIR/nmap-scan.txt"
host "$TARGET" > "$OUTPUT_DIR/dns-lookup.txt"

# 2. SSL/TLS Testing
echo "[*] Testing SSL/TLS..."
sslscan "$TARGET" > "$OUTPUT_DIR/ssl-scan.txt"

# 3. Web Vulnerability Scanning
echo "[*] Running Nikto..."
nikto -h "https://$TARGET" -o "$OUTPUT_DIR/nikto-scan.txt"

# 4. Security Headers Check
echo "[*] Checking Security Headers..."
curl -I "https://$TARGET" > "$OUTPUT_DIR/security-headers.txt"

# 5. SQL Injection Tests
echo "[*] Testing SQL Injection..."
curl -X POST "https://$TARGET/api/newsletter" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com\" OR \"1\"=\"1"}' \
  > "$OUTPUT_DIR/sql-injection-test.txt"

# 6. XSS Tests
echo "[*] Testing XSS..."
curl -X POST "https://$TARGET/api/newsletter" \
  -H "Content-Type: application/json" \
  -d '{"email":"<script>alert(1)</script>"}' \
  > "$OUTPUT_DIR/xss-test.txt"

# 7. Rate Limiting Test
echo "[*] Testing Rate Limiting..."
for i in {1..30}; do
  curl -s -X POST "https://$TARGET/api/newsletter" \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"test$i@example.com\"}" &
done
wait > "$OUTPUT_DIR/rate-limit-test.txt"

# 8. Authentication Bypass Tests
echo "[*] Testing Authentication Bypass..."
curl -I "https://$TARGET/security" > "$OUTPUT_DIR/auth-security.txt"
curl -I "https://$TARGET/testing" > "$OUTPUT_DIR/auth-testing.txt"
curl -I "https://$TARGET/security-plan" > "$OUTPUT_DIR/auth-security-plan.txt"

echo "=================================="
echo "Penetration Test Completed"
echo "Results saved to: $OUTPUT_DIR"
echo "=================================="
```

**Run the script:**

```bash
chmod +x comprehensive-pentest.sh
./comprehensive-pentest.sh
```

---

## 🎓 Best Practices & Tips

### 1. **Legal & Ethical**
- ✅ Only test your own applications
- ✅ You own this portfolio, so you have permission
- ❌ Never test sites you don't own without written permission

### 2. **Rate Limiting Awareness**
- Your Arcjet WAF limits to **100 requests/minute**
- Space out aggressive scans to avoid false positives
- Use `--delay` or `--throttle` flags with tools

### 3. **Test Responsibly**
- Vercel may block aggressive scanning
- Start with passive reconnaissance
- Escalate to active testing gradually

### 4. **Document Everything**
- Save all scan results
- Take screenshots
- Note timestamps
- Record findings for your AI Protector Workshop submission

### 5. **Compare Results**
- Your built-in `/testing` page has automated tests
- Compare Kali results with your web-based tests
- Look for discrepancies

---

## 🔒 Expected Security Posture

Based on your implementation, you should find:

### ✅ Protected (Should Pass):
- **HTTPS Enforcement** - TLS 1.3 encryption
- **Security Headers** - HSTS, CSP, X-Frame-Options, etc.
- **Rate Limiting** - Arcjet blocks after 100 req/min
- **SQL Injection** - Parameterized queries prevent injection
- **XSS Protection** - Input sanitization active
- **Authentication** - Clerk middleware protects routes
- **Bot Detection** - Arcjet blocks automated scanners

### ⚠️ Potential Findings:
- **Information Disclosure** - Stack traces in errors
- **Directory Listing** - Some Next.js endpoints exposed
- **Session Management** - Clerk handles this (should be secure)

---

## 📝 Reporting Your Findings

Create a report with:

1. **Executive Summary**
   - Test date and duration
   - Tools used
   - Overall security rating

2. **Methodology**
   - Reconnaissance techniques
   - Vulnerability scanning approach
   - Exploitation attempts

3. **Findings**
   - List all vulnerabilities (critical → low)
   - Include proof-of-concept screenshots
   - Show request/response examples

4. **Recommendations**
   - How to fix each vulnerability
   - Priority for remediation
   - Long-term security improvements

5. **Conclusion**
   - Summary of security posture
   - Comparison with industry standards
   - Next steps

---

## 🆘 Troubleshooting

### Issue: VM is slow
**Solution:**
- Increase RAM to 4GB+
- Allocate 2+ CPU cores
- Enable 3D acceleration in Display settings

### Issue: No internet in VM
**Solution:**
```bash
# Check network interface
ip addr show

# Restart networking
sudo systemctl restart NetworkManager

# Test connectivity
ping 8.8.8.8
```

### Issue: Tools not working
**Solution:**
```bash
# Update package lists
sudo apt update

# Reinstall specific tool
sudo apt remove <tool-name>
sudo apt install <tool-name>
```

### Issue: Target blocking scans
**Solution:**
- Reduce scan speed: `nmap --scan-delay 1s`
- Use different source IPs (VPN)
- Space out tests over time

---

## 🚀 Advanced Testing (Optional)

### Metasploit Framework
```bash
# Launch Metasploit
msfconsole

# Search for web exploits
search type:exploit platform:web

# Use web scanner
use auxiliary/scanner/http/dir_scanner
set RHOSTS portfolio-app-with-authentication-cpq4j1upa.vercel.app
set RPORT 443
set SSL true
run
```

### Web Application Firewall Detection
```bash
# Detect WAF (Arcjet)
wafw00f https://portfolio-app-with-authentication-cpq4j1upa.vercel.app
```

### Subdomain Enumeration
```bash
# Find subdomains
subfinder -d vercel.app | grep portfolio-app-with-authentication
```

---

## 📚 Additional Resources

- **Kali Linux Documentation:** https://www.kali.org/docs/
- **OWASP Testing Guide:** https://owasp.org/www-project-web-security-testing-guide/
- **HackTheBox:** https://www.hackthebox.com/ (Practice platform)
- **TryHackMe:** https://tryhackme.com/ (Beginner-friendly labs)

---

## ✅ Checklist

Before you start:
- [ ] VirtualBox installed
- [ ] Kali Linux VM imported
- [ ] Internet connection working
- [ ] Tools updated (`sudo apt update`)
- [ ] Target URL confirmed
- [ ] Permission verified (it's your site)
- [ ] Results folder created

---

**Good luck with your penetration testing!** 🔒🐧

Remember: The goal is to find weaknesses in YOUR application to make it more secure, not to cause harm.
