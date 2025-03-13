
'use client';

import { useState } from 'react';
import { getUserIdFromToken } from "./Auth";
import styles from '../styles/publication.module.css';
import backgroundImage from "@/assets/ecopetition.jpeg";
import { useRouter } from 'next/router';

export default function Publication() {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const router = useRouter();
    const userId = getUserIdFromToken();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const jwt = localStorage.getItem("access_token");

        try {
            const response = await fetch(`/api/petitions/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    titre: formData.title,
                    description: formData.description,
                    date_creation: new Date().toISOString().split('T')[0],
                    date_cloture: new Date().toISOString().split('T')[0],
                    user_id: userId
                }),
            });

            if (response.ok) {
                router.push("/"); 
            } else {
                throw new Error("Échec de la création de la publication");
            }
        } catch (err) {
            console.error("Échec de la création de la publication:", err);
        }
    };

    return (
        <div
            className={styles.page}
            style={{
                backgroundImage: `url(${backgroundImage.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
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
