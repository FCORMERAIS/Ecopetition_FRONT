'use client';

import { useEffect, useState } from "react";
import { Petition } from "@/modeles/Petition";
import Card from "./Card";
import styles from "../styles/home.module.css";
import backgroundImage from "@/assets/ecopetition.jpeg";

export default function Home() {

    const [petitions, setPetitions] = useState<Petition[]>([]);
    const fetchPetitions = async () => {
        try {
            const response = await fetch("/api/petitions/list/paginated?page=1");
            if (!response.ok) throw new Error("Échec du chargement des pétitions");

            const data = await response.json();
            const petitionsList: Petition[] = data.results;

            // Récupérer le nombre de signatures pour chaque pétition
            const petitionsWithSignatures = await Promise.all(
                petitionsList.map(async (petition: Petition) => {
                    try {
                        const token = localStorage.getItem("access_token");
                        const signResponse = await fetch(`/api/petitions/${petition.id}/sign_count`, {
                            method: "GET",
                            headers: { "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`},
                        });
                        if (!signResponse.ok) throw new Error("Échec de la récupération des signatures");

                        const signData = await signResponse.json();
                        return { ...petition, signature: signData.nombre_signatures };
                    } catch (err) {
                        console.error(`Erreur lors de la récupération des signatures pour la pétition ${petition.id}:`, err);
                        return { ...petition, signature: 0 };
                    }
                })
            );

            setPetitions(petitionsWithSignatures);
        } catch (err) {
            console.error("Erreur lors du chargement des pétitions:", err);
        }
    };

    useEffect(() => {
        fetchPetitions();
    }, []);

    const handleSearch = async () => {
        const searchInput = (document.querySelector(`.${styles.search}`) as HTMLInputElement).value;
        const newPetitions :Petition[] = [];
        if (searchInput === "" || searchInput === null) {
            fetchPetitions();
            return;
        }
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
        <div className={styles.container} style={{
            backgroundImage: `url(${backgroundImage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
        }}>
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
