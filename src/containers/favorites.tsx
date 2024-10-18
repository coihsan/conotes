import React, { useEffect, useRef } from 'react'
import { Folder20Regular, Star20Filled } from '@fluentui/react-icons';
import { debounceEvent, getNotesTitle } from '@/lib/utils/helpers';
import { LabelText } from '@/lib/label-text';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { searchQuery } from '@/lib/redux/slice/notes';
import { getAllNotes } from '@/lib/redux/thunk';
import { useToast } from '@/hooks/use-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { RootState } from '@/lib/redux/store';
import clsx from 'clsx';
import { Badge } from '@/components/ui/badge';
import SettingsMenuNotes from '../settings/settings-menu-notes';
import SearchBar from '@/components/global/search-bar';
import HeaderSidebar from '@/components/global/header-sidebar';

const Favorites = () => {
    const location = useLocation()
    const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>
    const dispatch = useAppDispatch()

    const allNotes = useAppSelector((state) => state.notes.notes)
    const _searchValues = useAppSelector((state: RootState) => state.notes.searchValue)

    const _searchNotes = debounceEvent(
        (searchValue: string) => dispatch(searchQuery(searchValue)),
        100
    )
    useEffect(() => {
        if (_searchValues) return
    }, [_searchNotes])

    useEffect(() => {
        dispatch(getAllNotes())
    }, [dispatch])

    const filteredNotes = _searchValues
        ? allNotes?.filter((notes) =>
            notes.title.toLowerCase().includes(_searchValues))
        : allNotes;

    const fetchFavoriteNotes = filteredNotes.filter(note => note.favorite)

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.FAVORITE} />
            <Separator orientation='horizontal' />
            <ScrollArea className='h-full pt-2 scroll-smooth snap-y touch-pan-y'>
                <div className='snap-end'>
                    {filteredNotes?.length === 0 ? (
                        <div className='w-full p-4 flex items-center justify-center italic text-muted-foreground text-sm'>No notes it's here</div>
                    ) : (
                        <div className='grid grid-cols-1 gap-2 px-2'>
                            {fetchFavoriteNotes?.map((item) => (
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
                                                {getNotesTitle(item.title)}
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

export default Favorites;