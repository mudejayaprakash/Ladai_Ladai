import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Star, MessageCircle, BarChart2 } from 'lucide-react';

const Summary = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    return (
        <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-slate-900 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl text-center space-y-8"
            >
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-accent to-game-success">
                    Fight Resolved
                </h1>
                <p className="text-xl text-slate-400">
                    Well done on taking the time to de-escalate.
                </p>

                {/* Stats Card */}
                <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
                    <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                        <BarChart2 className="text-purple-500" /> Session Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-slate-900 p-4 rounded-xl">
                            <div className="text-4xl font-mono font-bold text-game-accent">High</div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Dignity Score</div>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-xl">
                            <div className="text-4xl font-mono font-bold text-pink-500">Wait</div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Outcome Status</div>
                        </div>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="space-y-4 text-left">
                    <label className="block text-lg font-medium">Rate your opponent's conduct:</label>
                    <div className="flex justify-center gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={32}
                                className={`cursor-pointer transition-colors ${rating >= star ? 'fill-yellow-500 text-yellow-500' : 'text-slate-600'}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>

                    <textarea
                        className="w-full h-32 bg-slate-800 rounded-xl border border-slate-700 p-4 text-white focus:ring-2 focus:ring-game-accent outline-none mt-4"
                        placeholder="What did you learn about yourself? (Private reflection)"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>

                <Button onClick={() => navigate('/')} className="w-full py-4 text-lg">
                    Complete & Return Home
                </Button>

            </motion.div>
        </div>
    );
};

export default Summary;
