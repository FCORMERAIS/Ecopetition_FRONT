'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Petition } from "@/modeles/Petition";
import styles from "../styles/detail.module.css";
import { getUserIdFromToken } from "./Auth";

interface Comment {
    id: number;
    auteur: string;
    message: string;
    date: string;
}

export default function DetailPetition() {
    const searchParams = useSearchParams();
    const petitionId = searchParams.get('id');
    const [userId, setUserId] = useState<number | null>(null);
    const [signaturesCount, setSignaturesCount] = useState<number | null>(null);

    useEffect(() => {
        const id = getUserIdFromToken();
        setUserId(id);
    }, []);

    const [petition, setPetition] = useState<Petition | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isSigning, setIsSigning] = useState(false);
    const [hasSigned, setHasSigned] = useState(false);
    
    // Récupération des données de la pétition
    useEffect(() => {
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

    useEffect(() => {
        if (petitionId) {
            const fetchSignaturesCount = async () => {
                try {
                    const response = await fetch(`/api/petitions/${petitionId}/sign_count`);
                    if (!response.ok) throw new Error("Échec de la récupération du nombre de signatures");
    
                    const data = await response.json();
                    setSignaturesCount(data.count); // Assurez-vous que l'API retourne { count: X }
                } catch (err) {
                    console.error("Erreur lors de la récupération du nombre de signatures:", err);
                }
            };
    
            fetchSignaturesCount();
        }
    }, [petitionId, hasSigned]); // Met à jour après signature/désinscription

    // Récupération des commentaires associés à la pétition
    useEffect(() => {
        if (petitionId) {
            const fetchComments = async () => {
                try {
                    const response = await fetch(`/api/petitions/${petitionId}/comments`);
                    if (!response.ok) throw new Error("Échec du chargement des commentaires");
                    const data: Comment[] = await response.json();
                    setComments(data);
                } catch (err) {
                    console.error("Erreur lors de la récupération des commentaires:", err);
                }
            };

            fetchComments();
        }
    }, [petitionId]);


    // Fonction pour poster un commentaire
    const handlePostComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await fetch(`/api/messagerie/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ petition_id : petitionId ,message: newComment }),
            });

            if (!response.ok) throw new Error("Échec de l'ajout du commentaire");

            const addedComment: Comment = await response.json();
            setComments(prev => [...prev, addedComment]);
            setNewComment("");
        } catch (err) {
            console.error("Erreur lors de l'ajout du commentaire:", err);
        }
    };

    // Fonction pour signer la pétition
    const handleSignPetition = async () => {
        if (!petitionId || isSigning) return;

        setIsSigning(true);

        try {
            const response = await fetch(`/api/petitions/${petitionId}/sign`, {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id: userId }),
            });

            if (!response.ok) throw new Error(hasSigned ? "Échec de la suppression de la signature" : "Échec de la signature");

            // Mise à jour de l'état
            setHasSigned(!hasSigned);
            setPetition(prev => prev ? { ...prev, signature: prev.signature + (hasSigned ? -1 : 1) } : prev);
        } catch (err) {
            console.error("Erreur lors de la gestion de la signature:", err);
        } finally {
            setIsSigning(false);
        }
    };

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!petition) return <p>Aucune pétition trouvée.</p>;

    return (
        <div className={styles.petitionContainer}>
            <h1 className={styles.petitionTitle}>{petition.titre}</h1>
            <p className={styles.petitionDescription}>{petition.description}</p>
            <p className={styles.petitionDescription}> Auteur : {petition.auteur}</p>            
            <p className={styles.petitionDescription}> Nombre de signatures : {signaturesCount}</p>            
            <button 
                className={styles.signButton} 
                onClick={handleSignPetition} 
                disabled={isSigning}
            >
                {"Signer la pétition"}
            </button>

            {/* Section des commentaires */}
            <div className={styles.commentsSection}>
                <h2 className={styles.commentsTitle}>Commentaires</h2>
                {comments.length === 0 ? (
                    <p>Aucun commentaire pour l'instant.</p>
                ) : (
                    <ul className={styles.commentList}>
                        {comments.map(comment => (
                            <li key={comment.id} className={styles.commentItem}>
                                <p><strong>{comment.auteur}</strong> ({new Date(comment.date).toLocaleDateString()}):</p>
                                <p>{comment.message}</p>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Formulaire pour ajouter un commentaire */}
                <div className={styles.commentForm}>
                    <textarea
                        className={styles.commentInput}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Écrivez un commentaire..."
                    />
                    <button className={styles.commentButton} onClick={handlePostComment}>Envoyer</button>
                </div>
            </div>
        </div> 
    );
}
