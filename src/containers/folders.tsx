import { ScrollArea } from "@/components/ui/scroll-area"
import HeaderSidebar from "@/components/global/header-sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import NotesListItems from "@/components/notes/noteslist-item"
import ButtonMenu from "@/components/primitive/button-menu"
import { NoteAdd24Regular } from "@fluentui/react-icons"
import { LabelText } from "@/lib/label-text"
import SearchBar from "@/components/global/search-bar"
import { useRef } from "react"
import { debounceEvent } from "@/lib/utils/helpers"
import { searchQuery, selectAllNotes } from "@/lib/redux/slice/notes"
import { getNotes } from "@/lib/redux/selector"
import { selectAllFolder } from "@/lib/redux/slice/folder"

const Folders = () => {
    const dispatch = useAppDispatch()
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const notes = useAppSelector(selectAllNotes)
    const { activeFolderId } = useAppSelector(getNotes)

    const findNotesInFolder = notes.filter((note) => note.folderId === activeFolderId && !note.trash)
    const folder = useAppSelector(selectAllFolder)
    const getFolderName = folder.find((folder) => folder.id === activeFolderId)

    const _searchNotes = debounceEvent(
        (searchValue: string) => dispatch(searchQuery(searchValue)),
        100
    )

    return(
        <aside className='sidebarOption'>
            <HeaderSidebar 
                buttonAction={
                    <ButtonMenu side="bottom" variant={'ghost'} size={'icon'} label={LabelText.CREATE_NEW_NOTE}>
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