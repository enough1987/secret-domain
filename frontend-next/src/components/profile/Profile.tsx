"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import styles from "./Profile.module.scss"

export default function Profile() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>
  }

  console.log("Profile : ", session)

  if (!session) {
    return (
      <div>
        <button className={styles.authButton} onClick={() => signIn("google")}>
          Log in
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <button className={styles.authButton} onClick={() => signOut()}>
          Log out
        </button>
      </div>
    )
  }
}