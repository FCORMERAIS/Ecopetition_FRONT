'use client';
import DetailPetition from "@/components/DetailPetition";
import { Suspense } from "react";

export default function PublicationPage() {
    return(
        <Suspense fallback={<div>Chargement...</div>}>
        <DetailPetition />;
        </Suspense>
    );
}