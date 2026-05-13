'use client'

import { GameboardType } from "@/types/gameboard-type";
import { useState } from "react"
import { Circle, X } from 'lucide-react'
import Button from "../ui/Button";

export default function Gameboard() {

    //states
    const [board, setBoard] = useState<GameboardType>(
        [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    );
    const [turn, setTurn] = useState<'X' | 'O'>('X');
    const [winner, setWinner] = useState<'X' | 'O' | null>(null);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [winningLine, setWinningLine] = useState<number[][] | null>(null);

    //functions
    function checkWinner(board: GameboardType): { winner: 'X' | 'O' | null, line: number[][] | null } {

        const winningCombinations = [
            //rows
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            //columns
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            //diagonals
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];

        for (const combination of winningCombinations) {
            const [[row1, col1], [row2, col2], [row3, col3]] = combination;

            const value1 = board[row1][col1];
            const value2 = board[row2][col2];
            const value3 = board[row3][col3];

            if (value1 && value1 === value2 && value1 === value3)
                return { winner: value1, line: combination };
        }

        return { winner: null, line: null };
    }

    function checkTie(board: GameboardType): boolean {
        return board.every(row => row.every(col => col !== null))
    }

    function isWinningCombination(row: number, col: number): boolean {
        if (!winningLine) return false;

        return winningLine.some(([r, c]) => r === row && c === col);
    }

    function updateCell(row: number, column: number) {

        if (winner) return;
        if (isGameOver) return;
        if (board[row][column] !== null) return;

        const newBoard: GameboardType = [...board];
        newBoard[row][column] = turn;
        setBoard(newBoard);


        const { winner: gameWinner, line: winningCombination } = checkWinner(newBoard);
        const isTie = checkTie(newBoard);

        if (gameWinner) {
            setWinner(gameWinner);
            setWinningLine(winningCombination);
            setIsGameOver(true);
        }
        else if (isTie) {
            setIsGameOver(true);
        }
        else {
            setTurn(turn === 'X' ? 'O' : 'X');
        }
    }

    function resetGame() {
        setBoard([
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ])
        setTurn('X');
        setIsGameOver(false);
        setWinner(null);
        setWinningLine(null);
    }

    return (
        <div className="flex flex-col items-center justify-center gap-3">

            <div className="text-2xl">
                {winner ? (
                    <div>
                        <span className={turn === 'X' ? 'text-accent-primary mx-1' : 'text-accent-secondary mx-1'}>
                            {winner}
                        </span> won the game!
                    </div>
                ) : isGameOver ? (
                    <div>It's a tie!</div>
                ) : (
                    <div>Playing:
                        <span className={turn === 'X' ? 'text-accent-primary mx-1' : 'text-accent-secondary mx-1'}>
                            {turn}
                        </span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-3 w-fit max-w-full bg-bg-secondary">
                {board.map((row, i) =>
                    row.map((column, j) =>
                    (
                        <button
                            key={`${i}-${j}`}
                            onClick={() => updateCell(i, j)}
                            className="
                                relative
                                flex 
                                aspect-square 
                                w-20 
                                sm:w-24 
                                md:w-28 
                                lg:w-32
                                items-center 
                                justify-center 
                                border-2 
                                border-accent-main"
                        >
                            {column === 'X' && <X className="text-accent-primary" size={50} />}
                            {column === 'O' && <Circle className="text-accent-secondary" size={50} />}
                            {column === null && ''}

                            {isWinningCombination(i, j) && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className={`w-full h-1 ${winner === 'X' ? 'bg-accent-primary' : 'bg-accent-secondary'} transform rotate-45`}></div>
                                </div>
                            )}
                        </button>

                    )
                    )
                )}
            </div>

            {(winner || isGameOver) && (
                <Button text="New Game" onClick={resetGame} />
            )}
        </div>
    )
}