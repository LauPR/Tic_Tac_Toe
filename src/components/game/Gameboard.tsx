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
        <div className="bg-bg-secondary ">
            <div className="grid grid-cols-3 gap-4">
                {board.map((row, i) =>
                    row.map((column, j) =>
                    (
                        <button
                            key={`${i}-${j}`}
                            onClick={() => updateCell(i, j)}
                            className="bg-amber-400 text-9xl h-32 w-32"
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