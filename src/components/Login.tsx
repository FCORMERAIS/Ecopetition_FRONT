"use client";

import { useState, useEffect } from "react";
import styles from "../styles/login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        document.body.classList.add(styles.noScroll);
        return () => {
            document.body.classList.remove(styles.noScroll);
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch("https://app-20ce8ab4-2f87-49c9-a647-2a5fbcdfacbc.cleverapps.io/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pseudo, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("access_token", data.access_token);
                setMessage("Connexion réussie !");
                router.push("/"); // Redirige vers l'accueil après connexion
            } else {
                setMessage(data.error || "Échec de la connexion. Vérifiez vos identifiants.");
            }
        } catch (error) {
            console.error("Erreur de connexion :", error);
            setMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Connexion</h2>
                {message && <p className={styles.message}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="pseudo">Pseudo</label>
                        <input
                            type="text"
                            id="pseudo"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className={styles.button}>Se connecter</button>
                </form>
                <div className={styles.links}>
                    <Link href="/forgot-password">Mot de passe oublié ?</Link>
                    <Link href="/signup">Créer un compte</Link>
                </div>
            </div>
        </div>
    );
}
