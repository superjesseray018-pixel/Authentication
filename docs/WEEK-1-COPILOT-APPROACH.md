# Week 1: GitHub Copilot-Based Approach (No Claude Desktop)

**Student**: Jesse Ray S. Lasam  
**Platform**: GitHub Copilot in VS Code  
**Date**: November 25, 2025

---

## Modified Approach for Week 1

Since you're using **GitHub Copilot in VS Code** instead of Claude Desktop, your Week 1 deliverable will focus on:

1. ✅ **AI Agent Security Analysis** - Research MCP servers theoretically
2. ✅ **Development Environment Setup** - Node.js, Git, VS Code with Copilot
3. ✅ **VS Code GitHub Copilot** as your primary AI assistant platform
4. ✅ **Security research and documentation** using this AI-powered workflow

---

## Your Development Environment (Simplified)

### Core Tools You're Using:

1. **VS Code** (or VS Code Insider)
   - GitHub Copilot extension
   - GitHub Copilot Chat extension
   - Security extensions

2. **Node.js & npm**
   - For running your Next.js portfolio
   - For any security testing scripts

3. **Git & GitHub**
   - Version control
   - GitHub Personal Access Token for automation

4. **PowerShell**
   - Terminal operations
   - Security testing scripts

### What You DON'T Need:
- ❌ Claude Desktop installation
- ❌ Claude Desktop MCP configuration
- ❌ Local MCP server installations
- ❌ ChatGPT Developer Mode

---

## Week 1 Deliverable: Adjusted Requirements

### Section 1: AI Agents (MCP Servers) Security Analysis ✅

**Research 10+ MCP Servers** (theoretical analysis):

#### MCP Servers to Research:

1. **Filesystem MCP Server**
   - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem
   - Security concerns: Unrestricted file access, directory traversal risks

2. **GitHub MCP Server**
   - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/github
   - Security concerns: PAT exposure, repository access scope

3. **PostgreSQL MCP Server**
   - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/postgres
   - Security concerns: Database credentials, SQL injection, data residency

4. **Brave Search MCP Server**
   - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search
   - Security concerns: API key management, search privacy

5. **Google Drive MCP Server**
   - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive
   - Security concerns: OAuth scope, file access permissions

6. **Slack MCP Server**
   - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/slack
   - Security concerns: Workspace token security, message privacy

7. **Puppeteer MCP Server**
   - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer
   - Security concerns: Browser automation risks, XSS potential

8. **Memory MCP Server**
   - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/memory
   - Security concerns: Local data storage, no encryption

9. **Fetch MCP Server**
   - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/fetch
   - Security concerns: SSRF vulnerabilities, unrestricted HTTP requests

10. **SQLite MCP Server**
    - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/sqlite
    - Security concerns: Local database security, file access

11. **Everything MCP Server** (Bonus)
    - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/everything
    - Security concerns: Windows file indexing exposure

12. **Git MCP Server** (Bonus)
    - Repository: https://github.com/modelcontextprotocol/servers/tree/main/src/git
    - Security concerns: Repository manipulation, credential exposure

For each server, document:
- **Security Complexity Rating**: 1-5 scale
- **Data Handling**: What data does it access?
- **Authentication**: How does it authenticate?
- **Risks**: Potential security vulnerabilities
- **Mitigations**: How to secure it properly

---

### Section 2: Platform Security Comparison ✅

Compare these AI platforms (focus on what you actually use):

#### Primary Platform: GitHub Copilot (VS Code)

**Data Residency**: US-based (GitHub/Microsoft servers)  
**Code Privacy**: 
- Personal accounts: Code snippets used for training
- Business accounts: Code NOT used for training
- Enterprise: Enhanced privacy controls

**Security Features**:
- ✅ Microsoft authentication
- ✅ Enterprise SSO support
- ✅ Content exclusions available
- ✅ Audit logging (Enterprise)

**Telemetry Controls**:
```json
// VS Code settings.json
{
  "github.copilot.advanced": {
    "debug.overrideEngine": "copilot-gpt-4"
  },
  "telemetry.telemetryLevel": "off"
}
```

**Risk Assessment for Different Users**:
- **Individual Developers**: Medium risk - code snippets may be used for training
- **Professional Consultants**: High risk - need Business license
- **Small Teams**: High risk - should use GitHub Copilot Business
- **Enterprise**: Lower risk - with proper configuration

#### Secondary Platform Comparison

