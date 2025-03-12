'use client';

import { useEffect, useState } from "react";
import { Petition } from "@/modeles/Petition";
import Card from "./Card";
import styles from "../styles/home.module.css";
export default function Home() {
    const [petitions, setPetitions] = useState<Petition[]>([]);

    useEffect(() => {
        setPetitions([
            {
                id: 1,
                titre: "Stop the war",
                description: "We want to stop the war",
                signature: 2,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ",                
                auteur : "Flavio"
            },
            {
                id: 2,
                titre: "Stop the hunger",
                description: "We want to stop the hunger",
                signature: 7,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ",
                auteur : "Flavio"      
            },
            {
                id: 3,
                titre: "Stop the projet d'étude",
                description: "We want to stop the projet d'étude",
                signature: 1000,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ",
                auteur : "Flavio"        
            },
            {
                id: 4,
                titre: "Stop the pétitions",
                description: "We want to stop the pétitions",
                signature: 1000,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ",        
                auteur : "Flavio"
            },
            {
                id: 5,
                titre: "Stop the long texts",
                description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed faucibus lorem. Curabitur efficitur facilisis placerat. Donec efficitur enim volutpat, scelerisque odio vel, cursus risus. Vivamus nunc erat, tincidunt aliquam velit vitae, ullamcorper hendrerit mauris. Aliquam nisi lectus, accumsan vel purus quis, interdum tincidunt justo. Praesent eu quam ultrices, tempor ligula in, tincidunt justo. Integer vitae felis convallis, lacinia lorem quis, porta neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc sed nisl sagittis, aliquet lorem nec, iaculis dolor. Maecenas vitae congue tellus. Mauris vestibulum dignissim libero id interdum.",
                signature: 2,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ",             
                auteur : "Flavio"
            }
        ]);
    }
    , []);
    const cards = petitions.map((petition) => (
        <div key={petition.id} className={styles.card}>
            <Card petition={petition}/>
        </div>
    ));

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Pétitions</h1>
            <input type="search" className={styles.search} placeholder="Search"/>
            <div className={styles.cards}>
                {cards}
            </div>
        </div>
  );
}
