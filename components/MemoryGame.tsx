
import React, { useState, useEffect, useCallback } from 'react';
import { MemoryCard } from '../types';

interface MemoryGameProps {
  onBackToMenu: () => void;
}

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const createShuffledBoard = (): MemoryCard[] => {
  const cards = [...EMOJIS, ...EMOJIS]
    .map((emoji, index) => ({
      id: index,
      value: emoji,
      isFlipped: false,
      isMatched: false,
    }))
    .sort(() => Math.random() - 0.5);
  return cards;
};

const Card: React.FC<{ card: MemoryCard; onClick: () => void; isDisabled: boolean; }> = ({ card, onClick, isDisabled }) => (
    <button className="w-20 h-20 sm:w-24 sm:h-24 [perspective:1000px]" onClick={onClick} disabled={isDisabled || card.isFlipped}>
        <div className={`relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 ${card.isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
            {/* Front of card */}
            <div className="absolute w-full h-full [backface-visibility:hidden] bg-slate-700 rounded-lg flex items-center justify-center text-3xl font-bold text-blue-400 cursor-pointer hover:bg-slate-600">
                ?
            </div>
            {/* Back of card */}
            <div className={`absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-800 rounded-lg flex items-center justify-center text-4xl sm:text-5xl ${card.isMatched ? 'border-2 border-green-500' : 'border-2 border-purple-500'}`}>
                {card.value}
            </div>
        </div>
    </button>
);

const MemoryGame: React.FC<MemoryGameProps> = ({ onBackToMenu }) => {
  const [cards, setCards] = useState<MemoryCard[]>(createShuffledBoard());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const resetGame = useCallback(() => {
    setCards(createShuffledBoard());
    setFlippedIndices([]);
    setMoves(0);
    setIsChecking(false);
    setIsGameOver(false);
  }, []);
  
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
        setTimeout(() => setIsGameOver(true), 500);
    }
  }, [cards]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      setIsChecking(true);
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.value === secondCard.value) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.value === firstCard.value ? { ...card, isMatched: true } : card
          )
        );
        setFlippedIndices([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map((card, index) =>
              index === firstIndex || index === secondIndex
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedIndices([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedIndices, cards]);

  const handleCardClick = (index: number) => {
    if (isChecking || cards[index].isFlipped || flippedIndices.length === 2) {
      return;
    }

    if (flippedIndices.length === 0) {
        setMoves(prev => prev + 1);
    }
    
    setCards(prevCards =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedIndices(prev => [...prev, index]);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
        <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-2 text-white">Memory Game</h2>
            <p className="text-xl text-slate-300">Moves: {moves}</p>
        </div>

        {isGameOver ? (
            <div className="text-center p-8 bg-slate-800 rounded-lg shadow-lg">
                <h3 className="text-4xl font-bold text-green-400 mb-4">You Won!</h3>
                <p className="text-slate-300 text-lg mb-6">Congratulations! You matched all pairs in {moves} moves.</p>
                <button
                    onClick={resetGame}
                    className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-all"
                >
                    Play Again
                </button>
            </div>
        ) : (
             <div className="grid grid-cols-4 gap-3 sm:gap-4 p-4 bg-slate-900/50 rounded-xl shadow-lg">
                {cards.map((card, index) => (
                    <Card key={card.id} card={card} onClick={() => handleCardClick(index)} isDisabled={isChecking} />
                ))}
            </div>
        )}

        <div className="mt-8 flex space-x-4">
            {!isGameOver && (
                <button
                    onClick={resetGame}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
                >
                    Reset Game
                </button>
            )}
            <button
                onClick={onBackToMenu}
                className="px-6 py-2 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-all"
            >
                Back to Menu
            </button>
        </div>
    </div>
  );
};

export default MemoryGame;
