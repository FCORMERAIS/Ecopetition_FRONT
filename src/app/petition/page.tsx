'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Petition } from "@/modeles/Petition";
import styles from "@/styles/detail.module.css"

interface DetailProps {
    setPage : (page: string) => void;
} 

export default function DetailPetition({setPage}: DetailProps) {
    const searchParams = useSearchParams();
    const petitionId = searchParams.get('id');

    const [petition, setPetition] = useState<Petition | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        console.log(petitionId)

        if (petitionId) {
            const fetchPetition = async () => {
                try {
                    const response = await fetch(`/api/petitions/${petitionId}`);
                    if (!response.ok) throw new Error("Échec du chargement de la pétition");
                    
                    const data: Petition = await response.json();
                    setPetition(data);
                } catch (err) {
                    setError("Impossible de récupérer la pétition.");
                } finally {
                    setLoading(false);
                }
            };

            fetchPetition();
        } else {
            setLoading(false);
        }
    }, [petitionId]);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!petition) return <p>Aucune pétition trouvée.</p>;

    return (
        <div className={styles.petitionContainer}>
            <h1 className={styles.petitionTitle}>{petition.titre}</h1>
            <p className={styles.petitionDescription}>{petition.description}</p>
            <p className={styles.petitionDescription}> Auteur : {petition.auteur}</p>            
            <button className={styles.signButton}>Signer la pétition</button>
        </div> 
    );
}