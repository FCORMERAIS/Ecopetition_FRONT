'use client';

import { useEffect, useState } from "react";
import { Petition } from "@/modeles/Petition";
import Card from "./Card";
import styles from "../styles/home.module.css";

export default function Home() {

    const [petitions, setPetitions] = useState<Petition[]>([]);

    useEffect(() => {
        const fetchPetitions = async () => {
            const newPetitions: Petition[] = [];
                const response = await fetch("api/petitions/list/paginated?page=1");
                if (response.ok) {
                    const data = await response.json();
                    data.results.forEach((petition : Petition) => {
                        newPetitions.push({
                            id: petition.id,
                            titre: petition.titre,
                            auteur : petition.auteur,
                            description: petition.description,
                            signature: 0,
                            image_url: petition.image_url
                        })})
                }
            setPetitions(newPetitions);
        };

        fetchPetitions();
    }, []);

    const handleSearch = async () => {
        const searchInput = (document.querySelector(`.${styles.search}`) as HTMLInputElement).value;
        const newPetitions :Petition[] = [];
        const response = await fetch("api/petitions/search/" + searchInput);
        if (response.ok) {
            const data = await response.json();
            data.forEach((petition : Petition) => {
                newPetitions.push({
                    id: petition.id,
                    titre: petition.titre,
                    auteur : petition.auteur,
                    description: petition.description,
                    signature: 0,
                    image_url: petition.image_url
                })})
            setPetitions(newPetitions);
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
