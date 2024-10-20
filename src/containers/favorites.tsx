import { debounceEvent } from '@/lib/utils/helpers';
import { LabelText } from '@/lib/label-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { searchQuery } from '@/lib/redux/slice/notes';
import HeaderSidebar from '@/components/global/header-sidebar';
import SearchBar from '@/components/global/search-bar';
import { RootState } from '@/lib/redux/store';
import { useEffect, useRef } from 'react';
import NotesListItems from '@/components/notes/noteslist-item';

const Favorites = () => {
    const dispatch = useAppDispatch()
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const notes = useAppSelector((state) => state.notes.notes)
    const allFavoriteNotes = notes.filter(note => note.favorite)

    const _searchValues = useAppSelector((state: RootState) => state.notes.searchValue)
    const _searchNotes = debounceEvent(
        (searchValue: string) => dispatch(searchQuery(searchValue)),
        100
    )

    const filteredNotes = _searchValues
        ? notes?.filter((notes: { title: string; }) =>
            notes.title.toLowerCase().includes(_searchValues))
        : notes;

    useEffect(() => {
        if (_searchValues) return
    }, [_searchNotes])

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.FAVORITE}
                searchAction={
                    <SearchBar searchRef={searchRef} searchQuery={_searchNotes} />
                }
            />
            <ScrollArea className='h-full pt-2 scroll-smooth snap-y touch-pan-y'>
                <div className='snap-end'>
                    {filteredNotes?.length === 0 ? (
                        <div className='w-full p-4 flex items-center justify-center italic text-muted-foreground text-sm'>No notes it's here</div>
                    ) : (
                        <div className='grid grid-cols-1 gap-2 px-2'>
                            <NotesListItems index={allFavoriteNotes} />
                        </div>
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default Favorites;