'use client'

import Gameboard from "@/components/game/Gameboard";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function Home() {

  const [showGame, setShowGame] = useState<boolean>(false);

  return (
    <div
      className="
        bg-bg-primary 
        min-h-screen 
        text-text-primary
        cursor-default
      "
    >

      <main className="p-2">

        <h1
          className="
            text-6xl 
            text-center 
            underline 
            underline-offset-8
            decoration-dotted 
            text-accent-main
            my-5
          "
        >
          Tic Tac Toe
        </h1>

        {!showGame && (
          <div className="flex justify-center">
            <Button text="Let's Play!" size={'md'} onClick={() => setShowGame(true)} />
          </div>
        )}

        {showGame && <Gameboard />}

      </main>

    </div>
  );
}
