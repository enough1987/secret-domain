"use client"

import { useSession, signIn } from "next-auth/react"
import styles from "./Profile.module.scss"

export default function Profile() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  console.log("Profile : ", session)

  if (!session) {
    return (
      <div>
        <button className={styles.loginButton} onClick={() => signIn()}>
          Log in
        </button>
      </div>
    )
  }

  return (
    <div>
      <p>{session.user?.email}</p>
    </div>
  )
}