import { LabelText } from "@/lib/label-text"
import { ScrollArea } from "@/components/ui/scroll-area"
import HeaderSidebar from "@/components/global/header-sidebar"
import { useAppSelector } from "@/lib/hooks/use-redux"
import NotesListItems from "@/components/notes/noteslist-item"

const Folders = () => {
    const notes = useAppSelector((state) => state.notes.notes)
    const activeFolder = useAppSelector((state) => state.folder.activeFolderId)
    const findNotesInFolder = notes.filter((note) => note.id === activeFolder)
    const folder = useAppSelector((state) => state.folder.folder)
    const getFolderName = folder.find((folder) => folder.name)

    return(
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={getFolderName?.name as string} />
            <ScrollArea className='px-2'>
                <NotesListItems index={findNotesInFolder} />
            </ScrollArea>
        </aside>
    )
}

export default Folders