import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { signInPlayer } from '../services/auth';
import { createFight } from '../services/db';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { User, Calendar, MapPin, MessageCircle } from 'lucide-react';

const Setup = () => {
    const navigate = useNavigate();
    const { setPlayer } = useGame();
    const [step, setStep] = useState(1); // 1: Demographics, 2: Mode/Lobby
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        location: '',
        communicationMode: 'verbal', // written, verbal, combination
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDemographicsSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 1. Auth (Anonymous)
            const user = await signInPlayer();

            // 2. Save to Context
            setPlayer('p1', { ...formData, id: user.uid });

            // 3. Move to next step
            setStep(2);
        } catch (error) {
            console.error(error);
            alert("Failed to sign in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateGame = async () => {
        // Navigate to Rules/Mode selection, passing intent
        // For now, simpler: Create fight doc directly with defaults and go to lobby?
        // User needs to select Mode first.
        // Let's go to a Mode Selection View in the same component or route.
        // I'll simulate going to Game directly for prototype speed, but ideally Mode Selection.
        // Let's set some defaults and go to GameArena for now, or redirect to a 'Select Mode' step.

        // For this prototype, I'll just create a placeholder fight and navigate.
        try {
            setLoading(true);
            // Navigate to Rules first to set up the game boundaries
            navigate('/rules');
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl"
            >
                {step === 1 && (
                    <form onSubmit={handleDemographicsSubmit} className="space-y-6">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-game-accent to-purple-500">
                                Player Profile
                            </h2>
                            <p className="text-slate-400 text-sm mt-2">Tell us a bit about yourself to begin.</p>
                        </div>

                        <div className="space-y-4">
                            <Input
                                id="name" name="name" label="Name"
                                placeholder="Enter your name"
                                value={formData.name} onChange={handleChange} required
                            />

                            <Input
                                id="dob" name="dob" type="date" label="Date of Birth"
                                value={formData.dob} onChange={handleChange} required
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    id="gender" name="gender" label="Gender" placeholder="Self-identified"
                                    value={formData.gender} onChange={handleChange}
                                />
                                <Input
                                    id="location" name="location" label="Location" placeholder="City"
                                    value={formData.location} onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-slate-300">Preferred Communication</label>
                                <select
                                    name="communicationMode"
                                    value={formData.communicationMode} onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-game-accent"
                                >
                                    <option value="verbal">Verbal</option>
                                    <option value="written">Written</option>
                                    <option value="combination">Combination</option>
                                </select>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Processing...' : 'Continue'}
                        </Button>
                    </form>
                )}

                {step === 2 && (
                    <div className="space-y-6 text-center">
                        <h2 className="text-3xl font-bold text-white">Choose your Path</h2>
                        <div className="grid gap-4">
                            <Button onClick={handleCreateGame} variant="primary" className="w-full py-4 text-lg">
                                Start New Fight
                            </Button>
                            <Button onClick={() => alert("Join logic WIP")} variant="outline" className="w-full py-4 text-lg">
                                Join Existing Fight
                            </Button>
                            <Button onClick={() => navigate('/game')} variant="secondary" className="w-full py-4 text-lg">
                                Solo Mode (Fight the Self)
                            </Button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Setup;
