import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Button } from '../components/Button';
import { Zap, Brain, Activity, Flower2 } from 'lucide-react';

const ModeCard = ({ mode, title, duration, description, icon: Icon, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="bg-slate-800 border-2 border-slate-700 hover:border-game-accent rounded-2xl p-6 cursor-pointer transition-all group"
    >
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-slate-900 text-game-accent group-hover:bg-game-accent group-hover:text-game-dark transition-colors`}>
                <Icon size={24} />
            </div>
            <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-slate-400">{duration}</span>
        </div>
        <h3 className="text-xl font-bold mb-1 group-hover:text-game-accent transition-colors">{title}</h3>
        <code className="text-sm text-slate-500 block mb-2">{mode}</code>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
);

const ModeSelection = () => {
    const navigate = useNavigate();
    const { setMode } = useGame();

    const handleSelectMode = (mode) => {
        setMode(mode);
        // Navigate to confirmation or straight to game
        navigate('/game');
    };

    return (
        <div className="min-h-screen p-8 flex flex-col items-center justify-center">
            <div className="text-center mb-12 max-w-2xl">
                <h2 className="text-4xl font-bold mb-4">Choose Your Arena</h2>
                <p className="text-slate-400">Select a game mode that fits the intensity and available time for your conflict.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
                <ModeCard
                    mode="10101"
                    title="Fight the World (Marathon)"
                    duration="60 mins"
                    description="Deep dive. Logic + Emotion. Puzzle, Reflection, Writing, Exchange, Conversation. 3 sessions."
                    icon={Brain}
                    onClick={() => handleSelectMode('10101')}
                />
                <ModeCard
                    mode="1010"
                    title="Blitz Fight"
                    duration="20 mins"
                    description="Direct engagement. 10 mins each. Strict adherence to agreed rules."
                    icon={Zap}
                    onClick={() => handleSelectMode('1010')}
                />
                <ModeCard
                    mode="101"
                    title="Rapid Resolution"
                    duration="101 secs"
                    description="Super fast conclusion. Get to the point immediately. 101 seconds each."
                    icon={Activity}
                    onClick={() => handleSelectMode('101')}
                />
                <ModeCard
                    mode="10"
                    title="Fight the Self (Zen)"
                    duration="Variable"
                    description="Deep breaths, mantras, and positive vibes. Recenter yourself."
                    icon={Flower2}
                    onClick={() => handleSelectMode('10')}
                />
            </div>
        </div>
    );
};

export default ModeSelection;
