// src/components/projects/TicTacToeGame.js

import React, { useState } from 'react';

function Square({ value, onSquareClick }) {
    return (
        <button
            className="w-24 h-24 bg-gray-700 text-white text-5xl font-bold flex items-center justify-center border border-gray-600 hover:bg-gray-600 transition duration-200"
            onClick={onSquareClick}
        >
            {value}
        </button>
    );
}

function Board({ xIsNext, squares, onPlay }) {
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Vencedor: ' + winner;
    } else if (squares.every(Boolean)) { // Verifica se há um empate
        status = 'Empate!';
    }
    else {
        status = 'Próximo Jogador: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <>
            <div className="text-center text-xl font-semibold mb-4 text-white">{status}</div>
            <div className="grid grid-cols-3 grid-rows-3 w-72 h-72">
                {Array(9).fill(null).map((_, i) => (
                    <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
                ))}
            </div>
        </>
    );
}

const TicTacToeGame = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Ir para o movimento #' + move;
        } else {
            description = 'Ir para o início do jogo';
        }
        return (
            <li key={move} className="mb-2">
                <button
                    onClick={() => jumpTo(move)}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-lg text-sm transition duration-200 w-full"
                >
                    {description}
                </button>
            </li>
        );
    });

    return (
        <div className="flex flex-col items-center p-4 bg-gray-900 min-h-screen">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Jogo da Velha</h2>
                <div className="game-board flex justify-center mb-6">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                </div>
                <div className="game-info text-center">
                    <ol className="list-none p-0">{moves}</ol>
                </div>
            </div>
        </div>
    );
};

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default TicTacToeGame;
