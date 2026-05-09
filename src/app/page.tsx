import Gameboard from "@/components/game/Gameboard";
import Button from "@/components/ui/Button";

export default function Home() {

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
          "
        >
          Tic Tac Toe
        </h1>

        <div className="flex justify-center">
          <Button text="Let's Play!" size={'md'} />
        </div>

        <Gameboard />

      </main>

    </div>
  );
}
