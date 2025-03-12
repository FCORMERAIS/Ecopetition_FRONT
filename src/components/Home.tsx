'use client';

import { useEffect, useState } from "react";
import { Petition } from "@/modeles/Petition";
import Card from "./Card";
import styles from "../styles/home.module.css";

export default function Home() {

    const [petitions, setPetitions] = useState<Petition[]>([]);

    useEffect(() => {
        const fetchPetitions = async () => {
            const newPetitions = [];
            for (let i = 0; i < 6; i++) {
                const response = await fetch("api/petitions/1");
                if (response.ok) {
                    const data = await response.json();
                    newPetitions.push({
                        id: i,
                        titre: data.titre,
                        auteur : data.auteur,
                        description: data.description,
                        signature: 0,
                        imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ"
                    });
                }
            }
            setPetitions(newPetitions);
        };

        fetchPetitions();
    }, []);

    const handleSearch = async () => {
        const searchInput = (document.querySelector(`.${styles.search}`) as HTMLInputElement).value;
        const newPetitions = [];
        const response = await fetch("api/petitions/search/" + searchInput);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
    }
        
    const cards = petitions.map((petition) => (
        <div key={petition.id} className={styles.card}>
            <Card petition={petition} />
        </div>
    ));
    

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Pétitions</h1>
            <h3 className={styles.subtitle}>Mobiliser les citoyens et faire avancer les causes écologiques</h3>
            <div className={styles.searchContainer}>
                <input type="search" className={styles.search} placeholder="Search" />
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>
            <div className={styles.cards}>
                {cards}
            </div>
        </div>
  );
}
