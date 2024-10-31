import { Folder24Regular, FolderOpen24Filled, FolderOpen24Regular, MoreHorizontal20Regular } from "@fluentui/react-icons";
import SidebarGroup from "./wrapper/sidebar-group";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { v4 } from "uuid"
import { FolderItem, ReactSubmitEvent } from "@/lib/types"
import React, { useState } from "react";
import { addNewFolderAction } from "@/lib/redux/slice/folder";
import FormInputEvent from "../notes/form-input-event";

const FolderNotes: React.FC = () => {
    const dispatch = useAppDispatch()
    const activeFolderId = useAppSelector((folder) => folder.folder.activeFolderId)
    const folders = useAppSelector((folder) => folder.folder.folder)
    const [hover, setIsHover] = useState(false)
    const [ isActive, setIsActive ] = useState(false)

    const onSubmitFolder = (event: ReactSubmitEvent): void => {
        event.preventDefault()
        const initialState: FolderItem = {
            id: v4(),
            name: 'UI/UX for kaisar.id web design',
            icon: ''
        }
        // dispatch(addNewFolderAction(initialState))
    }

    const _setFolderName = () => { }

    const resetFolder = () => { }

    return (
        <SidebarGroup sidebarName="Folders">
            <div className="px-2">
                {folders.map((item) => (
                    <div
                        key={item.id} 
                        onMouseEnter={() => setIsHover(true)}
                        tabIndex={0}
                        onClick={() => setIsActive(true)}
                        onMouseLeave={() => setIsHover(false)}
                        role="button" className="flex items-center justify-between w-full p-2">
                        <div className='flex items-center gap-3 text-sm'>
                            <div>
                                {isActive ? (
                                    <FolderOpen24Filled className='size-5' />
                                ) : (
                                    <Folder24Regular className='size-5' />
                                )}
                            </div>
                            <p className="line-clamp-1">{item.name}</p>
                            <Badge variant={"icon"}>{folders.length}</Badge>
                        </div>
                        {hover &&
                            <div className="flex items-center gap-1">
                                <MoreHorizontal20Regular />
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className='px-2'>
                <FormInputEvent
                    submitHandler={onSubmitFolder}
                    changeHandler={_setFolderName}
                    nameForm="s"
                    resetHandler={resetFolder}
                    editingFormId="s"
                    placeholder="New folder ..."
                />
            </div>
        </SidebarGroup>
    )
}

export default FolderNotes