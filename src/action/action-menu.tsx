import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import React from "react"

interface Props {
    icon: React.ReactNode;
    menuName: string;
    onClick: () => void
}

const ActionMenu : React.FC<Props> = ({ icon, menuName, onClick }) => {
    return (
        <DropdownMenuItem onClick={onClick} className="flex items-center gap-3">
            {icon}
            {menuName}
        </DropdownMenuItem>
    )
}
export default ActionMenu