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

    //functions
    function checkWinner(board: GameboardType): 'X' | 'O' | null {

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
                return value1;
        }

        return null;
    }

    function checkTie(board: GameboardType): boolean {
        return board.every(row => row.every(col => col !== null))
    }

    function updateCell(row: number, column: number) {

        if (winner) return;
        if (isGameOver) return;
        if (board[row][column] !== null) return;

        const newBoard: GameboardType = [...board];
        newBoard[row][column] = turn;
        setBoard(newBoard);


        const gameWinner = checkWinner(newBoard);
        const isTie = checkTie(newBoard);

        if (gameWinner) {
            setWinner(gameWinner);
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
    }

    return (
        <div className="flex items-center justify-center">

            <div className="">
                {winner ? (
                    <div>{winner} won the game!</div>
                ) : isGameOver ? (
                    <div>It's a tie!</div>
                ) : (
                    <div>Playing: {turn}</div>
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
                            {column === 'X' && <X />}
                            {column === 'O' && <Circle />}
                            {column === null && ''}
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