import { auth } from '../firebase';
import { signInAnonymously } from "firebase/auth";

export const signInPlayer = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in anonymously:", error);
        throw error;
    }
};
