import { auth } from '../firebase';
import { signInAnonymously } from "firebase/auth";

export const signInPlayer = async () => {
    try {
        const userCredential = await signInAnonymously(auth);
        return userCredential.user;
    } catch (error) {
        console.error("Error signing in anonymously:", error);
        // Fallback for development/demo if Auth is not enabled
        console.warn("Falling back to MOCK USER authentication. Firebase Auth might not be enabled.");
        return {
            uid: "mock-user-" + Date.now(),
            isAnonymous: true,
            displayName: "Guest User"
        };
    }
};
