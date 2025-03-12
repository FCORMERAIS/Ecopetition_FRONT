import Image from 'next/image';
import profilePic from '../asset/profile.png'; // Import direct
import styles from '../styles/header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>EcoPetition</div>
            <div className={styles.profile}>
                <Image src={profilePic} alt="Profile"  className={styles.profilePic}
                />
            </div>
        </header>
    );
}
