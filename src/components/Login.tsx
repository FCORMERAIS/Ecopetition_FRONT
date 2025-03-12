'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/login.module.css';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        document.body.classList.add(styles.noScroll);
        return () => {
            document.body.classList.remove(styles.noScroll);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Connexion avec:', { email, password });
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
