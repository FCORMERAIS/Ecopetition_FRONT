import { Petition } from "@/modeles/Petititon";
import React from "react";
import styles from "../styles/card.module.css";

interface CardProps {
    petition : Petition;
    setPage : (page: string) => void;
} 

export default function Card({petition}: CardProps) {

    return (
        <div className={styles.card}>
            <img src={petition.imageSrc} className={styles.cardImage}/>
            <h2 className={styles.cardTitle}>{petition.title}</h2>
            <p className={styles.cardDescription}>{petition.description}</p>
            <p className={styles.cardSignature}>{petition.countSignature} personnes ont déjà signées !</p> 
            <button className={styles.cardButton}>Signer</button>
        </div>
    );
}