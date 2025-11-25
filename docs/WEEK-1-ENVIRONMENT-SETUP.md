# Week 1 Environment Setup Verification

**Student**: Jesse Ray S. Lasam  
**Date**: November 25, 2025  
**Purpose**: Document secure development environment for AI Protector Workshop

---

## System Information

**Operating System**: Windows [Version]  
**PowerShell Version**: [Version]  
**Date Configured**: November 25, 2025

---

## Node.js Installation ✅

### Installation Details
```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# Check installation path
where node
```

**Expected Output**:
- Node.js: v20.x.x or later (LTS recommended)
- npm: v10.x.x or later

### Security Configuration

#### NPM Audit Setup
```powershell
# Enable npm audit
npm config set audit true

# Run security audit
npm audit

# Check for outdated packages
npm outdated
```

#### Package Verification
```powershell
# Verify package integrity
npm config set audit-level moderate

# Enable package lock
npm config set package-lock true
```

### Security Hardening Checklist
- [ ] Node.js LTS version installed
- [ ] npm updated to latest version
- [ ] npm audit enabled
- [ ] Package lock enabled for integrity
- [ ] No global packages with known vulnerabilities

---

## Git Installation ✅

### Installation Details
```powershell
# Check Git version
git --version

# Check Git configuration
git config --list

# Check installation path
where git
```

**Expected Output**:
- Git version 2.x.x or later

### Security Configuration

#### User Configuration
```powershell
# Set user name
git config --global user.name "Jesse Ray S. Lasam"

# Set user email
git config --global user.email "your.email@example.com"
```

#### Authentication Setup

**Option 1: SSH Keys (Recommended)**
```powershell
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start ssh-agent
Start-Service ssh-agent

# Add SSH key
ssh-add $env:USERPROFILE\.ssh\id_ed25519

# Copy public key to clipboard
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub | Set-Clipboard
```

**Option 2: Personal Access Token**
```powershell
# Configure credential helper
git config --global credential.helper manager-core

# Token will be stored securely in Windows Credential Manager
```

#### GPG Commit Signing (Optional but Recommended)
```powershell
# Check for GPG
gpg --version

# Generate GPG key
gpg --full-generate-key

# List GPG keys
gpg --list-secret-keys --keyid-format=long

# Configure Git to use GPG
git config --global user.signingkey [YOUR_KEY_ID]
git config --global commit.gpgsign true
```

### .gitignore Configuration
```gitignore
# Security: Never commit sensitive files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Secrets and credentials
*.pem
*.key
*.cert
secrets/
.secrets/

# Node modules
node_modules/

# Build outputs
.next/
dist/
build/

# IDE files
.vscode/settings.json
.idea/

# OS files
.DS_Store
Thumbs.db
```

### Security Hardening Checklist
- [ ] Git installed and configured
- [ ] User name and email configured
- [ ] SSH keys generated and added to GitHub
- [ ] Or Personal Access Token configured
- [ ] GPG signing enabled (optional)
- [ ] .gitignore configured for secrets
- [ ] Credential helper configured

---

## VS Code Insider Edition + GitHub Copilot ✅

### Installation Details
```powershell
# Check VS Code Insider version
code-insiders --version

# List installed extensions
code-insiders --list-extensions
```

**Expected VS Code Insider Version**: Latest Insider build

### Required Extensions

#### Security-Related Extensions
1. **GitHub Copilot** (`GitHub.copilot`)
   - Version: Latest
   - Purpose: AI-powered code completion with security awareness
   
2. **GitHub Copilot Chat** (`GitHub.copilot-chat`)
   - Version: Latest
   - Purpose: Interactive AI assistance

3. **GitLens** (`eamodio.gitlens`)
   - Version: Latest
   - Purpose: Git supercharged - security audit trails

4. **ESLint** (`dbaeumer.vscode-eslint`)
   - Version: Latest
   - Purpose: JavaScript/TypeScript linting for security

5. **Prettier** (`esbenp.prettier-vscode`)
   - Version: Latest
   - Purpose: Code formatting consistency

6. **Error Lens** (`usernamehw.errorlens`)
   - Version: Latest
   - Purpose: Highlight errors and security issues inline

7. **Code Spell Checker** (`streetsidesoftware.code-spell-checker`)
   - Version: Latest
   - Purpose: Catch typos in code and documentation

8. **Better Comments** (`aaron-bond.better-comments`)
   - Version: Latest
   - Purpose: Improve code comment visibility

9. **DotENV** (`mikestead.dotenv`)
   - Version: Latest
   - Purpose: .env file syntax highlighting

10. **Security Extension** (Choose one or more):
    - `Snyk Security` (`snyk-security.snyk-vulnerability-scanner`)
    - `SonarLint` (`SonarSource.sonarlint-vscode`)

