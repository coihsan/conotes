import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Delete24Regular, Edit24Regular, MoreHorizontal20Regular } from "@fluentui/react-icons"
import { useAppDispatch } from "@/lib/hooks/use-redux"
import { deleteFolder, setEditingFolder } from "@/lib/redux/slice/folder"
import { useModal } from "@/providers/alert-provider"
import UseAlertDialog from "../primitive/alert-dialog"

type Props = {
    folderId: string
}

const FolderOptions: React.FC<Props> = ({ folderId }) => {
    const dispatch = useAppDispatch()
    const { setOpen, setClose } = useModal()

    const handleDeleteFolder = (folderId: string) => {
        dispatch(deleteFolder({folderId}))
        setClose()
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MoreHorizontal20Regular />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => dispatch(setEditingFolder(true))}>
                        <Edit24Regular />
                        Rename folder
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setOpen(
                                <UseAlertDialog 
                                title="Are you absolutely sure?"
                                description="This action cannot be undone. This will permanently remove all notes in this folder from our app."
                                onAction={() => handleDeleteFolder(folderId)}
                                />
                              );
                        }}
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