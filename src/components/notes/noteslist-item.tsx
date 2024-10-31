import { getContrastColor, getNotesTitle } from "@/lib/utils/helpers"
import { Folder20Regular, Star20Filled, Star20Regular } from "@fluentui/react-icons"
import { Link, useLocation } from "react-router-dom"
import SettingNotesList from "@/action/settings-notes-list"
import { NoteItem } from "@/lib/types"
import React from "react"
import clsx from "clsx"

interface NotesListItemsProps {
    index: NoteItem[]
}

const NotesListItems: React.FC<NotesListItemsProps> = ({ index }) => {
    let location = useLocation();

    return (
        <>
            {index?.map((item) => (
                <Link to={`/app/${item.id}`}
                    key={item.id}
                    tabIndex={0}
                    className={clsx('snap-start relative rounded-xl px-2 h-24 flex items-center justify-between py-4 hover:bg-zinc-200 hover:dark:bg-zinc-800 border', (location.pathname == `/app/${item.id}` ? `bg-zinc-200 dark:bg-zinc-800` : `bg-white dark:bg-zinc-500/5`))} >
                    <div className='flex w-full items-center'>
                        <div className="size-6">
                            {item.favorite ?
                                (<Star20Filled className='text-creek-600 dark:text-creek-400 size-5' />)
                                : null
                            }
                        </div>
                        <div className='flex flex-col w-full gap-4 pl-4'>
                            <h3 className='text-sm font-medium w-full line-clamp-1'>
                                {getNotesTitle(item.content)}
                            </h3>
                            <div className='flex items-center gap-3'>
                                {item?.folder &&
                                    <div className='flex items-center gap-1 text-muted-foreground text-xs font-medium'>
                                        <Folder20Regular className="size-4" />
                                        {item.folder}
                                    </div>
                                }
                                <div>
                                    {item.tags && (
                                        item.tags?.map((tag) => (
                                            <div
                                                key={tag.id}
                                                className="flex items-center space-x-1 rounded-full px-3 py-1 text-sm"
                                                style={{ backgroundColor: tag.color, color: getContrastColor(tag.color) }}
                                            >
                                                <span>{tag.name}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <SettingNotesList noteId={item.id} />
                </Link>
            ))}
        </>
    )
}
export default NotesListItems