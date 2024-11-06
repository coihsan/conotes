import { FolderItem } from "@/lib/types"
import { Folder24Regular, FolderOpen24Filled } from "@fluentui/react-icons"
import React, { } from "react"
import { Badge } from "../ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { Input } from "../ui/input"
import FolderOptions from "./folder-options"
import { setActiveMenu } from "@/lib/redux/slice/app"
import { MenuType } from "@/lib/enums"
import { getActiveFolderId } from "@/lib/redux/slice/notes"
import { getFolder, getNotes } from "@/lib/redux/selector"
import { selectAllFolder } from "@/lib/redux/slice/folder"

interface Props {
    index: FolderItem[]
}

const FolderListItem: React.FC<Props> = ({ index }) => {
    const dispatch = useAppDispatch()
    const { editingFolder } = useAppSelector(getFolder)
    const { activeFolderId } = useAppSelector(getNotes)
    const folder = useAppSelector((state) => selectAllFolder(state))

    const hanldleGetFolderActive = (folderId: string) => {
        if (folderId) {
            dispatch(getActiveFolderId(folderId))
            dispatch(setActiveMenu(MenuType.FOLDER))
        }
    }

    const onKeyUp = () => { }
    const onBlur = () => { }
    const handleDoubleClick = () => { }

    return (
        <div className="px-2">
            {index.map((item) => (
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
                            {editingFolder ? (
                                <Input
                                    onDoubleClick={handleDoubleClick}
                                    className="h-7"
                                    defaultValue={item.name}
                                    onKeyDown={onKeyUp}
                                    onBlur={onBlur}
                                />
                            ) : (
                                <span className="line-clamp-1">{item.name}</span>
                            )}
                        </form>
                        <Badge variant={"icon"}>{folder.length}</Badge>
                    </div>
                    <FolderOptions />
                </div>
            ))}
        </div>
    )
}
export default FolderListItem