import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { TimerDisplay } from '../components/Timer';
import { Button } from '../components/Button';
import { Pause, Play, Hand, MessageSquare } from 'lucide-react';

const GameArena = () => {
    const { state, startGame, pauseGame, resumeGame, updateTimer, endGame } = useGame();
    const { gameMode, gameState, timer } = state;
    const navigate = useNavigate();

    // Redirect if no mode selected
    useEffect(() => {
        if (!gameMode) {
            // For prototype testing, if we land here directly, default to 1010
            // navigate('/modes');
        }
    }, [gameMode, navigate]);

    // Initial Timer Setup based on Mode (Hook effect?)
    useEffect(() => {
        if (gameState === 'setup' && gameMode) {
            // Set initial time
            if (gameMode === '1010') updateTimer(600); // 10 mins
            if (gameMode === '101') updateTimer(101);
            if (gameMode === '10101') updateTimer(180); // Start with 3 min puzzle
            startGame();
        }
    }, [gameMode, gameState, updateTimer, startGame]);

    const handleBorrowTime = (minutes) => {
        updateTimer(timer + (minutes * 60));
    };

    const handleEndFight = () => {
        endGame();
        navigate('/summary');
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-white">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                <h1 className="text-xl font-bold text-game-accent">ARENA: {gameMode}</h1>
                <Button variant="outline" size="sm" onClick={() => navigate('/summary')}>Quit</Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-evenly p-6">

                {/* Visual Timer */}
                <div className="scale-110 md:scale-150">
                    <TimerDisplay totalTime={gameMode === '1010' ? 600 : 100} />
                </div>

                {/* Controls */}
                <div className="w-full max-w-md grid grid-cols-2 gap-4">
                    <Button
                        onClick={gameState === 'playing' ? pauseGame : resumeGame}
                        className="flex items-center justify-center gap-2"
                    >
                        {gameState === 'playing' ? <><Pause /> Pause</> : <><Play /> Resume</>}
                    </Button>

                    <Button variant="danger" onClick={handleEndFight}>
                        End Fight
                    </Button>
                </div>

                {/* Feature Buttons */}
                <div className="grid grid-cols-3 gap-2 w-full max-w-lg mt-8">
                    <button
                        onClick={() => handleBorrowTime(1)}
                        className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition flex flex-col items-center gap-2"
                    >
                        <Clock size={20} className="text-game-accent" />
                        <span className="text-xs">Borrow +1m</span>
                    </button>
                    <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition flex flex-col items-center gap-2">
                        <Hand size={20} className="text-yellow-500" />
                        <span className="text-xs">Raise Hand</span>
                    </button>
                    <button className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition flex flex-col items-center gap-2">
                        <MessageSquare size={20} className="text-pink-500" />
                        <span className="text-xs">Repetition Signal</span>
                    </button>
                </div>
            </div>

            {/* Status Bar */}
            <div className="p-4 bg-black/30 text-center text-sm text-slate-500">
                Play fair. Keep your dignity score high.
            </div>
        </div>
    );
};

export default GameArena;
