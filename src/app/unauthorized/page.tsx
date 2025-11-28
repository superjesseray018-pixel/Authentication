import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShieldAlert, Home } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            This area is restricted to administrators only.
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg text-sm text-left space-y-2">
          <p className="font-medium">🔒 Protected Resources:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Security Dashboard</li>
            <li>Penetration Testing Tools</li>
            <li>Security Plan Documentation</li>
          </ul>
        </div>

        <Button asChild className="w-full" size="lg">
          <Link href="/">
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Link>
        </Button>

        <p className="text-xs text-muted-foreground">
          If you believe you should have access, please contact the administrator.
        </p>
      </Card>
    </div>
  )
}
