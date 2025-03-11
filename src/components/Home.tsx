'use client';

import { useEffect, useState } from "react";
import { Petition } from "@/modeles/Petititon";
import Card from "./Card";
import styles from "../styles/home.module.css";
export default function Home() {
    const [petitions, setPetitions] = useState<Petition[]>([]);
    
    useEffect(() => {
        setPetitions([
            {
                id: 1,
                title: "Stop the war",
                description: "We want to stop the war",
                countSignature: 2,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ"                
            },
            {
                id: 2,
                title: "Stop the hunger",
                description: "We want to stop the hunger",
                countSignature: 7,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ"            
            },
            {
                id: 3,
                title: "Stop the projet d'étude",
                description: "We want to stop the projet d'étude",
                countSignature: 1000,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ"            
            },
            {
                id: 4,
                title: "Stop the pétitions",
                description: "We want to stop the pétitions",
                countSignature: 1000,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ"        
            },
            {
                id: 5,
                title: "Stop the long texts",
                description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed faucibus lorem. Curabitur efficitur facilisis placerat. Donec efficitur enim volutpat, scelerisque odio vel, cursus risus. Vivamus nunc erat, tincidunt aliquam velit vitae, ullamcorper hendrerit mauris. Aliquam nisi lectus, accumsan vel purus quis, interdum tincidunt justo. Praesent eu quam ultrices, tempor ligula in, tincidunt justo. Integer vitae felis convallis, lacinia lorem quis, porta neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc sed nisl sagittis, aliquet lorem nec, iaculis dolor. Maecenas vitae congue tellus. Mauris vestibulum dignissim libero id interdum.",
                countSignature: 2,
                imageSrc: "https://i.ytimg.com/vi/7KaZ-y7e9BQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD1rmpa1Juknv2ejLHrMwnx06b3SQ"             
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
            <h1 className={styles.title}>Petitions</h1>
            <input type="search" className={styles.search} placeholder="Search"/>
            <div className={styles.cards}>
                {cards}
            </div>
        </div>
  );
}
