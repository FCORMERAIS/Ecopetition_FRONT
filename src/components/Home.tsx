'use client';

import { useEffect, useState } from "react";
import { Petition } from "@/modeles/Petition";
import Card from "./Card";
import styles from "../styles/home.module.css";

interface HomeProps {
    setPage : (page: string) => void;
} 

export default function Home({setPage}: HomeProps) {

    const [petitions, setPetitions] = useState<Petition[]>([]);

    useEffect(() => {
        const fetchPetitions = async () => {
            const newPetitions = [];
            for (let i = 0; i < 20; i++) {
                const response = await fetch("api/petitions/4600");
                const data = await response.json();
                newPetitions.push({
                    id: i,
                    titre: data.titre,
                    auteur : "Flavio",
                    description: data.description,
                    signature: 0,
                    imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ"
                });
            }
            setPetitions(newPetitions);
        };

        fetchPetitions();
    }, []);

    
    const cards = petitions.map((petition) => (
        <div key={petition.id} className={styles.card}>
            <Card petition={petition} />
        </div>
    ));
    

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Pétitions</h1>
            <h3 className={styles.subtitle}>Mobiliser les pétitions et faire avancer les causes écologiques</h3>
            <input type="search" className={styles.search} placeholder="Search"/>
            <div className={styles.cards}>
                {cards}
            </div>
        </div>
  );
}
