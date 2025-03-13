import { useRouter } from "next/navigation";
import { Petition } from "@/modeles/Petition";
import React from "react";
import styles from "../styles/card.module.css";
import image from "../asset/ecopetition.jpeg";
interface CardProps {
    petition: Petition;
} 

export default function Card({ petition }: CardProps) {
    const router = useRouter();
    console.log(petition.image_url)
    const handleSignClick = () => {
        router.push(`/petition?id=${petition.id}`); // Redirection avec l'ID
    };

    return (
        <div className={styles.card}>
            {petition.image_url == null || petition.image_url == "" ? 
            <img src={image.src} className={styles.cardImage} /> :
            <img src={petition.image_url} className={styles.cardImage} />}
            <h2 className={styles.cardTitle}>{petition.titre}</h2>
            <p className={styles.cardDescription}>{petition.description}</p>
            <p className={styles.auteur}>{petition.auteur}</p>            
            <p className={styles.cardSignature}>{petition.signature} personnes ont déjà signées !</p> 
            <button className={styles.cardButton} onClick={handleSignClick}>Signer</button>
        </div>
    );
}
