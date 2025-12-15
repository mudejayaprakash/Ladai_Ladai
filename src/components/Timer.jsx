import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameTimer } from '../hooks/useGameTimer';
import { Clock } from 'lucide-react';

export const TimerDisplay = ({ label, totalTime }) => {
    const timeLeft = useGameTimer();

    // If totalTime is provided, we can show progress. 
    // For now, simple text display.
    // Format MM:SS
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Animated Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <motion.circle
                        cx="128" cy="128" r="120" stroke="currentColor" strokeWidth="8" fill="transparent"
                        className="text-game-accent"
                        initial={{ pathLength: 1 }}
                        animate={{ pathLength: totalTime > 0 ? timeLeft / totalTime : 0 }}
                        transition={{ duration: 1, ease: "linear" }}
                    />
                </svg>

                <div className="text-center z-10">
                    <span className="block text-6xl font-mono font-bold tracking-tighter">
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                    <span className="text-slate-400 text-sm uppercase tracking-widest">{label || "Remaining"}</span>
                </div>
            </div>
        </div>
    );
};
