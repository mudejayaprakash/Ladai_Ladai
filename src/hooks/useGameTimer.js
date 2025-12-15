import { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';

export const useGameTimer = () => {
    const { state, updateTimer } = useGame();
    const { timer, gameState } = state;
    const intervalRef = useRef(null);

    useEffect(() => {
        if (gameState === 'playing' && timer > 0) {
            intervalRef.current = setInterval(() => {
                // We rely on the context's timer state updating triggers re-render 
                // and re-setup of effect.
                updateTimer(timer - 1);
            }, 1000);
        }

        return () => clearInterval(intervalRef.current);
    }, [gameState, timer, updateTimer]);

    return timer;
};
