import { Petition } from "@/modeles/Petition";
import React from "react";
import styles from "../styles/card.module.css";

interface CardProps {
    petition : Petition;
} 

export default function Card({petition}: CardProps) {

    return (
        <div className={styles.card}>
            <h2 className={styles.cardTitle}>{petition.title}</h2>
            <p className={styles.cardDescription}>{petition.description}</p>
            <p className={styles.cardDescription}>{petition.CountSignature}</p>
            <button className={styles.cardButton}>Signer</button>
        </div>
    );
}