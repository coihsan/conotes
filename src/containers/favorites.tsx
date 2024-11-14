import { debounceEvent } from '@/lib/utils/helpers';
import { LabelText } from '@/lib/label-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { searchQuery, selectAllNotes } from '@/lib/redux/slice/notes';
import HeaderSidebar from '@/components/global/header-sidebar';
import SearchBar from '@/components/global/search-bar';
import { useEffect, useRef } from 'react';
import NotesListItems from '@/components/notes/noteslist-item';
import { getNotes } from '@/lib/redux/selector';

const Favorites = () => {
    const dispatch = useAppDispatch()
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const notes = useAppSelector(selectAllNotes)
    const allFavoriteNotes = notes.filter(note => note.favorite)

    const { searchValue } = useAppSelector(getNotes)

    const _searchNotes = debounceEvent(
        (searchValue: string) => dispatch(searchQuery(searchValue)),
        100)

    const filteredNotes = searchValue
        ? notes?.filter((notes) =>
            !notes.trash && notes.content?.toString().toLowerCase().includes(searchValue))
        : notes;

    useEffect(() => {
        if (searchValue) return
    }, [_searchNotes, searchValue])

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar 
                countIndex={allFavoriteNotes.length}
                labelName={LabelText.FAVORITE}
                searchAction={
                    <SearchBar searchRef={searchRef} searchQuery={_searchNotes} />
                }
            />
            <ScrollArea className='h-full pt-2 scroll-smooth snap-y touch-pan-y'>
                <div className='grid grid-cols-1 gap-2 px-2 snap-end'>
                    {filteredNotes?.length === 0 ? (
                        <div className='w-full p-4 flex items-center justify-center italic text-muted-foreground text-sm'>Not found</div>
                    ) : (
                        <>
                            <NotesListItems index={allFavoriteNotes} />
                        </>
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default Favorites;