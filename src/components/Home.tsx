'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Petition } from "@/modeles/Petititon";
import Card from "./Card";

export default function Home() {
    const [petitions, setPetitions] = useState<Petition[]>([]);

    useEffect(() => {
        setPetitions([
            {
                id: 1,
                title: "Stop the war",
                description: "We want to stop the war",
                CountSignature: 2,
            },
            {
                id: 2,
                title: "Stop the hunger",
                description: "We want to stop the hunger",
                CountSignature: 7,
            },
            {
                id: 3,
                title: "Stop the projet d'étude",
                description: "We want to stop the projet d'étude",
                CountSignature: 1000,
            },
        ]);
    }, []);

    return (
        <div className="container">
            <h1 className="title">Home</h1>
            <div className="grid">
                {petitions.map((petition) => (
                    <Link key={petition.id} href={`/detail?id=${petition.id}`} className="card-link">
                        <Card petition={petition} />
                    </Link>
                ))}
            </div>
        </div>
    );
}