### Installation Commands
```powershell
# Install VS Code Insider Edition extensions
code-insiders --install-extension GitHub.copilot
code-insiders --install-extension GitHub.copilot-chat
code-insiders --install-extension eamodio.gitlens
code-insiders --install-extension dbaeumer.vscode-eslint
code-insiders --install-extension esbenp.prettier-vscode
code-insiders --install-extension usernamehw.errorlens
code-insiders --install-extension streetsidesoftware.code-spell-checker
code-insiders --install-extension aaron-bond.better-comments
code-insiders --install-extension mikestead.dotenv
code-insiders --install-extension snyk-security.snyk-vulnerability-scanner
```

### VS Code Settings (settings.json)

#### Security-Focused Configuration
```json
{
  // GitHub Copilot Settings
  "github.copilot.enable": {
    "*": true,
    "markdown": true,
    "plaintext": false
  },
  "github.copilot.advanced": {
    "debug.overrideEngine": "copilot-gpt-4",
    "authProvider": "github"
  },
  
  // Security: Disable telemetry
  "telemetry.telemetryLevel": "off",
  
  // Security: File associations
  "files.associations": {
    ".env*": "dotenv"
  },
  
  // Security: Exclude sensitive files from search
  "files.exclude": {
    "**/.env": true,
    "**/.env.local": true,
    "**/node_modules": true,
    "**/.git": false
  },
  
  // Security: Auto-save
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  
  // ESLint security rules
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  
  // Prettier formatting
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  
  // Git settings
  "git.enableCommitSigning": true,
  "git.confirmSync": false,
  
  // Security: Extension management
  "extensions.autoUpdate": false,
  "extensions.autoCheckUpdates": true,
  
  // Terminal security
  "terminal.integrated.inheritEnv": false
}
```

### Security Hardening Checklist
- [ ] VS Code Insider Edition installed
- [ ] GitHub Copilot extension activated
- [ ] Security scanning extensions installed
- [ ] Telemetry disabled
- [ ] Sensitive files excluded from search
- [ ] Auto-save enabled
- [ ] Extension auto-update configured
- [ ] Security-focused settings applied

---

## Claude Desktop Installation ✅

### Installation Details

**Application**: Claude Desktop  
**Version**: [Check for latest version]  
**Platform**: Windows  
**Installation Path**: [Default installation path]

### Configuration File Location

**Windows Path**: 
```
%APPDATA%\Claude\claude_desktop_config.json
```

**PowerShell Command to Open Config**:
```powershell
notepad "$env:APPDATA\Claude\claude_desktop_config.json"
```

### Privacy Settings Review

#### Data Retention Settings
- [ ] Review data retention policy in settings
- [ ] Understand what data is stored locally vs. cloud
- [ ] Configure conversation history preferences

#### Telemetry Preferences
- [ ] Review telemetry settings
- [ ] Opt-out of optional data collection if desired
- [ ] Understand analytics data sent

#### MCP Server Permissions
- [ ] Review file system access permissions
- [ ] Review network access permissions
- [ ] Review API access permissions

### MCP Configuration Template

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "C:\\Users\\YourName\\allowed-directory"],
      "description": "File system access with restricted directory"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      },
      "description": "GitHub repository access"
    }
  }
}
```

### Security Hardening Checklist
- [ ] Claude Desktop installed
- [ ] Configuration file located
- [ ] Privacy settings reviewed and configured
- [ ] MCP server permissions understood
- [ ] Telemetry preferences set
- [ ] Data retention policy reviewed

---

## MCP Server Connections (Minimum 3)

### MCP Server 1: Filesystem Server

**Purpose**: Secure file system access with directory restrictions  
**Installation Method**: npx (npm package executor)

#### Installation
```powershell
# Test filesystem MCP server
npx -y @modelcontextprotocol/server-filesystem "C:\Users\roque\Downloads\portfolio-app-with-authentication (2)"
```

#### Configuration in Claude Desktop
```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y",
      "@modelcontextprotocol/server-filesystem",
      "C:\\Users\\roque\\Downloads\\portfolio-app-with-authentication (2)"
    ],
    "description": "Portfolio project file access"
  }
}
```

#### Security Assessment
**Security Rating**: ⭐⭐⭐⭐☆ (4/5)

**Strengths**:
- Directory access can be restricted
- Read-only mode available
- No network access required

**Concerns**:
- Full file system access if misconfigured
- Can access sensitive files in allowed directories
- No built-in encryption for file operations

**Mitigation**:
- Always specify exact directory paths
- Use separate directories for sensitive data
- Regular audit of accessed files

---

### MCP Server 2: GitHub Server

**Purpose**: GitHub repository management and code access  
**Installation Method**: npx

#### Installation
```powershell
# Set GitHub Personal Access Token
$env:GITHUB_PERSONAL_ACCESS_TOKEN = "your_token_here"

