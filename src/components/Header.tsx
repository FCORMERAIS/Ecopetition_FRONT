"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "../styles/header.module.css";

export default function Header() {
    const pathname = usePathname();
    const [isAuthenticated] = useState(false);

    if (pathname === "/login" || pathname === "/signup") {
        return (
            <header className={styles.header}>
                <div className={styles.logo}>EcoPetition</div>
            </header>
        );
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>EcoPetition</div>

            {!isAuthenticated ? (
                <nav className={styles.nav}>
                    <Link href="/login" className={styles.btn}>Connexion</Link>
                    <Link href="/signup" className={styles.btn}>Inscription</Link>
                </nav>
            ) : (
                <nav className={styles.nav}>
                    <Link href="/publication" className={styles.btn}>Publier</Link>
                </nav>
            )}
        </header>
    );
}
