import ButtonMenu from "@/components/primitive/button-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LabelText } from "@/lib/label-text"
import { Settings24Regular } from "@fluentui/react-icons"
import { useParams } from "react-router-dom"


const SettingsMenuInNotes = () => {
    const { noteId } = useParams()
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ButtonMenu label={LabelText.SETTINGS} variant={'ghost'} size={'icon'}>
                    <Settings24Regular className="size-5" />
                </ButtonMenu>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default SettingsMenuInNotes