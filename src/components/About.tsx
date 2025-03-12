
'use client';

import { useState } from 'react';
import styles from '../styles/about.module.css';

export default function About() {
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
        console.log('About:', formData);
    };

    return (
        <div className={styles.aboutContainer}>
            <h1 className={styles.title}>À Propos de EcoPetition</h1>
            <p className={styles.description}>
                Bienvenue sur <strong>EcoPetition</strong>, une plateforme dédiée à la protection de l'environnement
                et aux actions citoyennes. Nous croyons que chacun peut avoir un impact en partageant
                ses idées et en soutenant des causes importantes.
            </p>

            <h2 className={styles.subtitle}>Notre Mission</h2>
            <p className={styles.text}>
                Nous facilitons la création et la diffusion de pétitions en ligne, afin de permettre aux citoyens
                de s'exprimer et d'inciter au changement. Rejoignez-nous pour agir ensemble !
            </p>

            <h2 className={styles.subtitle}>Contact</h2>
            <p className={styles.text}>
                Pour toute question ou suggestion, contactez-nous à :
                <a href="mailto:contact@ecopetition.com" className={styles.link}> contact@ecopetition.com</a>
            </p>
        </div>
    );
}


