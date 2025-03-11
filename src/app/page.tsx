import Home from "@/components/Home";
import styles from "./page.module.css";

export default function App() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <Home/>
      </main>
      <footer className={styles.footer}>
       
      </footer>
    </div>
  );
}
