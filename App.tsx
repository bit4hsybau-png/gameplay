
import React, { useState } from 'react';
import TicTacToe from './components/TicTacToe';
import MemoryGame from './components/MemoryGame';
import GameSelector from './components/GameSelector';

export type Game = 'menu' | 'tictactoe' | 'memory';

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<Game>('menu');

  const renderGame = () => {
    switch (activeGame) {
      case 'tictactoe':
        return <TicTacToe onBackToMenu={() => setActiveGame('menu')} />;
      case 'memory':
        return <MemoryGame onBackToMenu={() => setActiveGame('menu')} />;
      case 'menu':
      default:
        return <GameSelector onSelectGame={setActiveGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
      <header className="w-full max-w-4xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Game Hub
        </h1>
        <p className="text-slate-400 mt-2 text-lg">Choose a game and start playing!</p>
      </header>
      <main className="w-full flex-grow flex items-center justify-center">
        {renderGame()}
      </main>
      <footer className="w-full text-center p-4 text-slate-500 mt-8">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
