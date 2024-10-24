import React, { useEffect, useRef } from 'react'
import { LabelText } from '@/lib/label-text';
import { ScrollArea } from '@/components/ui/scroll-area';
import HeaderSidebar from '@/components/global/header-sidebar';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { debounceEvent } from '@/lib/utils/helpers';
import SearchBar from '@/components/global/search-bar';
import { searchQuery } from '@/lib/redux/slice/notes';
import NotesListItems from '@/components/notes/noteslist-item';
import ButtonMenu from '@/components/primitive/button-menu';
import { TrashIcon } from '@radix-ui/react-icons';
import { Delete24Filled } from '@fluentui/react-icons';

const TrashNotes = () => {
    const dispatch = useAppDispatch()
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const _searchValues = useAppSelector((state) => state.notes.searchValue)
    const notes = useAppSelector((state) => state.notes.notes)
    const trashNotes = notes.filter(note => note.trash)

    const _searchNotes = debounceEvent(
        (searchValue: string) => dispatch(searchQuery(searchValue)),
        100
    )

    const handleMovePermanent = () => {}

    const filteredNotes = _searchValues
        ? notes?.filter((notes: { content: string; }) =>
            notes.content.toLowerCase().includes(_searchValues))
        : notes;

    useEffect(() => {
        if (_searchValues) return
    }, [_searchNotes])

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.TRASH}
                searchAction={
                    <SearchBar searchRef={searchRef} searchQuery={_searchNotes} />
                }
                buttonAction={
                    <ButtonMenu action={handleMovePermanent} side="bottom" variant={'destructive'} size={'default'} label={LabelText.CREATE_NEW_NOTE}>
                        <Delete24Filled />
                        Empty trash
                    </ButtonMenu>
                }
            />
            <ScrollArea className='h-full pt-2 scroll-smooth snap-y touch-pan-y'>
            <div className='snap-end'>
                    {filteredNotes?.length === 0 ? (
                        <div className='w-full p-4 flex items-center justify-center italic text-muted-foreground text-sm'>Not found</div>
                    ) : (
                        <div className='grid grid-cols-1 gap-2 px-2'>
                            <NotesListItems index={trashNotes} />
                        </div>
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default TrashNotes;