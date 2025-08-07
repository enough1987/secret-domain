"use client"

import { BASE_NEXT_AUTH_URL } from "@/api/models"
import { SessionProvider } from "next-auth/react"


export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider basePath={BASE_NEXT_AUTH_URL}>
    {children}
  </SessionProvider>
}