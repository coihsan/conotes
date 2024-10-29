import ButtonMenu from "@/components/primitive/button-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppSelector } from "@/lib/hooks/use-redux"
import { LabelText } from "@/lib/label-text"
import { copyToClipboard } from "@/lib/utils/helpers"
import { CopyAdd24Regular, Settings24Regular } from "@fluentui/react-icons"
import { useParams } from "react-router-dom"


const SettingsMenuInNotes = () => {
    const { noteId } = useParams()
    const notes = useAppSelector((state) => state.notes.notes)
    const activeNoteContent = useAppSelector((state) => state.notes.activeNoteId);

    const handleCopyClipboard = (noteId: string, content: string) => {
        copyToClipboard(noteId, content)
      }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <ButtonMenu label={LabelText.SETTINGS} variant={'ghost'} size={'icon'}>
                    <Settings24Regular className="size-5" />
                </ButtonMenu>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCopyClipboard(noteId as string, activeNoteContent)}>
                    <CopyAdd24Regular />
                    Copy note
                </DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default SettingsMenuInNotes