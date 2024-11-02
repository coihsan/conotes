import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { v4 } from "uuid"
import { FolderItem, ReactSubmitEvent } from "@/lib/types"
import React, { useEffect } from "react";
import { addNewFolderAction } from "@/lib/redux/slice/folder";
import FolderListItem from "../folder/folderlist-item";
import { Input } from "../ui/input";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import ButtonMenu from '@/components/primitive/button-menu';
import { LabelText } from '@/lib/label-text';
import { useState } from "react";
import { Add24Regular, ChevronDown20Regular, ChevronRight20Regular } from "@fluentui/react-icons";
import useLocalStorage from "@/lib/hooks/use-localstorage";

const FolderNotes: React.FC = () => {
    const dispatch = useAppDispatch()
    const activeFolderId = useAppSelector((folder) => folder.notes.activeFolderId)
    const folders = useAppSelector((folder) => folder.folder.folder)
    const [isOpen, setIsOpen] = useState(true)
    // const [collapsibleOpen, setCollapsibleOpen] = useLocalStorage('collapsibleOpen', isOpen)

    const onSubmitFolder = (event: ReactSubmitEvent): void => {
        event.preventDefault()
        const initialState: FolderItem = {
            id: v4(),
            name: 'Hello 2',
        }
        dispatch(addNewFolderAction(initialState))
    }
    const resetFolder = () => { }
    const onKeyUp = () => { }
    const onBlur = () => { }

    // useEffect(() => {
    //     setCollapsibleOpen(isOpen)
    // }, [isOpen])

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            <div className='flex items-center justify-between w-full relative px-2'>
                <CollapsibleTrigger className="text-sm flex items-center gap-3">
                    {isOpen ? <ChevronDown20Regular /> : <ChevronRight20Regular />}
                    Folder
                </CollapsibleTrigger>
                <ButtonMenu side='right' size={'icon'} variant={'ghost'} label={LabelText.CREATE_NEW_FOLDER}>
                    <Add24Regular className='size-5' />
                </ButtonMenu>
            </div>
            <CollapsibleContent>
                <FolderListItem index={folders} />
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
            </CollapsibleContent>
        </Collapsible>
    )
}

export default FolderNotes