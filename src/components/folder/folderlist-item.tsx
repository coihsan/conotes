import { FolderItem } from "@/lib/types"
import { Folder24Regular, FolderOpen24Filled } from "@fluentui/react-icons"
import React, { useState } from "react"
import { Badge } from "../ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import FolderOptions from "./folder-options"
import { setActiveMenu } from "@/lib/redux/slice/app"
import { MenuType } from "@/lib/enums"
import { getActiveFolderId, selectAllNotes } from "@/lib/redux/slice/notes"
import { getFolder, getNotes } from "@/lib/redux/selector"
import { getTotalNotesInFolder } from "@/lib/utils/helpers"
import FormInput from "../global/form/form-input"
import { updateFolderName } from "@/lib/redux/slice/folder"

interface Props {
    index: FolderItem[]
}

const FolderListItem: React.FC<Props> = ({ index }) => {
    const dispatch = useAppDispatch()
    const [editingFolderId, setEditingFolderId] = useState('');
    const [currentFolderName, setCurrentFolderName] = useState('');
    const { editingFolder } = useAppSelector(getFolder)
    const { activeFolderId } = useAppSelector(getNotes)
    const allNotes = useAppSelector(selectAllNotes)
    
    const hanldleGetFolderActive = (folderId: string) => {
        if (folderId) {
            dispatch(getActiveFolderId(folderId))
            dispatch(setActiveMenu(MenuType.FOLDER))
        }
    }

    const handleEditFolderName = (folderId: string, folderName: string) => {
        dispatch(updateFolderName({
            folderId,
            folderName: ""
        }))
        setEditingFolderId(folderId);
        setCurrentFolderName(folderName);
      };
      
      const handleFolderNameChange = (editingFormId: string, value: string) => {
        setCurrentFolderName(value);
      };
      
      const handleSubmitFolderNameChange = async (values: { formLabel: string }) => {
        try {
          // ... logika untuk memperbarui nama folder di database, 
          // misalnya menggunakan db.folders.update(editingFolderId, { name: values.formLabel }); ...
      
          setEditingFolderId('');
          setCurrentFolderName(''); 
        } catch (error) {
          console.log(error)
        }
      };
      
      const handleCancelFolderNameChange = () => {
        setEditingFolderId('');
        setCurrentFolderName('');
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
                    className="flex items-center justify-between w-full gap-2 p-2 cursor-pointer">
                    <div className='flex items-center gap-3 text-sm'>
                        <div>
                            {activeFolderId === item.id ? (
                                <FolderOpen24Filled className='size-5' />
                            ) : (
                                <Folder24Regular className='size-5' />
                            )}
                        </div>
                        <form>
                            {item.id && editingFolder ? (
                                <FormInput
                                formValue={item.name}
                                testId="edit-folder-name-input"
                                onSubmit={handleSubmitFolderNameChange}
                                placeholder="Enter new folder name"
                                editingFormId={editingFolderId}
                                changeHandler={handleFolderNameChange}
                              />
                            ) : (
                                <span className="line-clamp-1">{item.name}</span>
                            )}
                        </form>
                        <Badge variant={"icon"}>{totalNotes}</Badge>
                    </div>
                    <FolderOptions folderId={item.id} />
                </div>
                )
            })}
        </div>
    )
}
export default FolderListItem