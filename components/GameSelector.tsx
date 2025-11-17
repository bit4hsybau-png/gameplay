
import React from 'react';
import { Game } from '../App';

interface GameSelectorProps {
  onSelectGame: (game: Game) => void;
}

const GameCard: React.FC<{ title: string; description: string; onClick: () => void; }> = ({ title, description, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-slate-800 rounded-xl p-6 cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out border border-slate-700 hover:border-purple-500 shadow-lg hover:shadow-purple-500/20"
    >
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);


const GameSelector: React.FC<GameSelectorProps> = ({ onSelectGame }) => {
  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="grid grid-cols-1 gap-6">
        <GameCard 
            title="Tic-Tac-Toe"
            description="The classic game of X's and O's. Get three in a row to win!"
            onClick={() => onSelectGame('tictactoe')}
        />
        <GameCard 
            title="Memory Game"
            description="Test your memory by matching pairs of cards."
            onClick={() => onSelectGame('memory')}
        />
      </div>
    </div>
  );
};

export default GameSelector;
