import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { VisitorTracker } from '@/components/visitor-tracker'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Jesse Ray S. Lasam - Cybersecurity Portfolio',
  description: 'AI Protector Workshop - Secure AI Agents, MCP Servers & Digital Portfolios',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <VisitorTracker />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}