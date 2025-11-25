# Jesse Ray S. Lasam - Cybersecurity Portfolio

*Professional digital portfolio with comprehensive security documentation*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/superjesseray018-pixels-projects/v0-portfolio-app-with-authentication)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/zs07Eet2062)

## Overview

A modern, secure portfolio website showcasing cybersecurity expertise, projects, and professional experience. Built with Next.js 15, deployed on Vercel with comprehensive security documentation and LMS curriculum references.

## Live Deployment

**Production URL**: [Add your Vercel deployment URL here]

**Security Plan**: [Your URL]/security-plan

## Features

- **Responsive Design**: Mobile-first design with dark/light mode support
- **Security Documentation**: Comprehensive security implementation plan at `/security-plan`
- **Professional Sections**:
  - Hero section with introduction
  - About section with skills and certifications
  - Experience timeline with achievements
  - Featured cybersecurity projects
  - Education details (St. Paul University Philippines)
  - Contact information and social links

## Security Implementation

### Current Security Status

✅ **Implemented**
- HTTPS deployment with automatic SSL/TLS certificates
- Environment variable management via Vercel
- Security headers configuration
- Theme toggle with localStorage persistence
- Vercel Analytics integration

⏳ **Planned**
- OAuth 2.0 authentication (Google, GitHub)
- JWT token management
- Multi-factor authentication (MFA)
- Rate limiting and DDoS protection
- Comprehensive logging infrastructure

### Documentation

- **Security Plan**: `/security-plan` - Complete security roadmap
- **Security Notes**: `docs/SECURITY-NOTES.md` - Detailed implementation notes
- **LMS References**: `docs/LMS-REFERENCES.md` - Curriculum documentation

## LMS Curriculum References

This portfolio demonstrates concepts learned from various cybersecurity courses:

### Core Courses
- Network Security Fundamentals
- Web Application Security (OWASP Top 10)
- Ethical Hacking and Penetration Testing
- Secure Software Development
- Identity and Access Management
- Cloud Security Fundamentals

### Applied Learning
- Authentication readiness implementation
- Secrets management best practices
- Logging and monitoring infrastructure
- Security compliance considerations

**Full LMS References**: See `docs/LMS-REFERENCES.md` for complete curriculum links

> **Note**: Add your specific LMS URLs to the documentation file

## AI Protector Workshop Integration

This portfolio is actively being enhanced as part of the **AI Protector Workshop** - a 10-week security-first program covering:

### Current Program Status
**Program**: [AI Protector Workshop](https://aiagents.ausbizconsulting.com.au/ai-protector-workshop)  
**Duration**: 10 Weeks (November 2025 - January 2026)  
**Focus**: Secure AI Agents, MCP Servers & Digital Portfolios

### Workshop Deliverables
- ✅ **Week 1**: MCP Security Research & Environment Setup (In Progress)
- ⏳ **Week 2-3**: Cyber Security Bootcamp Integration & Secured Portfolio
- ⏳ **Week 4**: Vercel Firewall & Arcjet WAF Integration
- ⏳ **Week 5**: Kali Linux Penetration Testing Playbook
- ⏳ **Week 6-8**: OAuth 2.1 MCP Authentication & Production Hardening
- ⏳ **Week 9**: Executive Security Documentation & Reporting
- ⏳ **Week 10**: Final Presentation & Protector Launch

### Documentation
- **Workshop Progress**: `docs/AI-PROTECTOR-WORKSHOP.md`
- **Week 1 Template**: `docs/WEEK-1-MCP-SECURITY-RESEARCH-TEMPLATE.md`
- **Environment Setup**: `docs/WEEK-1-ENVIRONMENT-SETUP.md`

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel Platform

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                    # Main portfolio page
│   ├── security-plan/              # Security documentation page
│   ├── layout.tsx                  # Root layout with theme support
│   └── globals.css                 # Global styles and theme tokens
├── components/
│   ├── theme-toggle.tsx            # Dark/light mode toggle
│   └── ui/                         # shadcn/ui components
├── docs/
│   ├── LMS-REFERENCES.md           # Learning curriculum references
│   └── SECURITY-NOTES.md           # Security implementation details
└── public/                         # Static assets
\`\`\`

## Local Development

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Environment Variables

Currently, no environment variables are required for the basic portfolio. Future authentication implementation will require:

\`\`\`bash
# Future Authentication (when implemented)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
SESSION_SECRET=
JWT_SECRET=
\`\`\`

Set environment variables in Vercel Project Settings → Environment Variables.

## Deployment Checklist

### Pre-Deployment
- [x] All secrets stored in environment variables
- [x] No hardcoded credentials in code
- [x] Security headers configured
- [x] HTTPS enforced via Vercel
- [x] Theme toggle functionality working
- [x] Responsive design tested
- [x] Security documentation complete

### Post-Deployment
- [ ] Add production URL to README
- [ ] Add LMS curriculum URLs to `docs/LMS-REFERENCES.md`
- [ ] Enable MFA on v0.dev account
- [ ] Take screenshots of v0.dev account configuration
- [ ] Test all navigation links
- [ ] Verify `/security-plan` page loads correctly
- [ ] Monitor Vercel Analytics

## Security Considerations

### Authentication Readiness
The application is prepared for future authentication implementation with:
- OAuth 2.0 integration planning
- JWT token management strategy
- Session security considerations
- MFA support planning

### Secrets Handling
- All sensitive data managed via environment variables
- `.env` files excluded from version control
- Separate environments (development, preview, production)
- No hardcoded secrets in codebase

### Logging Infrastructure
- Vercel Analytics for performance metrics
- Build and runtime logs via Vercel
- Planned: Structured logging, security event tracking, error monitoring

See `docs/SECURITY-NOTES.md` for comprehensive security documentation.

## v0.dev Account Security

### MFA Configuration
To meet submission requirements, ensure your v0.dev account has MFA enabled:

1. Go to v0.dev account settings
2. Enable Multi-Factor Authentication
3. Use authenticator app (Google Authenticator, Authy, etc.)
4. Save backup codes securely
5. Take screenshot of MFA configuration

**Screenshot Location**: [Add screenshot to repository or documentation]

## Submission Requirements

### Required Deliverables
- ✅ Vercel deployment URL with secure landing page
- ✅ LMS curriculum entries referenced in `docs/LMS-REFERENCES.md`
- ✅ Security notes covering authentication, secrets, and logging
- ✅ `/security-plan` page summarizing upcoming controls
- ⏳ Screenshots of v0.dev account with MFA enabled

### Documentation Links
- **Security Plan**: [Your URL]/security-plan
- **LMS References**: `docs/LMS-REFERENCES.md`
- **Security Notes**: `docs/SECURITY-NOTES.md`

## Contact

**Jesse Ray S. Lasam**
- Email: jesse.lasam@email.com
- GitHub: [Add your GitHub profile]
- LinkedIn: [Add your LinkedIn profile]

## License

© 2025 Jesse Ray S. Lasam. All rights reserved.

---

**Built with [v0.app](https://v0.app)** | **Deployed on [Vercel](https://vercel.com)**
