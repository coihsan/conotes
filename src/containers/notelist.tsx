import React, { useEffect, useRef, useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area';
import ButtonMenu from '@/components/primitive/button-menu';
import { searchQuery } from '@/lib/redux/slice/notes';
import { Filter24Regular, Folder20Regular, NoteAdd24Regular, Star20Filled } from '@fluentui/react-icons';
import SearchBar from '@/components/global/search-bar';
import { LabelText } from '@/lib/label-text';
import { Separator } from '@/components/ui/separator';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import SettingsMenuNotes from '../settings/settings-menu-notes';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { debounceEvent, getNotesTitle } from "@/lib/utils/helpers"
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { RootState } from '@/lib/redux/store';
import clsx from 'clsx';
import { useToast } from '@/hooks/use-toast';
import { createNewNotesThunk, getAllNotesThunk } from '@/lib/redux/thunk';
import { NoteItem } from '@/lib/types';
import HeaderSidebar from '@/components/global/header-sidebar';

const NoteList = () => {
    const { toast } = useToast()
    const location = useLocation()
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const allNotes = useAppSelector((state) => state.notes.notes)
    const _searchValues = useAppSelector((state: RootState) => state.notes.searchValue)
    
    const createInitialNote = (): NoteItem => {
        const currentItem = dayjs().format('DD-MM-YYYY');
        return {
            id: v4(),
            title: '',
            content: '',
            createdAt: currentItem,
            lastUpdated: currentItem,
            tags: [],
            trash: false,
            favorite: true,
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
        ? allNotes?.filter((notes) =>
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
            <Separator className='mt-4' orientation='horizontal' />
            <ScrollArea className='h-full pt-2 scroll-smooth snap-y touch-pan-y'>
                <div className='snap-end'>
                    {filteredNotes?.length === 0 ? (
                        <div className='w-full p-4 flex items-center justify-center italic text-muted-foreground text-sm'>No notes it's here</div>
                    ) : (
                        <div className='grid grid-cols-1 gap-2 px-2'>
                            {filteredNotes?.map((item) => (
                                <Link to={`/app/${item.id}`}
                                    key={item.id}
                                    tabIndex={0}
                                    className={clsx('snap-end relative rounded-xl px-2 h-24 flex items-center justify-between py-4 hover:bg-zinc-200 hover:dark:bg-zinc-800 border', (location.pathname == `/app/${item.id}` ? `bg-zinc-200 dark:bg-zinc-800` : `bg-white dark:bg-zinc-500/5`))} >
                                    <div className='flex w-full'>
                                        <div className='w-6'>
                                            {item.favorite ?
                                                (<Star20Filled className='text-600 dark:text-zinc-500 size-5' />)
                                                : null
                                            }
                                        </div>
                                        <div className='flex flex-col w-full gap-4 pl-4'>
                                            <h3 className='text-sm font-medium w-full line-clamp-1' aria-label={item.title}>
                                                {getNotesTitle(item.content)}
                                            </h3>
                                            <div className='flex items-center gap-3'>
                                                {item.folder ?
                                                    (
                                                        <div className='flex items-center gap-1 text-muted-foreground text-xs font-medium'>
                                                            <Folder20Regular />
                                                            {item.folder}
                                                        </div>
                                                    ) : (
                                                        null
                                                    )
                                                }
                                                {item.tags.length > 0 ? (
                                                    null
                                                ) : (
                                                    item.tags.map((tag, index) => (
                                                        <Badge key={index} variant={'secondary'}>{tag.name}</Badge>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <SettingsMenuNotes />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </ScrollArea>
        </aside>
    )
}

export default NoteList;