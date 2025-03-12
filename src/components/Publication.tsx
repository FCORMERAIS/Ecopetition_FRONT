// src/components/Publication.tsx

'use client';

import { useState } from 'react';
import styles from '../styles/publication.module.css';

export default function Publication() {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Publication:', formData);
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Créer une publication</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={{ width: "614px", height: "40px" }}
                        />

                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            style={{ width: "614px", height: "200px" }}
                        />
                    </div>
                    <button type="submit" className={styles.button}>Publier</button>
                </form>
            </div>
        </div>
    );
}
