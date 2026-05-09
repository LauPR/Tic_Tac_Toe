'use client'

import { GameboardType } from "@/types/gameboard-type";
import { useState } from "react"
import { Circle, X } from 'lucide-react'

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

    //functions
    function updateCell(row: number, column: number) {
        if (board[row][column] !== null) return;

        const newBoard: GameboardType = [...board];

        newBoard[row][column] = turn;
        setBoard(newBoard);
        setTurn(turn === 'X' ? 'O' : 'X')
    }

    return (
        <div className="flex items-center justify-center">
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
        </div>
    )
}