Compare with (theoretical):
- **Claude Desktop** (not using, but research for report)
- **ChatGPT Developer Mode** (not using, but research)
- **Other AI Coding Assistants** (Cursor, Cody, etc.)

---

### Section 3: MCP Security & Data Flow Analysis ✅

**Research-Based Analysis** (no hands-on required):

For each MCP server category, document:

#### Database Connections
| Server | Encryption | Credential Storage | Risk Level |
|--------|-----------|-------------------|-----------|
| PostgreSQL | TLS 1.3 | Connection string | High |
| SQLite | None | File path | Medium |

#### File System Access
| Server | Access Level | Restrictions | Risk Level |
|--------|-------------|-------------|-----------|
| Filesystem | Full | Directory-based | High |
| Git | Repository | Git permissions | Medium |

#### API Integrations
| Server | External APIs | Auth Method | Risk Level |
|--------|--------------|-------------|-----------|
| GitHub | GitHub API | PAT/OAuth | Medium |
| Slack | Slack API | OAuth | Medium |
| Google Drive | Google API | OAuth 2.0 | Medium |

---

### Section 4: Development Environment Verification ✅

**Document YOUR Actual Setup:**

#### Node.js Installation
```powershell
node --version
npm --version
```

**Screenshot**: [Add screenshot showing versions]

**Security Configuration**:
```powershell
# Enable npm audit
npm config set audit true

# Check for vulnerabilities
npm audit

# Update packages
npm update
```

#### Git Configuration
```powershell
git --version
git config --list
```

**Screenshot**: [Add screenshot]

**Security Setup**:
```powershell
# Check if SSH keys exist
ls $env:USERPROFILE\.ssh

# Or show GitHub authentication
git config --get credential.helper
```

#### VS Code with GitHub Copilot
```powershell
code --version
code --list-extensions | Select-String "copilot"
```

**Screenshot**: [Add screenshot showing Copilot is installed]

**Installed Extensions**:
- ✅ GitHub.copilot
- ✅ GitHub.copilot-chat
- ✅ [Other security extensions]

**Security Settings** (`settings.json`):
```json
{
  "github.copilot.enable": {
    "*": true
  },
  "telemetry.telemetryLevel": "off",
  "files.exclude": {
    "**/.env": true,
    "**/.env.local": true
  }
}
```

#### GitHub Personal Access Token

**Created**: [Date]  
**Permissions**: repo, read:user  
**Expiration**: [90 days recommended]  
**Storage**: Stored in Windows Credential Manager (NOT in code)

**Screenshot**: [GitHub tokens page showing token created]

#### Your Portfolio Application

**Repository**: https://github.com/[your-username]/portfolio-app-with-authentication  
**Deployment**: Vercel  
**Security Status**:
- ✅ Clerk authentication implemented
- ✅ HTTPS with automatic SSL
- ✅ Environment variables secured
- ✅ `.gitignore` properly configured

**Screenshot**: [Your portfolio running locally]

---

### Section 5: Security Analysis & Risk Assessment ✅

#### Top 5 AI Development Tools for Security-Conscious Workflows

**1. GitHub Copilot (Business/Enterprise)**
- ⭐⭐⭐⭐⭐ (5/5)
- Best for: Professional development with code privacy
- Security: No training on your code (Business+)

**2. Local AI Models (Ollama + Continue)**
- ⭐⭐⭐⭐⭐ (5/5)
- Best for: Complete data sovereignty
- Security: Everything runs locally

**3. AWS CodeWhisperer**
- ⭐⭐⭐⭐☆ (4/5)
- Best for: AWS-centric development
- Security: Enterprise IAM integration

**4. Tabnine**
- ⭐⭐⭐⭐☆ (4/5)
- Best for: Team collaboration
- Security: Self-hosted option available

**5. Cody by Sourcegraph**
- ⭐⭐⭐⭐☆ (4/5)
- Best for: Enterprise code search
- Security: Context-aware with codebase

#### Risk Matrix for Your Current Setup

| Threat Scenario | Likelihood | Impact | Risk Level | Your Mitigation |
|----------------|-----------|--------|-----------|-----------------|
| Code snippets in training data | High | Medium | Medium | Use Copilot Business (future) |
| Credential exposure in code | Medium | High | High | ✅ Using .env, .gitignore |
| Dependency vulnerabilities | High | High | High | ✅ npm audit enabled |
| Man-in-the-Middle | Low | High | Medium | ✅ HTTPS everywhere |
| Supply Chain Attack | Medium | High | High | ⚠️ Need dependency scanning |

#### Australian Case Study Integration

