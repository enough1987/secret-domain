
import AIClient from "@/components/ai-client/ai-client";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>AI Integration Example</h2>
        <AIClient />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
