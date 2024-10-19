import { Folder20Regular, Star20Filled } from '@fluentui/react-icons';
import { getNotesTitle } from '@/lib/utils/helpers';
import { LabelText } from '@/lib/label-text';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/use-redux';
import clsx from 'clsx';
import { Badge } from '@/components/ui/badge';
import SettingsMenuNotes from '../settings/settings-menu-notes';
import HeaderSidebar from '@/components/global/header-sidebar';

const Favorites = () => {
    const location = useLocation()
    const allNotes = useAppSelector((state) => state.notes.notes)
    const fetchFavoriteNotes = allNotes.filter(note => note.favorite)

    return (
        <aside className='sidebarOption'>
            <HeaderSidebar labelName={LabelText.FAVORITE} />
            <Separator orientation='horizontal' />
            <ScrollArea className='h-full pt-2 scroll-smooth snap-y touch-pan-y'>
                <div className='snap-end'>
                    {allNotes?.length === 0 ? (
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