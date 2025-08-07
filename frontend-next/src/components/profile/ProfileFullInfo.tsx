"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Profile() {
  const { data: session } = useSession()

  console.log('Profile session:', session)

  if (!session) {
    return <div></div>
  }

  return (
    <div>
      {session.user?.image && (
        <Image
          className="profile-image"
          width={40}
          height={40}
          src={session.user.image}
          alt={session.user.name || "Profile image"}
          style={{ borderRadius: "50%" }}
        />
      )}          
      <p>{session.user?.name}</p>
      <p>{session.user?.email}</p>
    </div>
  )
}