"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AuthButton() {
  return (
    <Link href="/admin">
      <Button variant="outline" size="sm">
        Admin Login
      </Button>
    </Link>
  )
}
