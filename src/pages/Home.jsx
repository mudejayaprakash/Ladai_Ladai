import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sword, Heart, Scale } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center space-y-12 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-slate-950">

            {/* Hero Section */}
            <div className="space-y-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative inline-block"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-game-accent to-purple-600 rounded-lg blur opacity-30 animate-pulse-slow"></div>
                    <h1 className="relative text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-game-accent to-purple-400">
                        LADAI <span className="text-white">×</span> LADAI
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-2xl md:text-3xl font-light text-slate-300"
                >
                    Waqt - waqt ka khel!
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Transform conflict into connection. A gamified approach to de-escalate fights,
                    find win-win solutions, and build emotional intelligence.
                </motion.p>
            </div>

            {/* Feature Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
            >
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <Sword className="w-10 h-10 text-game-danger mb-4 mx-auto" />
                    <h3 className="text-xl font-bold mb-2">Fair Fight</h3>
                    <p className="text-sm text-slate-400">Structured time limits and turn-taking ensure everyone is heard.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <Heart className="w-10 h-10 text-pink-500 mb-4 mx-auto" />
                    <h3 className="text-xl font-bold mb-2">Emotional Awareness</h3>
                    <p className="text-sm text-slate-400">Pause, reflect, and identify what you're truly feeling.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <Scale className="w-10 h-10 text-game-success mb-4 mx-auto" />
                    <h3 className="text-xl font-bold mb-2">Win-Win Solutions</h3>
                    <p className="text-sm text-slate-400">Collaborate to find outcomes where both sides win.</p>
                </div>
            </motion.div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
            >
                <Link to="/setup" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-game-accent font-lg rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-game-accent hover:bg-sky-500 hover:scale-105">
                    <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                    <span className="relative text-game-dark text-lg uppercase tracking-widest">Enter the Arena</span>
                </Link>
            </motion.div>
        </div>
    );
};

export default Home;
