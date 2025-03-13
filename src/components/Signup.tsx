

'use client';

import { useState } from 'react';
import styles from '../styles/signup.module.css';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [passwordError, setPasswordError] = useState("");


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "password") {
            validatePassword(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }
        console.log('Inscription réussie avec:', formData);
        const post = {
            pseudo : formData.fullName,
            mail : formData.email,
            password : formData.password
        }
        console.log(post)
        fetch('/api/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.ok) {
                    console.log('Inscription réussie:', data);
                    // Redirect or show success message
                } else {
                    console.error('Erreur lors de l\'inscription:', data.message);
                    // Show error message
                }
            })
            .catch((error) => {
                console.error('Erreur réseau:', error);
                // Show network error message
            });
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.");
        } else {
            setPasswordError("");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="fullName">Nom complet</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Mot de passe</label>
                        <div className={styles.inputGroup}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {passwordError && <p className={styles.error}>{passwordError}</p>}
                            <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <span className={styles.eyeIcon} onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className={styles.button}>S'inscrire</button>
                </form>
                <div className={styles.links}>
                    <span>Déjà un compte ? </span>
                    <Link href="/login">Connectez-vous</Link>
                </div>
            </div>
        </div>
    );
}