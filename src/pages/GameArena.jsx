import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { TimerDisplay } from '../components/Timer';
import { Button } from '../components/Button';
import { Pause, Play, Hand, MessageSquare, Clock, Mic, MicOff } from 'lucide-react';
import { summarizeTurn, suggestQuestions } from '../services/llm';

const GameArena = () => {
    const { state, startGame, pauseGame, resumeGame, updateTimer, endGame, addLog } = useGame();
    const { isListening, transcript, startListening, stopListening, isSupported, resetTranscript } = useVoiceInput();
    const { gameMode, gameState, timer, history } = state;
    const navigate = useNavigate();

    const [suggestions, setSuggestions] = React.useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = React.useState(false);

    const handleSuggestQuestion = async () => {
        setLoadingSuggestions(true);
        // Use history from context, fallback to empty if undefined
        const currentHistory = history || [];
        const questions = await suggestQuestions(currentHistory);
        setSuggestions(questions);
        setLoadingSuggestions(false);
    };

    // Redirect logic safety
    useEffect(() => {
        // Only redirect if absolutely necessary after a timeout, 
        // to avoid instant loops if state is slow to hydrate? 
        // Better: Show a "Go Back" button if mode is invalid.
    }, [gameMode]);

    if (!gameMode) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-6 text-center">
                <h2 className="text-2xl font-bold text-game-danger mb-4">No Game Mode Selected</h2>
                <p className="text-slate-400 mb-8">Please return to the selection menu.</p>
                <Button onClick={() => navigate('/modes')}>Select Mode</Button>
            </div>
        );
    }

    // Initial Timer Setup based on Mode
    useEffect(() => {
        if (gameState === 'setup' && gameMode) {
            // Set initial time
            if (gameMode === '1010') updateTimer(600); // 10 mins
            if (gameMode === '101') updateTimer(101);
            if (gameMode === '10101') updateTimer(180); // Start with 3 min puzzle
            startGame();
        }
    }, [gameMode, gameState, updateTimer, startGame]);

    // Sync transcript to game log when listening stops or periodically
    useEffect(() => {
        if (transcript) {
            // In a real app we might debouce this or save on specific words
            // For now, let's just log it if it's long enough
        }
    }, [transcript]);

    const handleBorrowTime = (minutes) => {
        updateTimer(timer + (minutes * 60));
        addLog(`Borrowed ${minutes} minute(s)`);
    };

    const handleEndFight = () => {
        endGame();
        navigate('/summary');
    };

    const toggleVoice = async () => {
        if (isListening) {
            stopListening();
            if (transcript) {
                addLog(`Voice: ${transcript}`);

                // Summarize the point
                // TODO: Get actual active player name from context
                const summary = await summarizeTurn(transcript, "Player");
                addLog(`Summary: ${summary}`);
            }
        } else {
            resetTranscript();
            startListening();
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-900 text-white overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex justify-between items-center shrink-0">
                <h1 className="text-xl font-bold text-game-accent">ARENA: {gameMode}</h1>
                <Button variant="outline" size="sm" onClick={() => navigate('/summary')}>Quit</Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-start md:justify-evenly p-6 gap-6 md:gap-0">

                {/* Visual Timer */}
                <div className="scale-110 md:scale-150 mt-4 md:mt-0">
                    <TimerDisplay totalTime={gameMode === '1010' ? 600 : (gameMode === '10101' ? 180 : 101)} />
                </div>

                {/* Voice Feedback Area */}
                <div className="min-h-[3rem] flex items-center justify-center text-center text-sm text-slate-400 max-w-md px-4">
                    {isListening ? (
                        <span className="animate-pulse text-game-accent">{transcript || "Listening..."}</span>
                    ) : (
                        <span>{transcript ? `Last recorded: "${transcript}"` : "Click microphone to record"}</span>
                    )}
                </div>

                {/* Controls */}
                <div className="w-full max-w-md grid grid-cols-3 gap-4">
                    <Button
                        onClick={gameState === 'playing' ? pauseGame : resumeGame}
                        className="flex items-center justify-center gap-2"
                    >
                        {gameState === 'playing' ? <><Pause size={20} /></> : <><Play size={20} /></>}
                    </Button>

                    <Button
                        variant={isListening ? "danger" : "secondary"}
                        onClick={toggleVoice}
                        disabled={!isSupported}
                        className="flex items-center justify-center gap-2"
                    >
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </Button>

                    <Button variant="danger" onClick={handleEndFight}>
                        End
                    </Button>
                </div>

                {/* Feature Buttons */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg mt-4 md:mt-8 pb-4">
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
                    <button
                        onClick={handleSuggestQuestion}
                        disabled={loadingSuggestions}
                        className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 transition flex flex-col items-center gap-2 relative overflow-hidden"
                    >
                        {loadingSuggestions && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
                        <MessageCircle size={20} className="text-blue-400" />
                        <span className="text-xs">Suggest Qs</span>
                    </button>
                </div>

                {/* Suggestions Display */}
                {suggestions.length > 0 && (
                    <div className="w-full max-w-lg mt-4 space-y-2 animate-in fade-in slide-in-from-bottom-4">
                        <h3 className="text-xs uppercase text-slate-500 font-bold ml-1">Suggested Questions</h3>
                        {suggestions.map((q, i) => (
                            <div key={i} className="p-3 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-slate-200">
                                "{q}"
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div className="p-4 bg-black/30 text-center text-sm text-slate-500">
                Play fair. Keep your dignity score high.
            </div>
        </div>
    );
};

export default GameArena;
