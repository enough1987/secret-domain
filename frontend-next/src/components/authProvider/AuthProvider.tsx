"use client"

import { AUTH_NEXT_BASE_URL } from "@/api/models"
import { SessionProvider } from "next-auth/react"
import { appConfig } from '@/configs/appConfig';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  if (appConfig.disableAuth) {
    return <>{children}</>
  }

  return (
    <SessionProvider basePath={AUTH_NEXT_BASE_URL}>
      {children}
    </SessionProvider>
  );
}
