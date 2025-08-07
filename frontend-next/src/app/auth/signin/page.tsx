"use client"

import { signIn } from "next-auth/react"
import styles from "./page.module.scss";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <button className={styles.button} onClick={() => signIn("google")}>
        Sign in with Google
      </button>
    </div>
  )
}