import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"
import {
    ToggleGroup,
    ToggleGroupItem,
  } from "@/components/ui/toggle-group"

interface ButtonMenuProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    size?:  "default" | "sm" | "lg" 
    label: string
    disabled?: any
    side?: "bottom" | "top" | "right" | "left" 
  }

const ToggleMenu : React.FC<ButtonMenuProps> = ({
    children,
    onClick,
    size,
    label,
    className,
    disabled,
    side
  }) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger>
                    <ToggleGroup type="multiple">
                        <ToggleGroupItem
                            value={label}
                            aria-label={label}
                            size={size}
                            className={className}
                            onClick={onClick}
                            disabled={disabled}
                        >
                            {children}
                        </ToggleGroupItem>
                    </ToggleGroup>
                </TooltipTrigger>
                <TooltipContent side={side}>
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default ToggleMenu