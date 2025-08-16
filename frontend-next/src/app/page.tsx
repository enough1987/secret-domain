
import dynamic from 'next/dynamic'
import pkg from '../../package.json'; // Adjust path if needed
import styles from "./page.module.scss";
// This component will only be loaded when rendered
const AIClient = dynamic(() => import('@/components/aiClient/AiClient'));
const ShowAllForwardedIPs = dynamic(() => import('@/components/showAllForwardedIPs/showAllForwardedIPs'));

export default function Home() {  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AIClient />
      </main>
      <footer className={styles.footer}>
        <p>Version: {pkg.version}</p>
        <ShowAllForwardedIPs />
      </footer>
    </div>
  );
}
