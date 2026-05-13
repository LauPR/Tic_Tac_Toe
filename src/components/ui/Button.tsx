import { cn } from "@/lib/utils";

type ButtonProps = {
    text?: string;
    variant?: 'primary' | 'player1' | 'player2';
    size?: 'sm' | 'md' | 'lg';
    className?: React.ReactNode;
    onClick?: () => void;
}

export default function Button({
    text, variant = 'primary', size = 'md', className, onClick
}: ButtonProps) {

    const variants = {
        primary: "bg-accent-main      hover:bg-hover-main      focus:bg-focus-main",
        player1: "bg-accent-primary   hover:bg-hover-primary   focus:bg-focus-primary",
        player2: "bg-accent-secondary hover:bg-hover-secondary focus:bg-focus-secondary"
    }

    const sizes = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-4xl"
    }

    return (
        <button
            className={cn(
                "cursor-pointer",
                "m-1",
                "p-2",
                "rounded-2xl",
                "shadow-sm",
                "shadow-shadow",
                "focus:shadow-none",
                variants[variant],
                sizes[size],
                className
            )}
            onClick={onClick}
        >

            {text}

        </button>
    )
}