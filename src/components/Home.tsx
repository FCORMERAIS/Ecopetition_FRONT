'use client';

import { use, useEffect, useState } from "react";
import { Petition } from "@/modeles/Petititon";
import Card from "./Card";
import styles from "../styles/home.module.css";
export default function Home() {

    const [petitions, setPetitions] = useState<Petition[]>([]);

    const cards = petitions.map((petition) => (
        <div key={petition.id} className={styles.card}>
            <Card petition={petition}/>
        </div>
    ));
    
    useEffect(() => {
        for (let i = 0; i < 20; i++) {
            console.log("fetching petition", petitions);
            fetch("https://api.chucknorris.io/jokes/random").then((response) => response.json()).then((data) => {
                const newPetitions = petitions;
                newPetitions.push({
                    id: i,
                    title: "test" + i,
                    description: data.value,
                    countSignature: 0,
                    imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ"                
                });
                setPetitions(newPetitions);
            });
        }
        

    }, [cards]);
    

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
