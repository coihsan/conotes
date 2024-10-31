import { Folder24Regular, FolderOpen24Filled, FolderOpen24Regular, MoreHorizontal20Regular } from "@fluentui/react-icons";
import SidebarGroup from "./wrapper/sidebar-group";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { v4 } from "uuid"
import { FolderItem, ReactSubmitEvent } from "@/lib/types"
import React, { useState } from "react";
import { addNewFolderAction } from "@/lib/redux/slice/folder";
import FolderListItem from "../folder/folderlist-item";
import { Input } from "../ui/input";

const FolderNotes: React.FC = () => {
    const dispatch = useAppDispatch()
    const activeFolderId = useAppSelector((folder) => folder.folder.activeFolderId)
    const folders = useAppSelector((folder) => folder.folder.folder)

    const onSubmitFolder = (event: ReactSubmitEvent): void => {
        event.preventDefault()
        const initialState: FolderItem = {
            id: v4(),
            name: 'saeda',
        }
        dispatch(addNewFolderAction(initialState))
    }

    const resetFolder = () => {}
    const onKeyUp = () => {}
    const onBlur = () => {}

    return (
        <SidebarGroup sidebarName="Folders">
            <div className="px-2">
                <FolderListItem index={folders} />
            </div>
            <div className='px-2'>
                <form onSubmit={onSubmitFolder}>
                    <Input 
                    className="h-8"
                    placeholder="New folder..."
                    onReset={resetFolder}
                    onKeyUp={onKeyUp}
                    onBlur={onBlur}
                    />
                </form>
            </div>
        </SidebarGroup>
    )
}

export default FolderNotes