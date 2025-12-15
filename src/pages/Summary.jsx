import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Star, MessageCircle, BarChart2, CheckCircle, XCircle } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { analyzeConflict } from '../services/llm';

const Summary = () => {
    const navigate = useNavigate();
    const { state } = useGame();
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            // Use mock history if empty for demo purposes
            const historyToAnalyze = state.history && state.history.length > 0
                ? state.history
                : [{ player: 'System', text: 'No conversation recorded.' }];

            const result = await analyzeConflict(historyToAnalyze);
            setAnalysis(result);
            setLoading(false);
        };
        fetchAnalysis();
    }, [state.history]);

    return (
        <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-slate-900 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl text-center space-y-8"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-game-accent to-game-success">
                        {loading ? "Analyzing..." : (analysis?.resolved ? "Conflict Resolved" : "Conflict Unresolved")}
                    </h1>
                    <p className="text-xl text-slate-400">
                        {loading ? "Generating final report..." : analysis?.closing || "Well done on taking the time to de-escalate."}
                    </p>
                </div>

                {/* AI Analysis Card */}
                {!loading && analysis && (
                    <div className="bg-slate-800/50 rounded-3xl p-6 border border-slate-700 text-left">
                        <h3 className="text-xl font-bold mb-4 text-purple-400">Mediation Summary</h3>
                        <p className="text-sm text-slate-300 mb-4">{analysis.summary}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="bg-slate-900 p-3 rounded-lg">
                                <strong className="block text-slate-500 mb-1">Player 1 Perspective</strong>
                                {analysis.p1_summary}
                            </div>
                            <div className="bg-slate-900 p-3 rounded-lg">
                                <strong className="block text-slate-500 mb-1">Player 2 Perspective</strong>
                                {analysis.p2_summary}
                            </div>
                        </div>
                    </div>
                )}

                {/* Stats Card */}
                <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
                    <h3 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2">
                        <BarChart2 className="text-purple-500" /> Session Stats
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-900 p-4 rounded-xl">
                            <div className="text-4xl font-mono font-bold text-game-accent">High</div>
                            <div className="text-xs uppercase tracking-widest text-slate-500 mt-1">Dignity Score</div>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-xl">
                            <div className="text-4xl font-mono font-bold text-pink-500">
                                {loading ? "..." : (analysis?.resolved ? "RESOLVED" : "OPEN")}
                            </div>
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
