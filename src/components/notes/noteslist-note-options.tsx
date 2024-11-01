import ButtonMenu from "@/components/primitive/button-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppSelector } from "@/lib/hooks/use-redux"
import { LabelText } from "@/lib/label-text"
import { copyToClipboard } from "@/lib/utils/helpers"
import { CopyAdd24Regular, Settings24Regular } from "@fluentui/react-icons"
import React from "react"
import { useParams } from "react-router-dom"


const NotesListNoteOptions : React.FC = () => {
    const { noteId } = useParams()
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
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default NotesListNoteOptions