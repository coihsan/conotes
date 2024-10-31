import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { toggleEdit } from "@/lib/redux/slice/folder"
import { Delete24Regular, Edit24Regular, MoreHorizontal20Regular } from "@fluentui/react-icons"

const FolderOptions = () => {
    const dispatch = useAppDispatch()
    const folders = useAppSelector((folder) => folder.folder.folder)
    const isEditing = useAppSelector((state) => state.folder.editingFolder)

    const handleRenameFolder = () => {
        dispatch(toggleEdit(true))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <MoreHorizontal20Regular />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                onClick={handleRenameFolder}>
                    <Edit24Regular />
                    Rename folder
                </DropdownMenuItem>
                <DropdownMenuItem
                className='text-red-500'
                >
                    <Delete24Regular />
                    Delete folder
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
export default FolderOptions