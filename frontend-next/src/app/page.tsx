
import dynamic from 'next/dynamic'

import styles from "./page.module.scss";
// This component will only be loaded when rendered
const AIClient = dynamic(() => import('@/components/aiClient/AiClient'))

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AIClient />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
