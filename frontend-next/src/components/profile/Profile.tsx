"use client"

import { useSession } from "next-auth/react"

export default function Profile() {
  const { data: session } = useSession()

  console.log("Profile", session)

  if (!session) {
    return <div></div>
  }

  return (
    <div>
      <p>{session.user?.email}</p>
    </div>
  )
}