import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Shield, AlertCircle } from 'lucide-react';

const Rules = () => {
    const navigate = useNavigate();
    const [boundaries, setBoundaries] = useState({
        noShouting: false,
        noNameCalling: false,
        noPastBringing: false,
        takeTurns: true,
        listenToUnderstand: true,
    });

    const toggleBoundary = (key) => {
        setBoundaries(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleNext = () => {
        // Save rules to context here (TODO)
        navigate('/modes');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl"
            >
                <div className="flex items-center gap-4 mb-6">
                    <Shield className="w-8 h-8 text-game-accent" />
                    <h2 className="text-3xl font-bold text-white">Non-Negotiable Boundaries</h2>
                </div>
                <p className="text-slate-400 mb-8">Establish the rules of engagement before you enter the arena. Both parties must agree.</p>

                <div className="grid gap-4 mb-8">
                    {[
                        { id: 'noShouting', label: 'No Shouting', icon: 'VolumeX' },
                        { id: 'noNameCalling', label: 'No Name Calling', icon: 'UserX' },
                        { id: 'noPastBringing', label: 'Stay in the Present (No bringing up past)', icon: 'Clock' },
                        { id: 'takeTurns', label: 'Respect Turn Taking', icon: 'RefreshCw' },
                        { id: 'listenToUnderstand', label: 'Listen to Understand, Not to Respond', icon: 'Ear' },
                    ].map((rule) => (
                        <div
                            key={rule.id}
                            onClick={() => toggleBoundary(rule.id)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${boundaries[rule.id]
                                    ? 'border-game-success bg-game-success/10'
                                    : 'border-slate-700 hover:border-slate-500'
                                }`}
                        >
                            <span className="font-medium text-lg">{rule.label}</span>
                            {boundaries[rule.id] && <div className="w-4 h-4 rounded-full bg-game-success shadow-[0_0_10px_theme(colors.green.500)]" />}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-4">
                    <Button onClick={handleNext} variant="primary" className="w-full md:w-auto">
                        Confirm & Select Mode
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default Rules;
