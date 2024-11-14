import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

interface ButtonMenuProps {
    children: React.ReactNode
    className?: string
    action?: () => void
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    size?:  "default" | "sm" | "lg" | "icon" | null | undefined
    label: string
    side?: "right" | "top" | "bottom" | "left" | undefined
  }

const ButtonMenu : React.FC<ButtonMenuProps> = ({
    children,
    className,
    action,
    variant,
    size,
    label,
    side,
  }) => {
    return (
        <TooltipProvider>
            <Tooltip defaultOpen={false}>
                <TooltipTrigger>
                    <Button
                        variant={variant}
                        size={size}
                        className={`${className} flex items-center gap-2`}
                        onClick={action}
                    >
                        {children}
                    </Button>
                </TooltipTrigger>
                <TooltipContent side={side} align="center">
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default ButtonMenu