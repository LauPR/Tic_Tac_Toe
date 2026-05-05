import Button from "@/components/ui/Button";

export default function Home() {

  return (
    <div
      className="
        bg-bg-primary 
        h-screen 
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

        <Button text="large" size={'lg'} variant={'player1'}/>
        <Button text="medium" size={'md'}/>
        <Button text="small" size={'sm'} variant={'player2'}/>

      </main>

    </div>
  );
}
