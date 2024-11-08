import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Delete24Regular, Edit24Regular, MoreHorizontal20Regular } from "@fluentui/react-icons"
import { useAppDispatch } from "@/lib/hooks/use-redux"
import { setEditingFolder } from "@/lib/redux/slice/folder"

type Props = {
    folderId: string
}

const FolderOptions : React.FC<Props> = ({ folderId }) => {
    const dispatch = useAppDispatch()

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreHorizontal20Regular />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => dispatch(setEditingFolder(true))}>
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