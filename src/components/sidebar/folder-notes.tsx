import { Folder24Regular } from "@fluentui/react-icons";
import SidebarGroup from "./wrapper/sidebar-group";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { v4 } from "uuid"
import { FolderItem, ReactSubmitEvent } from "@/lib/types"
import React, { useState } from "react";
import { addNewFolderAction } from "@/lib/redux/slice/folder";
import { Input } from "../ui/input";
import FormInputEvent from "../notes/form-input-event";

const FolderNotes : React.FC = () => {
    const dispatch = useAppDispatch()
    const folders = useAppSelector((folder) => folder.folder.folder)

    const onSubmitFolder = (event : ReactSubmitEvent) : void => {
        event.preventDefault()
        const initialState = () : FolderItem  => {
            return {
                id: v4(),
                name: '',
                icon: ''
            }
        }
    }
    const _setFolderName = () => {}

    const resetFolder = () => {}
    
    return (
        <SidebarGroup sidebarName="Folders">
            <div role="button" className="flex items-center justify-between w-full hover:bg-zinc-900 p-2">
                <div className='flex items-center gap-3 text-sm'>
                    <Folder24Regular className='size-5' />
                    <FormInputEvent
                    submitHandler={onSubmitFolder}
                    changeHandler={_setFolderName}
                    nameForm="s"
                    resetHandler={resetFolder}
                    editingFormId="s"
                    placeholder="New folder ..."
                     />
                </div>
                <Badge variant={"icon"}>12</Badge>
            </div>
        </SidebarGroup>
    )
}

export default FolderNotes