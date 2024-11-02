import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { Delete24Regular, Edit24Regular, MoreHorizontal20Regular } from "@fluentui/react-icons"

const FolderOptions = () => {
    const dispatch = useAppDispatch()
    const folders = useAppSelector((folder) => folder.folder.folder)
    const isEditing = useAppSelector((state) => state.folder.editingFolder)

    return (
        <div onClick={(event) => event.stopPropagation()}>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal20Regular />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
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
        </div>

    )
}
export default FolderOptions