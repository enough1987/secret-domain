"use client"

import { AUTH_NEXT_BASE_URL } from "@/api/models"
import { SessionProvider } from "next-auth/react"


export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider basePath={AUTH_NEXT_BASE_URL}>
    {children}
  </SessionProvider>
}