**Research 3 Australian Cybersecurity Incidents**:

1. **Optus Data Breach (2022)**
   - 9.8 million customers affected
   - Relevance: API security, authentication
   - Lesson: Never expose sensitive data without authentication

2. **Medibank Cyber Attack (2022)**
   - 9.7 million customers affected
   - Relevance: Ransomware, data encryption
   - Lesson: Data must be encrypted at rest

3. **Australian National University Breach (2018)**
   - 19 years of data accessed
   - Relevance: Long-term undetected access
   - Lesson: Need continuous monitoring

**How This Relates to MCP/AI Security**:
- AI agents with database access could become attack vectors
- Proper authentication and encryption critical
- Audit logging essential for detection

---

## Simplified Verification Script

Since you're not using Claude Desktop, here's a simplified verification:

```powershell
# Save as verify-environment-simplified.ps1

Write-Host "=== AI Protector Workshop Environment (Copilot-Based) ===" -ForegroundColor Cyan
Write-Host ""

# Node.js
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found" -ForegroundColor Red
}

# npm
if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = npm --version
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm not found" -ForegroundColor Red
}

# Git
if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitVersion = git --version
    Write-Host "✅ Git: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Git not found" -ForegroundColor Red
}

# VS Code
if (Get-Command code -ErrorAction SilentlyContinue) {
    Write-Host "✅ VS Code: Installed" -ForegroundColor Green
    
    # Check for Copilot
    $extensions = code --list-extensions
    if ($extensions -match "github.copilot") {
        Write-Host "✅ GitHub Copilot: Installed" -ForegroundColor Green
    } else {
        Write-Host "❌ GitHub Copilot: Not found" -ForegroundColor Red
    }
} else {
    Write-Host "❌ VS Code not found" -ForegroundColor Red
}

# Security check
Write-Host ""
Write-Host "Security Configuration:" -ForegroundColor Yellow

# Check .gitignore
if (Test-Path ".gitignore") {
    if (Select-String -Path ".gitignore" -Pattern ".env" -Quiet) {
        Write-Host "✅ .gitignore configured for .env files" -ForegroundColor Green
    } else {
        Write-Host "⚠️  .env not in .gitignore" -ForegroundColor Yellow
    }
}

# Check if npm audit is enabled
$npmAudit = npm config get audit
if ($npmAudit -eq "true") {
    Write-Host "✅ npm audit enabled" -ForegroundColor Green
} else {
    Write-Host "⚠️  npm audit not enabled" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Verification Complete ===" -ForegroundColor Cyan
```

---

## Week 1 Deliverable Checklist (Adjusted)

### Required Sections:
- [ ] Section 1: Research 10+ MCP servers (theoretical analysis)
- [ ] Section 2: Platform comparison (focus on GitHub Copilot)
- [ ] Section 3: MCP security analysis (research-based)
- [ ] Section 4: YOUR actual environment (Node.js, Git, VS Code, Copilot)
- [ ] Section 5: Risk assessment with Australian case studies

### Evidence Required:
- [ ] Screenshot: Node.js and npm versions
- [ ] Screenshot: Git version and config
- [ ] Screenshot: VS Code with Copilot installed
- [ ] Screenshot: Your portfolio running
- [ ] Screenshot: GitHub repository
- [ ] Screenshot: Vercel deployment

### Documentation:
- [ ] 2,000+ words of analysis
- [ ] Professional formatting in Google Docs
- [ ] Working hyperlinks to all MCP repositories
- [ ] Security risk matrices
- [ ] Personal insights and reflections

---

## What You Can Skip:

❌ Claude Desktop installation  
❌ Claude Desktop configuration  
❌ MCP server local installation  
❌ ChatGPT Developer Mode testing  
❌ Testing MCP servers hands-on  

## What You Focus On:

✅ Research and theoretical analysis of MCP servers  
✅ Security assessment based on documentation  
✅ YOUR actual development environment (VS Code + Copilot)  
✅ Security best practices in YOUR current setup  
✅ Professional security documentation  

---

**This approach is completely valid for the AI Protector Workshop!** You're using GitHub Copilot as your AI assistant platform, which is equally legitimate and widely used in professional environments.

Your Week 1 submission will demonstrate:
1. Deep understanding of MCP security (research-based)
2. Platform security analysis (GitHub Copilot focus)
3. Your actual secure development environment
4. Professional security documentation skills
5. Risk assessment and mitigation strategies

**Status**: Ready to start Week 1 deliverable with simplified, practical approach! 🚀
