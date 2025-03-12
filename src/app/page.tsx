import Home from "@/components/Home";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import DetailPetition from "@/components/DetailPetition";




export default function App() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <DetailPetition/>
      </main>
      <footer className={styles.footer}>
          <Footer/>
      </footer>
    </div>
  );
}
