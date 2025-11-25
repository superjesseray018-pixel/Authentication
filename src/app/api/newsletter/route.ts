import { type NextRequest, NextResponse } from "next/server"
import aj from "@/lib/arcjet"

// Mock database for prototype - in production this would connect to Neon
const subscribers: { id: string; email: string; subscribedAt: string }[] = [
  {
    id: "1",
    email: "john.doe@example.com",
    subscribedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    email: "jane.smith@techcorp.com",
    subscribedAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "3",
    email: "security.admin@company.org",
    subscribedAt: "2024-02-01T09:15:00Z",
  },
]

export async function POST(request: NextRequest) {
  // Apply Arcjet protection (rate limiting, bot detection, shield)
  const decision = await aj.protect(request, { requested: 1 })

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
      { error: "Request blocked by security policy" },
      { status: 403 }
    )
  }

  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email address is required" }, { status: 400 })
    }

    // Check if email already exists
    const existingSubscriber = subscribers.find((sub) => sub.email === email)
    if (existingSubscriber) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 409 })
    }

    // Add new subscriber
    const newSubscriber = {
      id: Date.now().toString(),
      email,
      subscribedAt: new Date().toISOString(),
    }

    subscribers.push(newSubscriber)

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter", subscriber: newSubscriber },
      { status: 201 },
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  // This endpoint will be protected in the admin dashboard
  return NextResponse.json({
    subscribers,
    total: subscribers.length,
  })
}
