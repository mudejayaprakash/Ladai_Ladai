import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

export const createFight = async (player1Data, player2Data, rules) => {
    try {
        const docRef = await addDoc(collection(db, "fights"), {
            createdAt: new Date(),
            players: {
                p1: player1Data,
                p2: player2Data
            },
            rules: rules,
            status: 'setup',
            mode: null,
            history: []
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        // Fallback for development/demo if DB is not writable
        console.warn("Falling back to MOCK DB write. Firestore might not be writable.");
        return "mock-fight-" + Date.now();
    }
};

export const subscribeToFight = (fightId, callback) => {
    return onSnapshot(doc(db, "fights", fightId), (doc) => {
        if (doc.exists()) {
            callback({ id: doc.id, ...doc.data() });
        }
    });
};

export const updateFightState = async (fightId, data) => {
    const fightRef = doc(db, "fights", fightId);
    await updateDoc(fightRef, data);
}
