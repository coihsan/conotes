import { getNotesTitle } from "@/lib/utils/helpers"
import { Folder20Regular, Star20Regular } from "@fluentui/react-icons"
import { Link } from "react-router-dom"
import SettingMenuNotes from "@/components/settings/settings-menu-notes"
import { Badge } from "../ui/badge"
import { NoteItem } from "@/lib/types"
import React from "react"
import clsx from "clsx"

interface NotesListItemsProps {
    index: NoteItem[]
}

const NotesListItems: React.FC<NotesListItemsProps> = ({ index }) => {

    return (
        <>
            {index?.map((item) => (
                <Link to={`/app/${item.id}`}
                    key={item.id}
                    tabIndex={0}
                    className={clsx('snap-end relative rounded-xl px-2 h-24 flex items-center justify-between py-4 hover:bg-zinc-200 hover:dark:bg-zinc-800 border', (location.pathname == `/app/${item.id}` ? `bg-zinc-200 dark:bg-zinc-800` : `bg-white dark:bg-zinc-500/5`))} >
                    <div className='flex w-full'>
                        <div className='w-6'>
                            {item.favorite ?
                                (<Star20Regular className='text-sky-600 dark:text-sky-400 size-5' />)
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
                                <div>
                                    {item.tags?.length === 0 ? (
                                        null
                                    ) : (
                                        item.tags?.map((tag) => (
                                            <Badge key={tag.id} variant={'default'}>#{tag.name}</Badge>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <SettingMenuNotes />
                </Link>
            ))}
        </>
    )
}
export default NotesListItems