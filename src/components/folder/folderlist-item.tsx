import { FolderItem } from "@/lib/types"
import { Folder24Regular, FolderOpen24Filled } from "@fluentui/react-icons"
import React from "react"
import { Badge } from "../ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { Input } from "../ui/input"
import FolderOptions from "./folder-options"
import { setActiveMenu } from "@/lib/redux/slice/app"
import { MenuType } from "@/lib/enums"
import { getActiveFolderId } from "@/lib/redux/slice/notes"

interface Props {
    index: FolderItem[]
}

const FolderListItem: React.FC<Props> = ({ index }) => {
    const dispatch = useAppDispatch()
    const folders = useAppSelector((folder) => folder.folder.folder)
    const isEditing = useAppSelector((state) => state.folder.editingFolder)
    const activeFolder = useAppSelector((state) => state.notes.activeFolderId)

    const hanldleGetFolderActive = (folderId: string) : void => {
        dispatch(getActiveFolderId(folderId))
        dispatch(setActiveMenu(MenuType.FOLDER))
    }

    const resetFolder = () => {}
    const onKeyUp = () => {}
    const onBlur = () => {}

    return (
        <div>
            {index.map((item) => (
                <div
                    key={item.id}
                    onClick={() => hanldleGetFolderActive(item.id)}
                    tabIndex={0}
                    role="button"
                    className="flex items-center justify-between w-full gap-2 p-2 cursor-pointer">
                    <div className='flex items-center gap-3 text-sm'>
                        <div>
                            {activeFolder ? (
                                <FolderOpen24Filled className='size-5' />
                            ) : (
                                <Folder24Regular className='size-5' />
                            )}
                        </div>
                        <form>
                            {isEditing ? (
                                <Input
                                className="h-7"
                                defaultValue={item.name}
                                onReset={resetFolder}
                                onKeyDown={onKeyUp}
                                onBlur={onBlur}
                            />
                            ) : (
                                <span className="line-clamp-1">{item.name}</span>
                            )}
                        </form>
                        <Badge variant={"icon"}>{folders.length}</Badge>
                    </div>
                    <FolderOptions />
                </div>
            ))}
        </div>
    )
}
export default FolderListItem