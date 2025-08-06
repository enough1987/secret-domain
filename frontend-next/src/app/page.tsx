
import AIClient from "@/components/aiClient/AiClient";
import styles from "./page.module.scss";

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
