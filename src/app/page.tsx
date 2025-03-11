import Home from "@/components/Home";
import Footer from "@/components/Footer";
import styles from "./page.module.css";


export default function App() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <Home/>
      </main>
      <footer className={styles.footer}>
          <Footer/>
      </footer>
    </div>
  );
}
