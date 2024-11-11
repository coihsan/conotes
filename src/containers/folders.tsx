import { ScrollArea } from "@/components/ui/scroll-area"
import HeaderSidebar from "@/components/global/header-sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import NotesListItems from "@/components/notes/noteslist-item"
import ButtonMenu from "@/components/primitive/button-menu"
import { NoteAdd24Regular } from "@fluentui/react-icons"
import { LabelText } from "@/lib/label-text"
import SearchBar from "@/components/global/search-bar"
import { MutableRefObject, useRef, useState } from "react"
import { currentItem, debounceEvent } from "@/lib/utils/helpers"
import { addNewNote, searchQuery, selectAllNotes } from "@/lib/redux/slice/notes"
import { getNotes } from "@/lib/redux/selector"
import { selectAllFolder } from "@/lib/redux/slice/folder"
import { NoteItem } from "@/lib/types"
import { v4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/lib/hooks/use-toast"

const Folders = () => {
    const dispatch = useAppDispatch()
    const { toast } = useToast()
    const navigate = useNavigate()
    const searchRef = useRef() as MutableRefObject<HTMLInputElement>

    const allNotes = useAppSelector(selectAllNotes)
    const { activeFolderId } = useAppSelector(getNotes)

    const createInitialNote = () : NoteItem => {
        return {
            id: v4(),
            content: '',
            title: '',
            createdAt: currentItem,
            lastUpdated: currentItem,
            trash: false,
            favorite: false,
            folderId: activeFolderId
        };
    };
    const [notes] = useState<NoteItem>(createInitialNote());

    const findNotesInFolder = allNotes.filter((note) => note.folderId === activeFolderId && !note.trash)
    const folder = useAppSelector(selectAllFolder)
    const getFolderName = folder.find((folder) => folder.id === activeFolderId)

    const _searchNotes = debounceEvent(
        (searchValue: string) => dispatch(searchQuery(searchValue)),
        100
    )

    const handleNewNote = async () => {
        try {
            const newNote = { ...notes, id: v4() };
            await dispatch(addNewNote(newNote));
            toast({
                title: "Success",
                description: "New note created successfully",
            });
            navigate(`/app/${newNote.id}`);
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <aside className='sidebarOption'>
            <HeaderSidebar 
                buttonAction={
                    <ButtonMenu action={handleNewNote} side="bottom" variant={'ghost'} size={'icon'} label={LabelText.CREATE_NEW_NOTE}>
                        <NoteAdd24Regular />
                    </ButtonMenu>
                }
                searchAction={
                    <SearchBar searchRef={searchRef} searchQuery={_searchNotes} />
                }
                labelName={getFolderName?.name as string} 
            />
            <ScrollArea className='h-full pt-2 scroll-smooth touch-pan-y pb-24'>
                <div className='grid grid-cols-1 gap-2 px-2 snap-end'>
                    {findNotesInFolder.length === 0 ? (
                        <div className='w-full p-4 flex items-center justify-center italic text-muted-foreground text-sm'>Not found</div>
                    ) : (
                        <NotesListItems index={findNotesInFolder} />
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default Folders