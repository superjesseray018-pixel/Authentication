// Arcjet configuration for Web Application Firewall
// This will be fully implemented in Week 4
// Currently serving as a placeholder for the security architecture

export interface ArcjetDecision {
  isDenied(): boolean
  reason: {
    isRateLimit(): boolean
    isBot(): boolean
  }
}

export interface ArcjetConfig {
  key: string
  characteristics: string[]
  rules: Array<{
    mode: string
    [key: string]: any
  }>
}

// Placeholder protect function until Arcjet is installed
export async function protect(request: Request): Promise<ArcjetDecision> {
  return {
    isDenied: () => false,
    reason: {
      isRateLimit: () => false,
      isBot: () => false,
    },
  }
}

// Configuration ready for Week 4 Arcjet integration
export const arcjetConfig: Partial<ArcjetConfig> = {
  characteristics: ["ip.src"],
  rules: [
    {
      mode: "LIVE",
      type: "tokenBucket",
      refillRate: 10,
      interval: 60,
      capacity: 100,
    },
    {
      mode: "LIVE",
      type: "detectBot",
      allow: ["GOOGLE_SEARCH", "BING_SEARCH"],
    },
    {
      mode: "LIVE",
      type: "shield",
    },
  ],
}
