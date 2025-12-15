import React, { createContext, useReducer, useContext } from 'react';

// Initial State
const initialState = {
    players: {
        p1: { name: '', id: null, ready: false },
        p2: { name: '', id: null, ready: false },
    },
    gameMode: null, // '10101', '1010', '101', '10'
    gameState: 'setup', // 'setup', 'playing', 'paused', 'finished'
    currentPhase: null, // Specific to mode (e.g., 'puzzle', 'sit', 'write')
    timer: 0, // Seconds remaining
    fightId: null, // Firestore Doc ID
};

// Actions
const ACTIONS = {
    SET_PLAYER: 'SET_PLAYER',
    SET_MODE: 'SET_MODE',
    START_GAME: 'START_GAME',
    PAUSE_GAME: 'PAUSE_GAME',
    RESUME_GAME: 'RESUME_GAME',
    END_GAME: 'END_GAME',
    UPDATE_TIMER: 'UPDATE_TIMER',
    SET_PHASE: 'SET_PHASE',
    ADD_LOG: 'ADD_LOG',
};

// Reducer
function gameReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_PLAYER:
            return {
                ...state,
                players: {
                    ...state.players,
                    [action.payload.player]: { ...state.players[action.payload.player], ...action.payload.data }
                }
            };
        case ACTIONS.SET_MODE:
            return {
                ...state,
                gameMode: action.payload,
                gameState: 'setup', // Reset game state when mode changes
                timer: 0 // Reset timer
            };
        case ACTIONS.START_GAME:
            return { ...state, gameState: 'playing' };
        case ACTIONS.PAUSE_GAME:
            return { ...state, gameState: 'paused' };
        case ACTIONS.RESUME_GAME:
            return { ...state, gameState: 'playing' };
        case ACTIONS.END_GAME:
            return { ...state, gameState: 'finished' };
        case ACTIONS.UPDATE_TIMER:
            return { ...state, timer: action.payload };
        case ACTIONS.SET_PHASE:
            return { ...state, currentPhase: action.payload };
        case ACTIONS.ADD_LOG:
            return {
                ...state,
                history: [...(state.history || []), {
                    timestamp: new Date(),
                    content: action.payload,
                    type: 'voice'
                }]
            };
        default:
            return state;
    }
}

// Context
const GameContext = createContext();

// Provider
export const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, initialState);

    const value = {
        state,
        setPlayer: (player, data) => dispatch({ type: ACTIONS.SET_PLAYER, payload: { player, data } }),
        setMode: (mode) => dispatch({ type: ACTIONS.SET_MODE, payload: mode }),
        startGame: () => dispatch({ type: ACTIONS.START_GAME }),
        pauseGame: () => dispatch({ type: ACTIONS.PAUSE_GAME }),
        resumeGame: () => dispatch({ type: ACTIONS.RESUME_GAME }),
        endGame: () => dispatch({ type: ACTIONS.END_GAME }),
        updateTimer: (time) => dispatch({ type: ACTIONS.UPDATE_TIMER, payload: time }),
        setPhase: (phase) => dispatch({ type: ACTIONS.SET_PHASE, payload: phase }),
        addLog: (content) => dispatch({ type: ACTIONS.ADD_LOG, payload: content }),
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

// Hook
export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
