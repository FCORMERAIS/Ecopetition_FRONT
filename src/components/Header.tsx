"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/header.module.css";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter(); // Hook pour gérer la redirection
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("access_token");

            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await fetch("https://app-20ce8ab4-2f87-49c9-a647-2a5fbcdfacbc.cleverapps.io/api/user/verify", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem("access_token"); // Supprime le token expiré
                }
            } catch (error) {
                console.error("Erreur de vérification du token :", error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
        localStorage.removeItem("access_token"); // Supprime le token
        setIsAuthenticated(false); // Met à jour l'état
        router.push("/"); // Redirige vers la page d'accueil
    };

    // Si on est sur la page login/signup, ne pas afficher les boutons
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

            {isAuthenticated === false ? (
                <nav className={styles.nav}>
                    <Link href="/login" className={styles.btn}>Connexion</Link>
                    <Link href="/signup" className={styles.btn}>Inscription</Link>
                </nav>
            ) : (
                <nav className={styles.nav}>
                    <Link href="/publication" className={styles.btn}>Créer une Petition</Link>
                    <button onClick={handleLogout} className={styles.btn}>Se déconnecter</button>
                </nav>
            )}
        </header>
    );
}
