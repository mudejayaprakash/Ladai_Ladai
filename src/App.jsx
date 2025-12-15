import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Setup from './pages/Setup';
import ErrorBoundary from './components/ErrorBoundary';
import Rules from './pages/Rules';
import ModeSelection from './pages/ModeSelection';
import GameArena from './pages/GameArena';
import Summary from './pages/Summary';

function App() {
  return (
    <GameProvider>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-game-dark text-white font-sans selection:bg-game-accent selection:text-game-dark overflow-hidden">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/modes" element={<ModeSelection />} />
              <Route path="/game" element={<GameArena />} />
              <Route path="/summary" element={<Summary />} />
            </Routes>
          </div>
        </Router>
      </ErrorBoundary>
    </GameProvider>
  );
}

export default App;