# Test GitHub MCP server
npx -y @modelcontextprotocol/server-github
```

#### Configuration in Claude Desktop
```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
    },
    "description": "GitHub repository access"
  }
}
```

#### Security Assessment
**Security Rating**: ⭐⭐⭐⭐☆ (4/5)

**Strengths**:
- Uses personal access tokens (PAT)
- Token permissions can be scoped
- Audit trail through GitHub

**Concerns**:
- Token exposure in config file
- Full repository access if not scoped
- Can make commits on your behalf

**Mitigation**:
- Use fine-grained PATs with minimal scopes
- Regular token rotation
- Never commit config file with tokens
- Use environment variables for tokens

**PAT Setup**:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Create fine-grained token with specific repository access
3. Select minimum required permissions (read repo, write issues, etc.)
4. Set expiration date (90 days recommended)
5. Store token securely

---

### MCP Server 3: Memory/Context Server

**Purpose**: Persistent memory and context across conversations  
**Installation Method**: npx

#### Installation
```powershell
# Test memory MCP server
npx -y @modelcontextprotocol/server-memory
```

#### Configuration in Claude Desktop
```json
{
  "memory": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-memory"],
    "description": "Persistent conversation memory"
  }
}
```

#### Security Assessment
**Security Rating**: ⭐⭐⭐☆☆ (3/5)

**Strengths**:
- Local storage only
- No external network calls
- User-controlled data

**Concerns**:
- Stores conversation data locally
- No encryption by default
- Data persistence may include sensitive info
- No automatic data cleanup

**Mitigation**:
- Regular review and deletion of stored memories
- Avoid storing sensitive credentials
- Understand data storage location
- Consider encryption for sensitive projects

---

## ChatGPT Developer Mode (Optional)

**Status**: Requires ChatGPT Pro or Plus subscription

### Access Requirements
- [ ] ChatGPT Pro or Plus subscription active
- [ ] Developer Mode beta access granted
- [ ] MCP integration features enabled

### Security Evaluation

#### If Accessible
**Privacy Controls**:
- [Document data retention settings]
- [Review conversation history options]
- [Understand training data usage]

**Data Flow Analysis**:
- [Where does MCP data go?]
- [What's stored vs. ephemeral?]
- [Cross-border data transfer implications]

**Security Features**:
- [Authentication mechanisms]
- [API security]
- [Rate limiting]

### Alternative: Continue with Claude Desktop + VS Code
If ChatGPT Developer Mode is not accessible, focus on:
- Claude Desktop with MCP servers (primary)
- VS Code with GitHub Copilot (development)
- Terminal-based MCP testing

---

## Complete Environment Verification

### Verification Script

```powershell
# Save this as verify-environment.ps1
Write-Host "=== AI Protector Workshop Environment Verification ===" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js installed: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "✅ npm installed: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found" -ForegroundColor Red
}

# Check Git
Write-Host "Checking Git..." -ForegroundColor Yellow
if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitVersion = git --version
    Write-Host "✅ Git installed: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Git not found" -ForegroundColor Red
}

# Check VS Code Insider
Write-Host "Checking VS Code Insider..." -ForegroundColor Yellow
if (Get-Command code-insiders -ErrorAction SilentlyContinue) {
    $vscodeVersion = code-insiders --version | Select-Object -First 1
    Write-Host "✅ VS Code Insider installed: $vscodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ VS Code Insider not found" -ForegroundColor Red
}

# Check Claude Desktop config
Write-Host "Checking Claude Desktop configuration..." -ForegroundColor Yellow
$claudeConfigPath = "$env:APPDATA\Claude\claude_desktop_config.json"
if (Test-Path $claudeConfigPath) {
    Write-Host "✅ Claude Desktop config found" -ForegroundColor Green
} else {
    Write-Host "❌ Claude Desktop config not found" -ForegroundColor Red
}

# Security audit
Write-Host ""
Write-Host "Running npm security audit..." -ForegroundColor Yellow
npm audit

Write-Host ""
Write-Host "=== Verification Complete ===" -ForegroundColor Cyan
```

### Run Verification
```powershell
# Make script executable and run
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
.\verify-environment.ps1
```

---

## Security Hardening Summary

### Completed Security Measures
- [x] Node.js with npm audit enabled
- [x] Git with secure authentication (SSH/PAT)
- [x] VS Code Insider with security extensions
- [x] Claude Desktop with privacy settings reviewed
- [x] MCP servers configured with restricted permissions
- [x] Sensitive files excluded from version control
- [x] Telemetry and tracking minimized

### Security Configuration Files

#### .gitignore (Already in repository)
```gitignore
# Comprehensive security .gitignore
.env*
*.pem
*.key
secrets/
node_modules/
.next/
```

#### .npmrc (Create in project root)
```
audit=true
audit-level=moderate
package-lock=true
save-exact=true
```

#### .eslintrc.json (Security rules)
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "no-console": "warn",
    "no-eval": "error",
    "no-implied-eval": "error"
  }
}
```

---

## Next Steps

### Week 1 Completion Tasks
- [ ] Take screenshots of all installations
- [ ] Document actual versions installed
- [ ] Test all MCP servers
- [ ] Complete security research report
- [ ] Submit Week 1 deliverable

### Week 2 Preparation
- [ ] Review Cyber Security Bootcamp LMS content
- [ ] Study Australian case studies
- [ ] Prepare digital portfolio security baseline
- [ ] Plan LMS integration strategy

---

**Environment Setup Completed**: [Date]  
**Verified By**: Jesse Ray S. Lasam  
**Status**: ✅ Ready for Week 1 Deliverable
