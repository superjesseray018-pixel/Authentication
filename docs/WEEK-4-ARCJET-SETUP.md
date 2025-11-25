# Week 4: Arcjet WAF Integration

## Installation Instructions

### Step 1: Install Arcjet Package
```powershell
cd "c:\Users\roque\Downloads\portfolio-app-with-authentication (2)\portfolio-app-with-authentication"
npm install @arcjet/next
```

### Step 2: Get Arcjet API Key
1. Go to https://app.arcjet.com
2. Create an account or sign in
3. Create a new site/project
4. Copy your API key

### Step 3: Configure Environment Variables

Add to `.env.local`:
```env
ARCJET_KEY=ajkey_your_api_key_here
```

Add to Vercel Environment Variables (for production):
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `ARCJET_KEY` = `your_api_key`
3. Select: Production, Preview, Development
4. Click "Save"

### Step 4: Update Arcjet Configuration

The file `lib/arcjet.ts` is already prepared. Once you install Arcjet and add the key, update it:

```typescript
import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/next"

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    // Rate limiting: 100 requests per minute per IP
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: "60s",
      capacity: 100,
    }),
    // Bot detection
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Allow search engines
      ],
    }),
    // Shield for common attacks
    shield({
      mode: "LIVE",
    }),
  ],
})

export default aj
```

### Step 5: Update Newsletter API Route

File: `src/app/api/newsletter/route.ts`

Add Arcjet protection:
```typescript
import { NextRequest, NextResponse } from "next/server"
import aj from "@/lib/arcjet"

export async function POST(request: NextRequest) {
  // Apply Arcjet protection
  const decision = await aj.protect(request)

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }
    
    if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "Bot access denied" },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: "Request blocked" },
      { status: 403 }
    )
  }

  // Your existing newsletter logic
  try {
    const { email } = await request.json()
    
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      )
    }

    // TODO: Add email to newsletter database
    console.log("Newsletter subscription:", email)

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

### Step 6: Update MCP API Route

File: `src/app/api/mcp/route.ts`

Add at the top:
```typescript
import aj from "@/lib/arcjet"
```

Update GET and POST methods to include protection:
```typescript
export async function GET(request: NextRequest) {
  // Add Arcjet protection
  const decision = await aj.protect(request)
  if (decision.isDenied()) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }

  // Rest of your existing code...
}
```

### Step 7: Update Middleware (Optional - Global Protection)

File: `middleware.ts`

```typescript
import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default clerkMiddleware(async (auth, request: NextRequest) => {
  // Arcjet can be added here for global protection
  // For now, Clerk middleware handles authentication
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

## Testing

### Test 1: Rate Limiting
```powershell
cd tests
.\rate-limit-test.ps1
```

Expected: Some requests blocked with 429 status after hitting rate limit

### Test 2: Bot Detection
Use a bot user agent:
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/newsletter" `
  -Method POST `
  -UserAgent "BadBot/1.0" `
  -Body '{"email":"test@example.com"}' `
  -ContentType "application/json"
```

Expected: 403 Forbidden for bot traffic

### Test 3: Integration Test
```powershell
.\run-all-tests.ps1
```

## Verification

1. Start development server:
```powershell
npm run dev
```

2. Make a few requests to `/api/newsletter`
3. Check Arcjet dashboard for activity
4. Verify rate limiting kicks in after 100 requests/minute

## Troubleshooting

### Error: Module not found '@arcjet/next'
Run: `npm install @arcjet/next`

### Error: ARCJET_KEY is not defined
1. Check `.env.local` file exists
2. Verify ARCJET_KEY is set
3. Restart development server

### Rate limiting not working
1. Verify Arcjet key is correct
2. Check Arcjet dashboard for errors
3. Ensure you're making requests from the same IP
4. Try reducing capacity to 10 for testing

## Arcjet Dashboard

Visit https://app.arcjet.com to:
- View real-time request analytics
- Monitor blocked requests
- Configure rules
- View attack patterns
- Generate reports

## Week 4 Completion Checklist

- [ ] Arcjet package installed
- [ ] ARCJET_KEY configured in `.env.local`
- [ ] ARCJET_KEY added to Vercel environment variables
- [ ] `lib/arcjet.ts` updated with API key
- [ ] Newsletter API protected with Arcjet
- [ ] MCP API protected with Arcjet
- [ ] Rate limiting tested and working
- [ ] Bot detection tested and working
- [ ] Arcjet dashboard shows activity

## Next Steps

After completing Week 4:
1. Run Week 5 penetration tests to verify security
2. Document results in security dashboard
3. Monitor Arcjet analytics
4. Proceed to Week 10 final integration

---

**Note:** Arcjet offers a free tier perfect for learning and development. Upgrade to paid plans for production use with higher limits.
