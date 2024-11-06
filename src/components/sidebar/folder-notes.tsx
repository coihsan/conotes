import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { v4 } from "uuid"
import { FolderItem, ReactSubmitEvent } from "@/lib/types"
import React from "react";
import { addNewFolderAction, selectAllFolder } from "@/lib/redux/slice/folder";
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
import { Add24Regular, Checkmark20Filled, ChevronDown20Regular, ChevronRight20Regular, Dismiss20Filled } from "@fluentui/react-icons";

const FolderNotes: React.FC = () => {
    const dispatch = useAppDispatch()
    const folders = useAppSelector((state) => selectAllFolder(state))
    const [isOpen, setIsOpen] = useState(true)
    const [isVisible, setIsVisible] = useState(false)

    const onSubmitFolder = (event: ReactSubmitEvent): void => {
        event.preventDefault()
        const initialState: FolderItem = {
            id: v4(),
            name: 'Hello 2',
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        }
        dispatch(addNewFolderAction(initialState))
    }
    const resetFolder = () => { }
    const onKeyUp = () => { }
    const onBlur = () => { }

    const handleAddNewFolder = () => {
        setIsVisible(true)
        setIsOpen(true)
    }

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
                <ButtonMenu action={handleAddNewFolder} side='right' size={'icon'} variant={'ghost'} label={LabelText.CREATE_NEW_FOLDER}>
                    <Add24Regular className='size-5' />
                </ButtonMenu>
            </div>
            <CollapsibleContent>
                <FolderListItem index={folders} />
                {isVisible &&
                    <div className='px-2 flex items-center gap-1'>
                        <form className="w-full" onSubmit={onSubmitFolder}>
                            <Input
                                className="h-8"
                                placeholder="New folder..."
                                onReset={resetFolder}
                                onKeyUp={onKeyUp}
                                onBlur={onBlur}
                            />
                        </form>
                        <div className="flex items-center">
                            <ButtonMenu label="Save" action={() => setIsVisible(true)} variant={'ghost'} size={'icon'}>
                                <Checkmark20Filled />
                            </ButtonMenu>
                            <ButtonMenu label="Close" action={() => setIsVisible(false)} variant={'ghost'} size={'icon'}>
                                <Dismiss20Filled />
                            </ButtonMenu>
                        </div>
                    </div>
                }
            </CollapsibleContent>
        </Collapsible>
    )
}

export default FolderNotes