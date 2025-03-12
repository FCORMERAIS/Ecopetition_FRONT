"use client";

import { useState, useEffect } from "react";
import PrivacyContent from "./confidentialite";
import Link from "next/link";

export default function Footer() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <div className="popup-footer">
            <div className="footer-links">
                <p className="privacy-text" onClick={openPopup}>
                    Politique de confidentialité
                </p>
                <span className="separator">|</span>
                <Link href="/about" className="about-text" style={{ color: "#3490dc" }}>
                    À Propos
                </Link>
            </div>

            {isClient && isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <PrivacyContent />
                        <button onClick={closePopup} className="popup-close-btn">
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .popup-footer {
                    position: relative;
                    padding: 1.5rem;
                    width: 100%;
                    background-color: #333333;
                    text-align: center;
                }

                .footer-links {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 15px;
                }

                .privacy-text,
                .about-text {
                    color: #3490dc;
                    cursor: pointer;
                    transition: text-decoration 0.3s ease;
                }

                .privacy-text:hover,
                .about-text:hover {
                    text-decoration: underline;
                }

                .separator {
                    color: #ffffff;
                    font-weight: bold;
                }

                .popup-overlay {
                    position: fixed;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 50;
                }

                .popup-content {
                    background-color: #fff;
                    padding: 1.5rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                }

                .popup-close-btn {
                    margin-top: 1.5rem;
                    width: 100%;
                    padding: 0.5rem;
                    background-color: #3490dc;
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }

                .popup-close-btn:hover {
                    background-color: #2779bd;
                }
            `}</style>
        </div>
    );
}
