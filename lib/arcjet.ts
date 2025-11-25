// Arcjet Web Application Firewall Configuration
// Week 4 Implementation - OAuth 2.0 + MCP Security

import arcjet, { tokenBucket, detectBot, shield } from "@arcjet/next"

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get this from https://app.arcjet.com
  characteristics: ["ip.src"],
  rules: [
    // Rate limiting: 100 requests per minute per IP
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: "60s",
      capacity: 100,
    }),
    // Bot detection - allow search engines
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),
    // Shield for common attacks (SQL injection, XSS, etc.)
    shield({
      mode: "LIVE",
    }),
  ],
})

export default aj
