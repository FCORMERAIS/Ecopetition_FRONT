'use client'

import Home from "@/components/Home";
import Footer from "@/components/Footer";
import styles from "./page.module.css";
import { useState } from "react";


export default function App() {

  const [Page, setPage] = useState(<Home/>);


  const changePage = (page: string) => {
    if (page === "home") {
      return <Home/>
    }
  }


  return (
    <div className={styles.page}>
      <main className={styles.main}>
          {Page}
      </main>
      <footer className={styles.footer}>
          <Footer/>
      </footer>
    </div>
  );
}
