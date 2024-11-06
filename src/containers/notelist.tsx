import React, { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area';
import ButtonMenu from '@/components/primitive/button-menu';
import { searchQuery, selectAllNotes } from '@/lib/redux/slice/notes';
import { Filter24Regular, NoteAdd24Regular } from '@fluentui/react-icons';
import SearchBar from '@/components/global/search-bar';
import { LabelText } from '@/lib/label-text';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { currentItem, debounceEvent } from "@/lib/utils/helpers"
import { useAppDispatch, useAppSelector } from '@/lib/hooks/use-redux';
import { useToast } from '@/lib/hooks/use-toast';
import { addNewNote } from '@/lib/redux/slice/notes';
import { NoteItem } from '@/lib/types';
import HeaderSidebar from '@/components/global/header-sidebar';
import NotesListItems from '@/components/notes/noteslist-item';
import { MenuType } from '@/lib/enums';
import { getApp, getNotes, selectFilteredNotes } from '@/lib/redux/selector';

const NoteList = () => {
    const { toast } = useToast()
    const navigate = useNavigate()
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>

    const dispatch = useAppDispatch()

    // SELECTOR
    const { searchValue } = useAppSelector(getNotes)
    const allNotes = useAppSelector((state) => selectAllNotes(state))
    const {activeMenu} = useAppSelector(getApp);

    const _searchValues = searchValue
    const filteredNotes = useAppSelector(selectFilteredNotes);

    const filterNote = filteredNotes
    ? allNotes.filter((note) => !note.trash)
    .sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0))
    : allNotes.filter((note) => !note.title)
    .sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));

    const createInitialNote = () : NoteItem => {
        return {
            id: v4(),
            content: '',
            title: '',
            createdAt: currentItem,
            lastUpdated: currentItem,
            trash: false,
            favorite: false,
        };
    };
    const [notes] = useState<NoteItem>(createInitialNote());

    const _searchNotes = debounceEvent(
        (searchValue: string) => dispatch(searchQuery(searchValue)),
        100
    )
    useEffect(() => {
        if (_searchValues && (activeMenu === MenuType.NOTES)) return
    }, [_searchNotes])

    const handleNewNote = async () => {
        try {
            const newNote = { ...notes, id: v4() };
            await dispatch(addNewNote(newNote as NoteItem));
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
            <HeaderSidebar 
            labelName={LabelText.NOTES}
            countIndex={filterNote.length}
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
            <ScrollArea className='h-full pt-2 scroll-smooth touch-pan-y pb-24'>
                <div className='grid grid-cols-1 gap-2 px-2 snap-end'>
                    {filterNote?.length === 0 ? (
                        <div className='w-full p-4 flex items-center justify-center italic text-muted-foreground text-sm'>Not found</div>
                    ) : (
                        <>
                            <NotesListItems index={filterNote} />
                        </>
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default NoteList;