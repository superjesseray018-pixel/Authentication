"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage("Successfully subscribed! Check your email for confirmation.")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please check your connection and try again.")
    }
  }

  return (
    <Card className="p-8 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            disabled={status === "loading"}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe to Newsletter"
          )}
        </Button>

        {status === "success" && (
          <div className="flex items-center space-x-2 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            <span>{message}</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{message}</span>
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          No spam. Unsubscribe at any time. We respect your privacy.
        </p>
      </form>
    </Card>
  )
}
