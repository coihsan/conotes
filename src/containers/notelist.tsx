import React, { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area';
import ButtonMenu from '@/components/primitive/button-menu';
import { searchQuery } from '@/lib/redux/slice/notes';
import { Filter24Regular, NoteAdd24Regular } from '@fluentui/react-icons';
import SearchBar from '@/components/global/search-bar';
import { LabelText } from '@/lib/label-text';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { currentItem, debounceEvent } from "@/lib/utils/helpers"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { RootState } from '@/lib/redux/store';
import { useToast } from '@/lib/hooks/use-toast';
import { createNewNotesThunk, getAllNotesThunk } from '@/lib/redux/thunk';
import { NoteItem } from '@/lib/types';
import HeaderSidebar from '@/components/global/header-sidebar';
import NotesListItems from '@/components/notes/noteslist-item';

const NoteList = () => {
    const { toast } = useToast()
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const allNotes = useAppSelector((state) => state.notes.notes)
    const _searchValues = useAppSelector((state: RootState) => state.notes.searchValue)
    
    const createInitialNote = (): NoteItem => {
        return {
            id: v4(),
            title: '',
            content: '',
            createdAt: currentItem,
            lastUpdated: currentItem,
            tags: [
                {
                    id: v4(),
                    name: "UI"
                }
            ],
            trash: false,
            favorite: false,
            folder: "Notes"
        };
    };
    const [notes, setNotes] = useState<NoteItem>(createInitialNote());

    const _searchNotes = debounceEvent(
        (searchValue: string) => dispatch(searchQuery(searchValue)),
        100
    )
    useEffect(() => {
        if (_searchValues) return
    }, [_searchNotes])

    useEffect(() =>{
        dispatch(getAllNotesThunk())
    }, [dispatch])

    const filteredNotes = _searchValues
        ? allNotes?.filter((notes: { title: string; }) =>
            notes.title.toLowerCase().includes(_searchValues))
        : allNotes;

    const handleNewNote = async () => {
        try {
            const newNote = { ...notes, id: v4() };
            await dispatch(createNewNotesThunk(newNote as NoteItem));
            toast({
                title: "Success",
                description: "New note created successfully",
            });
            navigate(`/app/${newNote.id}`);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.NOTES}
                buttonAction={
                    <ButtonMenu action={handleNewNote} side="bottom" variant={'ghost'} size={'icon'} label={LabelText.CREATE_NEW_NOTE}>
                        <NoteAdd24Regular />
                    </ButtonMenu>
                }
                filterAction={
                    <ButtonMenu side="bottom" variant={'ghost'} size={'icon'} label={LabelText.FILTER}>
                        <Filter24Regular />
                    </ButtonMenu>
                }
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
                            <NotesListItems index={filteredNotes} />
                        </div>
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default NoteList;