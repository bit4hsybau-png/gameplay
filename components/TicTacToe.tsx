
import React, { useState } from 'react';
import { SquareValue, Player } from '../types';
import { IconX, IconO } from './icons';

interface TicTacToeProps {
  onBackToMenu: () => void;
}

const calculateWinner = (squares: SquareValue[]): SquareValue | 'Draw' => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]  // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  if (squares.every(square => square !== null)) {
    return 'Draw';
  }
  return null;
};

const Square: React.FC<{ value: SquareValue; onClick: () => void }> = ({ value, onClick }) => {
    const renderIcon = () => {
        if (value === 'X') return <IconX />;
        if (value === 'O') return <IconO />;
        return null;
    }
    return (
        <button
            className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-slate-800 rounded-lg flex items-center justify-center p-4 transition-all duration-200 ${value === 'X' ? 'text-cyan-400' : 'text-amber-400'} hover:bg-slate-700 disabled:cursor-not-allowed`}
            onClick={onClick}
            disabled={!!value}
        >
            <div className="w-full h-full transition-transform duration-300 transform-gpu group-hover:scale-110">
                {renderIcon()}
            </div>
        </button>
    );
};

const TicTacToe: React.FC<TicTacToeProps> = ({ onBackToMenu }) => {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<SquareValue | 'Draw'>(null);

  const handleClick = (index: number) => {
    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
        setWinner(newWinner);
    } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderStatus = () => {
    if (winner) {
        if(winner === 'Draw') return "It's a Draw!";
        return `Winner: ${winner}`;
    } else {
        return `Next Player: ${currentPlayer}`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold mb-2 text-white">Tic-Tac-Toe</h2>
          <p className="text-xl text-slate-300">{renderStatus()}</p>
      </div>

      <div className="grid grid-cols-3 gap-3 p-3 bg-slate-900/50 rounded-xl shadow-lg">
        {board.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>

      <div className="mt-8 flex space-x-4">
        <button
            onClick={resetGame}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-all"
        >
            {winner ? 'Play Again' : 'Reset'}
        </button>
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

export default TicTacToe;
