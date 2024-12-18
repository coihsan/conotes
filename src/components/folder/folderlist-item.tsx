import { FolderItem } from "@/lib/types"
import { Folder24Regular, FolderOpen24Filled } from "@fluentui/react-icons"
import React, { FormEvent, useRef } from "react"
import { Badge } from "../ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { setActiveMenu } from "@/lib/redux/slice/app"
import { MenuType } from "@/lib/enums"
import { getActiveFolderId, selectAllNotes } from "@/lib/redux/slice/notes"
import { getFolder, getNotes } from "@/lib/redux/selector"
import { getTotalNotesInFolder } from "@/lib/utils/helpers"
import { setEditingFolder, updateFolderName } from "@/lib/redux/slice/folder"
import FolderOptions from "./folder-options"
import { Input } from "../ui/input"

interface Props {
    index: FolderItem[]
}

const FolderListItem: React.FC<Props> = ({ index }) => {
    const dispatch = useAppDispatch()

    const ref = useRef<HTMLInputElement>(null)
    
    // SELECTOR
    const { editingFolder } = useAppSelector(getFolder)
    const { activeFolderId } = useAppSelector(getNotes)
    const allNotes = useAppSelector(selectAllNotes)

    const hanldleGetFolderActive = (folderId: string) => {
        if (folderId) {
            dispatch(getActiveFolderId(folderId))
            dispatch(setActiveMenu(MenuType.FOLDER))
            console.log(folderId)
        }
    }

    const handleEditFolderName = (folderId: string, folderName: string) => {
        dispatch(updateFolderName({
            folderId,
            folderName: folderName
        }))
    };

    const handleSubmitFolderNameChange = async (event: FormEvent) => {
        try {
            event.preventDefault()
            dispatch(setEditingFolder(false))
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="px-2">
            {index.map((item) => {
                const totalNotes = getTotalNotesInFolder(allNotes, item.id);
                return (
                    <div
                        key={item.id}
                        onClick={() => hanldleGetFolderActive(item.id)}
                        tabIndex={0}
                        role="button"
                        className="flex items-center justify-between w-full gap-2 py-2 cursor-pointer">
                        <div className='flex items-center gap-4 text-sm'>
                            <div>
                                {activeFolderId === item.id ? (
                                    <FolderOpen24Filled className='size-5' />
                                ) : (
                                    <Folder24Regular className='size-5 text-muted-foreground' />
                                )}
                            </div>
                            <div>
                                {item.id === activeFolderId && editingFolder ? (
                                    <form onSubmit={handleSubmitFolderNameChange}>
                                        <Input
                                        aria-label="folder name" 
                                        value={item.name} 
                                        ref={ref}
                                        autoFocus
                                        type="text"
                                        className="h-7"
                                        maxLength={20}
                                        onChange={(event) => {
                                            const newFolderName = event.target.value;
                                            handleEditFolderName(item.id, newFolderName);
                                        }}
                                        />
                                    </form>
                                ) : (
                                    <h3 className="line-clamp-1">{item.name}</h3>
                                )}
                            </div>
                            {item.id === activeFolderId && editingFolder ? (
                                null
                            ) : (
                                <Badge variant={"icon"}>{totalNotes}</Badge>
                            ) 
                            }
                        </div>
                        <FolderOptions folderId={item.id} />
                    </div>
                )
            })}
        </div>
    )
}
export default FolderListItem