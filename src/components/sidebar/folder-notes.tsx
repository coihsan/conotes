import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { v4 } from "uuid"
import { FolderItem } from "@/lib/types"
import React, { FormEvent, useRef } from "react";
import { addNewFolderAction, selectAllFolder, setEditingFolder } from "@/lib/redux/slice/folder";
import FolderListItem from "../folder/folderlist-item";
import { Input } from "../ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import ButtonMenu from '@/components/primitive/button-menu';
import { LabelText } from '@/lib/label-text';
import { useState } from "react";
import { Add24Regular, ChevronDown20Regular, ChevronRight20Regular, Dismiss20Filled } from "@fluentui/react-icons";
import { currentItem } from "@/lib/utils/helpers";

const FolderNotes: React.FC = () => {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLInputElement>(null)

    const folders = useAppSelector(selectAllFolder)

    const onSubmitNewFolder = (event: FormEvent): void => {
        event.preventDefault();
        dispatch(setEditingFolder(false));
        setIsVisible(false)
      
        const newFolderName = ref.current?.value;
      
        if (newFolderName) {
          const initialState: FolderItem = {
            id: v4(),
            name: newFolderName,
            createdAt: currentItem,
            lastUpdated: currentItem,
          };
          dispatch(addNewFolderAction(initialState));
        
          ref.current!.value = ''; 
        }
      }

    const handleAddNewFolder = () => {
        setIsVisible(true)
        setIsOpen(true)
    }

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="px-2"
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
                        <form className="w-full" onSubmit={onSubmitNewFolder}>
                            <Input
                                className="h-7"
                                type="text"
                                autoFocus
                                ref={ref}
                                maxLength={20}
                                placeholder="New folder..."
                            />
                        </form>
                        <ButtonMenu label="Close" action={() => setIsVisible(false)} variant={'ghost'} size={'icon'}>
                            <Dismiss20Filled />
                        </ButtonMenu>
                    </div>
                }
            </CollapsibleContent>
        </Collapsible>
    )
}

export default FolderNotes