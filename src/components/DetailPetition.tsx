'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Petition } from "@/modeles/Petititon";

export default function DetailPetition() {
    const searchParams = useSearchParams();
    const petitionId = searchParams.get('id');

    const [petition, setPetition] = useState<Petition | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (petitionId) {
            const fetchPetition = async () => {
                try {
                    const response = await fetch(` http://app-20ce8ab4-2f87-49c9-a647-2a5fbcdfacbc.cleverapps.io/api/petitions/${petitionId}`);
                    if (!response.ok) throw new Error("Failed to fetch petition");
                    
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
        <div>
            <h1>Petition : {petition.title}</h1>
            <p>description : {petition.description}</p>
            <p><strong>Signatures :</strong> {petition.CountSignature}</p>
        </div>
    );
}
