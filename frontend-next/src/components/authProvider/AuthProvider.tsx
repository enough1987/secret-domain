"use client"

import { AUTH_NEXT_BASE_URL } from "@/api/models"
import { SessionProvider } from "next-auth/react"


export default function AuthProvider({ children }: { children: React.ReactNode }) {
  console.log("AuthProvider", AUTH_NEXT_BASE_URL);
  return <SessionProvider basePath={AUTH_NEXT_BASE_URL}>
    {children}
  </SessionProvider>
}