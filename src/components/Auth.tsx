import {jwtDecode} from "jwt-decode"; 

interface JwtPayload {
    user_id: number; 
}

export function getUserIdFromToken(): number | null {
    try {
        const token = localStorage.getItem("access_token"); // Récupère le token
        if (!token) return null;

        const decoded: JwtPayload = jwtDecode(token); // Décode le token
        return decoded.user_id || null; // Retourne user_id s'il existe
    } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        return null;
    }
}
