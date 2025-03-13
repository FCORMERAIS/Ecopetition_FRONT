'use client';
import DetailPetition from "@/components/DetailPetition";
import { Suspense } from "react";

export default function PublicationPage() {
    return(
        <div>

    <p>bonjour</p>
        <Suspense fallback={<div>Chargement...</div>}>
        <DetailPetition />;
        </Suspense>
        </div>
    );
}